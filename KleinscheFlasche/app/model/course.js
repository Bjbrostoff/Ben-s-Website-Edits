/**
 * Created by cs on 2016/1/5.
 */
//课程 [courses]
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var coursesSchema = new Schema({
    //唯一标识 uuid
    _id:{
        type:Schema.Types.String
    },
    userid:{
        type:Schema.Types.String, ref:'user'
    },
    //课程名称
    name:String,
    //简介
    introduction:String,
    //详情
    info:String,
    //大纲、目录
    catalog:String,
    //计费方式 json
    billing:
    {
        fvalue:Number,
        fdetail:String
    },
    //单价
    price:String,
    //授课方式 0教室授课，1上门授课，2网上远程授课
    method:{
        type: {type: Number},
        name: String
    },
    //授课地点 (教室授课方式指定的地点 其他授课方式不需要)
    classroom:String,
    //授课模式 0一对一 1一对多
    mode:{
        type: {type: Number},
        name: String
    },
    //面向群体年龄
    range:{
        min:Number,max:Number
    },
    //缩略图 (资源路径)
    thumbnail:String,
    //图片 (资源路径)
    image:String,
    //课程评分 (接收程度。。。。)
    score:String,
    //课程点赞
    comment:Number,
    //可用状态 (老师删除掉的课程状态不可用 0不可用 1可用)
	enable:{type:Boolean,default:true}, //1:可用，0：不可用
    //----审核信息----
    //创建日期
    cdate:Date,
    // lv=0, 未发布 0:未审核 1:等待审核 2:审核中 3:审核成功 4:审核失败
    // lv=1, 发布 0:报名 1:报名截至
    // lv=2, 进行中 0:准备开课 1:进行中 2:结课
    // lv=3, 下架 0:已下架
    // lv=-1
    statelv:{
        lv:Number,
        type:{type: Number},
        name:String
    },
    //报名的人数
    signnum:Number,
    //上课的人数
    actnum:Number
},{
    _id:false
});


mongoose.model('course', coursesSchema);

module.exports.Schema = function(modelName) {
    return {
        model:mongoose.model(modelName)
    }
}