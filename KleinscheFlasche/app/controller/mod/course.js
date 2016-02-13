/**
 * Created by apple on 16/1/9.
 */

var uuid = require('node-uuid');
var md5 = require('md5');

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

var userDBSchema = require('../../model/user');

var userMod = userDBSchema.Schema('user').model;

var tcredSBSchema = require('../../model/tcred');
var tcredMod = tcredSBSchema.Schema('tcred').model;
var courseSchema = require('../../model/course');
var courseMod = courseSchema.Schema('course').model;
var tcrelsSchema = require('../../model/tcrel');
var tcrels = tcrelsSchema.Schema('tcrel').model;

var calnodeDBSchema = require("../../model/calnode");
var calnodeMod = calnodeDBSchema.Schema("calnode").model;



exports.modcourses = function(req, res){
    var statusArr = [0,1,2,3];

    for (var i=0; i < 50; i++){

    }
}


exports.createCourse = function(req,res,next){
	userMod.find({},function(err,collection){
		if(collection.length > 0 ){
			for(var xx = 0 ; xx < collection.length ;xx++){
				var cc = collection[xx];
				var userid = cc._id;
				for(var i = 0 ; i < 10; i++){
					var courseId = uuid.v4();
					var entity = new courseMod({
						_id:courseId,
						name:"英语"+i,
						introduction:"这是个简介",
						info:"这是一门英语课",
						catalog:"这是课程目录",
						billing:
						{
							type:{
								fvalue:1,
								fdetail:"标准"
							},
							info:{
								total:10,
								duration:60
							}
						},
						price:"50",
						method:{
							type: 1,
							name: "上门授课"
						},
						mode:{
							type: 0,
							name: "一对一"
						},range:{
							min:1,max:10
						},


						//课程评分 (接收程度。。。。)
						score:"6",
						//课程点赞
						comment:100+i,
						//可用状态 (老师删除掉的课程状态不可用 0不可用 1可用)
						enable:1,
						//----审核信息----
						//创建日期
						cdate: new Date(),
						//审核状态 0未审核 1等待审核 2审核中 3审核成功 4审核失败
						checkstate:{
							type: 3,
							name: '审核成功'
						},
						//发布状态 0未发布 1已发布 2已下架
						pubstate:
						{
							type: 1,
							name: "已发布"
						},
						//进行状态 0未开课 1进行中 2已结束
						actstate:{
							type: 0,
							name: "未开课"
						}
					});
					entity.save(function(err){

					});
					var tcl = new tcrels({
						teacherid:userid,//教师id
						relation:{//#关系 （0拥有,1创建 ?待定）
							type:1,
							name:"拥有"
						},
						courceid:courseId//课程id
					});
					tcl.save(function(err){
						console.log("tcl"+err);
					})
				}
			}
		}
	});
	res.json({
		state:'success'
	})
}