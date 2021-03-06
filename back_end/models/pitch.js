/**
 * Created by subtainishfaq on 10/18/16.
 */

var mongoose=require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
var User = require('../models/user');
var uniqueValidator = require('mongoose-unique-validator');



var Schema=mongoose.Schema;

var pitchSchema = new Schema({

    pitchType :  {type:String },
    pitchTitle:{type :String},// this will ListOfValues
    location :  {type:String },
    requestedServiceType :  {type:String },// this will ListOfValues
    pitchStatusType :  {type:String },// this will ListOfValues
    assignedTeamLeader :  {type:String }, // this will be Employee
    assignedSalesPerson :  {type:String }, // this will be Employee
    pitchClientType :  {type:String }, // this will be ListOfValue
    pitchClientResponseType :  {type:String }, // this will be ListOfValue
    pitchClientCurrentServiceType :  {type:String }, // this will be ListOfValue
    isPitchClientNew :  {type:Boolean},
    pitchStatusRemarks :  {type:String },
    pitchSalesPersonRemarks :  {type:String },
    pitchExpectedBusiness :  {type:Number },
    pitchActualBusiness :  {type:Number },
    pitchCurrencyType :  {type:String }, // this will be ListOfValue
    pitchSourceType :  {type:String }, // this will be ListOfValue
    followUpCount :  {type:String },
    createdDate: { type:Date , default: Date.now() },
    scheduelDate: { type:Date , default: Date.now() },
    isPublished: { type:Boolean , default:false },
    assignedPeople: [{ type: Schema.Types.ObjectId, ref: 'User' }]

}, {strict: false});

pitchSchema.plugin(mongoosePaginate);

pitchSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Pitch', pitchSchema);