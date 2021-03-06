/**
 * Created by cs on 2016/1/9.
 */
//老师学生关系 [turels] teacher-user
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var turelsSchema = new Schema({
    //主体 主题唯一标识
    subjectid:{
        type:Schema.Types.String, ref:'user'
    },
    //关系 0教学关系 1收藏关系
    relation: {
        type: {type: Number},
        name: String
    },
    //客体 客体唯一标识
    objectid:{
        type:Schema.Types.String, ref:'user'
    },
    //状态 教学关系（0正在授课 1曾经授课）
    state:{
        type: {type: Number},
        name: String
    },
	enable:{type:Boolean,default:true} //1:可用，0：不可用
});


mongoose.model('turel', turelsSchema);

module.exports.Schema = function(modelName) {
    return {
        model:mongoose.model(modelName)
    }
}