var async = require('async');
var uuid = require('node-uuid');

var userSchemaDBmodel = require('../model/user');
var courseSchemaDBModel = require('../model/course');
var cremsgSchemaDBModel = require('../model/cremsg');

var userMod = new userSchemaDBmodel.Schema('user').model;

var courseMod = new courseSchemaDBModel.Schema('course').model;

var cremsgMod = new cremsgSchemaDBModel.Schema('cremsg').model;

//进行中的课程
exports.myActCourses = function(req, res){
    var userid = req.session.user.userid;

    courseMod.find({
        userid:userid,
        'statelv.lv':2
    },
    function(err, courseList){
        if (err){
            res.json([]);
        }else{
            for (var i = 0; i < courseList.length; i++){
                var item = courseList[i];
                item._doc.id = item._id;
            }
            res.json(courseList);
        }

    });
}

//已发布的课程
exports.myPubCourses = function(req, res){
    var userid = req.session.user.userid;

    courseMod.find({
            userid:userid,
            'statelv.lv':1
        },
        function(err, courseList){
            if (err){
                res.json([]);
            }else{
                for (var i = 0; i < courseList.length; i++){
                    var item = courseList[i];
                    item._doc.id = item._id;
                }
                res.json(courseList);
            }

        });
}

//未公开的课程
exports.myNewCourses = function(req, res){
    var userid = req.session.user.userid;

    courseMod.find({
            userid:userid,
            'statelv.lv':0
        },
        function(err, courseList){
            if (err){
                res.json([]);
            }else{
                for (var i = 0; i < courseList.length; i++){
                    var item = courseList[i];
                    item._doc.id = item._id;
                }
                res.json(courseList);
            }
        });
}

//已下架的课程
exports.mySelloutCourses = function(req, res){
    var userid = req.session.user.userid;

    courseMod.find({
            userid:userid,
            'statelv.lv':3
        },
        function(err, courseList){
            if (err){
                res.json([]);
            }else{
                for (var i = 0; i < courseList.length; i++){
                    var item = courseList[i];
                    item._doc.id = item._id;

                }
                res.json(courseList);
            }
        });
}

//所有课程
exports.myAllCourses = function(req, res){
    var userid = req.session.user.userid;

    courseMod.find({
            userid:userid
        },
        function(err, courseList){
            if (err){
                res.json([]);
            }else{
                for (var i = 0; i < courseList.length; i++){
                    var item = courseList[i];
                    item._doc.id = item._id;
                }
                res.json(courseList);
            }
        });
}

//课程概览
exports.overview = function(req, res){
    res.json([
        {
            imgUrl:'/images/test/course.jpg',
            name:'商务英语',
            state:'未开课',
            numStudent:19,
            score:81,
            courseUrl:'/wwwww'

        },{
            imgUrl:'/images/test/course.jpg',
            name:'商务英语1',
            state:'进行中',
            numStudent:23,
            score:80,
            courseUrl:'/ww'
        },{
            imgUrl:'/images/test/course.jpg',
            name:'商务英语2',
            state:'已结束',
            numStudent:25,
            score:85,
            courseUrl:'/www'
        },{
            imgUrl:'/images/test/course.jpg',
            name:'商务英语2',
            state:'进行中',
            numStudent:25,
            score:85,
            courseUrl:'/wwwww'
        }
    ])
}
/*****  xiaoguo  2016-01-02  *****/

var fs = require('fs');
var coursepath = "./app/config/recommendcourses.json";
var conditionpath = "./app/config/coursesearchcondition.json";

//
exports.index = function(req, res){
    res.render('index/courses', {

    });
}

//推荐的老师
exports.recommendation = function(req, res){
    var coursejson = JSON.parse(fs.readFileSync(coursepath));
    res.json(coursejson);
}

//搜索条件
exports.searchCondition = function(req, res){
    var conditionjson = JSON.parse(fs.readFileSync(conditionpath));
    res.json(conditionjson);
}

exports.courses = function(req, res, next) {
    courseMod.find({}, function(err, listitems){
        if (err){
            console.log(err);
            res.render('index', {
                title:'404'
            })
        }else{
            res.render('course', {
                courses:listitems,
                title:'老师'
            });
        }

    });

}


