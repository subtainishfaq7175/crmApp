/**
 * Created by subtainishfaq on 12/6/16.
 */
/**
 * Created by subtainishfaq on 10/18/16.
 */
var Messages = require('../models/message');
var express = require('express');
var jwt    = require('jwt-simple');
var config      = require('../config/database');
var passport	= require('passport');
var User = require('../models/user');

var router = express.Router();

router.route('/messages')
    .get(function(req, res) {

        Messages.find({}, function(err, messages) {
            if (err) {
                console.error(err);
                res.send(err);
            } else {
                res.json(messages);
            }
        });

    })

    .post(function(req, res) {

        var token = getToken(req.headers);
        if (token) {
            var decoded = jwt.decode(token, config.secret);
            User.findOne({
                name: decoded.name
            }, function(err, user) {
                if (err) throw err;

                if (!user) {
//                    return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});

                    var messages = new Messages(req.body);

                    messages.save(function(err) {
                        if (err) {
                            return res.send(err);
                        }

                        res.send({ message: 'Messages Added' });
                    });
                } else {
                    req.body["name"]=user.name;

                    var messages = new Messages(req.body);

                    messages.save(function(err) {
                        if (err) {
                            return res.send(err);
                        }

                        res.send({ message: 'Messages Added' });
                    });

                }
            });
        } else {
            var messages = new Messages(req.body);

            messages.save(function(err) {
                if (err) {
                    return res.send(err);
                }

                res.send({ message: 'Messages Added' });
            });

        }

    });

router.route('/messages/:id').put(function(req,res){

    var token = getToken(req.headers);
    if (token) {
        var decoded = jwt.decode(token, config.secret);
        User.findOne({
            name: decoded.name
        }, function(err, user) {
            if (err) throw err;

            if (!user) {
                return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});
            } else {

                Messages.findOne({ _id: req.params.id }, function(err, messages) {
                    if (err) {
                        return res.send(err);
                    }

                    for (prop in req.body) {
                        messages[prop] = req.body[prop];
                    }

                    // save the messages
                    messages.save(function(err) {
                        if (err) {
                            return res.send(err);
                        }

                        res.json({ message: 'Messages updated!' });
                    });
                });
            }
        });
    } else {
        return res.status(403).send({success: false, msg: 'No token provided.'});
    }




});


router.route('/messages/:id').get(function(req, res) {
    Messages.findOne({ _id: req.params.id}, function(err, messages) {
        if (err) {
            return res.send(err);
        }

        res.json(messages);
    });
});

router.route('/messages/:id').delete(function(req, res) {

    var token = getToken(req.headers);
    if (token) {
        var decoded = jwt.decode(token, config.secret);
        User.findOne({
            name: decoded.name
        }, function(err, user) {
            if (err) throw err;

            if (!user) {
                return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});
            } else {

                Messages.remove({
                    _id: req.params.id
                }, function(err, messages) {
                    if (err) {
                        return res.send(err);
                    }

                    res.json({ message: 'Successfully deleted' });
                });

            }
        });
    } else {
        return res.status(403).send({success: false, msg: 'No token provided.'});
    }


});



getToken = function (headers) {
    if (headers && headers.authorization) {
        var parted = headers.authorization.split(' ');
        if (parted.length === 2) {
            return parted[1];
        } else {
            return null;
        }
    } else {
        return null;
    }
};

module.exports = router;
