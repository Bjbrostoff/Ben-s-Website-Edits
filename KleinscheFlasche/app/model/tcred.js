

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var tcredSchema = new Schema({
    _id:{
        type:Schema.Types.String
    },
    userid:{
        type:Schema.Types.String, ref:'user'
    },
    name:String,
    credentype:String,
    credencode:String,
    credenimage:String,
    payway:String,
    acadecerti:{
        level:Number,
        image:String,
        code:String
    },
    servexerti:[{
	    info:String,
	    image:String,
	    _id:String
    }],
    workexp:String,
    info:{
        mothertongue:{
            value:String,
            pub:String
        },
        skilledcourse:{
            value:String,
            pub:String
        },
        language:{
            value:String,
            pub:String
        },
        info:{
            value:String,
            pub:String
        }
    },
	enable:{type:Boolean,default:true}//1:可用，0：不可用
}, {
    _id:false
});


mongoose.model('tcred', tcredSchema);

module.exports.Schema = function(modelName) {
    return {
        model:mongoose.model(modelName)
    }
}