//------------------------------------------ 用户课程逻辑 -----------------------------------------
//新建课程
exports.createNewCourse = function(req, res){
    var userid = req.session.user.userid;

    console.log(userid);

    var infos = ['user', 'course'];

    var result = {};
    async.eachSeries(
        infos,
        function(item, callback){
            switch (item) {
                case 'user':
                    userMod.findOne({_id:userid}, function(err, user){
                        if (err) {
                            console.log(err);
                            result.user = null;
                            result.usermsg = 'fail';

                        }else {
                            result.user = user;
                            result.usermsg = 'success';
                        }
                        callback()
                    });
                    break;
                case 'course':
                    if (result.usermsg == 'fail'){
                        result.course = null;
                        result.coursemsg = 'fail';
                        callback();
                    }
                    var theUser = result.user;
                    console.log(req.body.data);
                    var crs = JSON.parse(req.body.data);
                    var uuuid = uuid.v4();
                    console.log(crs);
                    var course = {
                        _id:uuuid,
                        userid:theUser._id,
                        name:crs.name,
                        introduction:crs.introduction,
                        info:crs.info,
                        catalog:crs.catalog,
                        billing:crs.billing,
                        price:crs.price,
                        method:crs.method,
                        classroom:'',
                        mode:crs.mode,
                        range:crs.range,
                        thumbnail:'',
                        image:'',
                        score:0,
                        comment:0,
                        enable:1,
                        cdate:new Date(),
                        statelv:{
                            lv:0,
                            type:0,
                            name:"未审核"
                        },
                        signnum:0,
                        actnum:0
                    };
                    var courseEntity = new courseMod(course);
                    courseEntity.save(function(err){
                        if (err){
                            console.log(err);
                            result.course = null;
                            result.coursemsg = 'fail';
                        }else{
                            result.course = course;
                            result.coursemsg = 'success';
                        }
                        callback();
                    });
                    break;
            }
        },
        function(err){
            if (err){
                console.log(err);
                res.json({
                    state:'fail',
                    msg:err
                })
            }else{
                if (result.coursemsg == 'fail'){
                    res.json({
                        state:'fail',
                        data:null
                    });
                }else{
                    result.course.id = result.course._id;
                    res.json({
                        state:'success',
                        data:result.course
                    });
                }

            }
    });
}
//提交审核
exports.commitCourse = function(req, res){
    var crsid = req.body.courseid;
    var result = {};
    var series = ['course', 'queue', 'update'];

    async.eachSeries(
        series,
        function(item, callback){
            switch (item){
                case 'course':
                    courseMod.findOne({_id:crsid}, function(err, course) {
                        console.log(course);
                        if (err){
                            result.course = null;
                            result.coursemsg = {
                                state:'fail',
                                msg:'查询失败'
                            }

                        }else{
                            result.course = course;
                            result.coursemsg = {
                                state:'success',
                                msg:''
                            };


                        }
                        callback();
                    });
                    break;
                case 'queue':
                    if (result.coursemsg.state == 'fail'){
                        result.queue = null;
                        result.queuemsg = {
                            state:'fail',
                            msg:'失败'
                        };
                        callback();
                    }
                    var cremsg = {
                        _id:uuid.v4(),
                        userid:result.course.userid,
                        type:3,
                        status:"1",
                        commitdate:new Date(),
                        finishdate:null,
                        content:null,
                        teacher:result.course.userid,
                        course:result.course._id
                    };
                    var cremsgEntity = new cremsgMod(cremsg);
                    cremsgEntity.save(function(err){
                        if (err){
                            result.queue = null;
                            result.queuemsg = {
                                state:'fail',
                                msg:'失败'
                            };
                            callback();
                        }else{
                            result.queue = cremsg;
                            result.queuemsg = {
                                state:'success',
                                msg:'成功'
                            };
                            callback();
                        }
                    })
                    break;
                case 'update':
                    if (result.queuemsg.state == 'fail'){
                        result.update = null;
                        result.updatemsg = {
                            state:'fail',
                            msg:'失败'
                        };
                        callback();
                    }
                    courseMod.update(
                        {_id:result.course._id},
                        {$set:{
                            statelv:{
                                lv:0,
                                type:1,
                                name:"等待审核"
                            }
                        }},
                        function(err){
                            if (err){
                                result.update = null;
                                result.updatemsg = {
                                    state:'fail',
                                    msg:''
                                };
                                cremsgEntity.delete({_id:result.queue._id});
                                callback();
                            }else{
                                result.update = {};
                                result.updatemsg = {
                                    state:'success',
                                    msg:''
                                }
                                callback();
                            }

                        });

                    break;
            }
        },
        function(err){
            if (err){
                res.json({
                    state:'fail',
                    msg:'提交失败',
                    data:null
                });
            }else{
                if (result.updatemsg.state == 'fail'){
                    res.json({
                        state:'fail',
                        msg:'提交失败',
                        data:null
                    });
                }else{
                    res.json({
                        state:'success',
                        msg:'提交成功',
                        data:result.course
                    });
                }

            }
        })

}
//发布课程
exports.pubCourse = function(req, res){
    var code = req.query.code;

    var series = ['course', 'redundancy'];
    var result = {};
    async.eachSeries(series, function(){
        
    })
}
