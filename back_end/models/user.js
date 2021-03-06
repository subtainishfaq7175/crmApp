/**
 * Created by subtainishfaq on 10/29/16.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt=require('bcryptjs');
var mongoosePaginate = require('mongoose-paginate');
var tree = require('mongoose-path-tree');




// Thanks to http://blog.matoski.com/articles/jwt-express-node-mongoose/

// set up a mongoose model
var UserSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true

    },
    created_time:  { type: Date, default: Date.now },


    password: {
        type: String,
        required: true
    },
    rank: { type:String , default: "Employee" },
    gender : { type:String },
    age : { type:Number },
    isAssingned :{ type: Boolean , default : false},
    hasChild: { type: Boolean , default : false},
    nodeLevel : {type:Number},
    team : {type:String , default : "sale"}




});



UserSchema.pre('save', function (next) {
    console.log("preCalled");
    var user = this;
  user.nodeLevel=  this.path ? this.path.split("#").length : 0;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});

UserSchema.methods.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};

UserSchema.plugin(tree);


UserSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('User', UserSchema);