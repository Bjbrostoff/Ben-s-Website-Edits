/**
 * Created by apple on 16/1/17.
 */
//审核

var async = require('async');

var cremsgDBModel = require('../model/cremsg');
var courseDBModel = require('../model/course');

var cremsgMod = new cremsgDBModel.Schema('cremsg').model;
var courseMod = new courseDBModel.Schema('course').model;

//等待审核状态的item
exports.waitAuditCourses = function(req, res){
    cremsgMod.find({status:"1"})
        .populate({
            path:'teacher',
            select:'name'
        })
        .populate({
            path:'course',
            select:'name'
        })
        .exec(function(err, cremsgList){
            if (err){
                res.json({
                    data:[],
                    state:'fail',
                    msg:''
                });
            }else {
                for (var i = 0; i < cremsgList.length; i++) {
                    var item = cremsgList[i];
                    item._doc.id = item._id;
                };

                res.json({
                    data: cremsgList,
                    state: 'success',
                    msg: ''
                });
            }
    });
}

//审核中状态的item
exports.actAuditCourses = function(req, res){
    var userid = req.session.user.userid;
    cremsgMod.find({status:"4", auditid:userid})
        .populate({
            path:'teacher',
            select:'name'
        })
        .populate({
            path:'course',
            select:'name'
        })
        .exec(function(err, cremsgList){
            if (err){
                res.json({
                    data:[],
                    state:'fail',
                    msg:''
                });
            }else {
                for (var i = 0; i < cremsgList.length; i++) {
                    var item = cremsgList[i];
                    item._doc.id = item._id;
                }

                res.json({
                    data: cremsgList,
                    state: 'success',
                    msg: ''
                });
            }
        }
    );
}

//已审核状态的item
exports.doneAuditCourses = function(req, res){
    var userid = req.session.user.userid;
    cremsgMod
        .find({
            auditid:userid,
            $or:[{status:'2'}, {status:'3'}]
        })
        .populate({
            path:'teacher',
            select:'name'
        })
        .populate({
            path:'course',
            select:'name'
        })
        .exec(function(err, cremsgList){
            if (err){
                res.json({
                    data:[],
                    state:'fail',
                    msg:''
                });
            }else {
                for (var i = 0; i < cremsgList.length; i++) {
                    var item = cremsgList[i];
                    item._doc.id = item._id;
                }

                res.json({
                    data: cremsgList,
                    state: 'success',
                    msg: ''
                });
            }
        }
    );
}

//待审核转审核中
exports.actingAuditCourse = function(req, res){
    var userid = req.session.user.userid;
    var codes = JSON.parse(req.body.data);
    var series = ['query', 'mark', 'change'];
    var result = {};

    async.eachSeries(
        series,
        function(item, callback){
            switch (item) {
                case 'query':
                    cremsgMod.find(
                        {
                            '_id':{$in:codes}
                        },
                        '-_id course',
                        function(err, list){
                            if (err){
                                result.query = {
                                    state:false,
                                    msg:'fail',
                                    data:null
                                }
                                callback();
                            }else{
                                result.query = {
                                    state:true,
                                    msg:'success',
                                    data:list
                                }
                                callback();
                            }
                        }
                    )
                    break;
                case 'mark':
                    if (result.query.state){
                        var bulk = cremsgMod.collection.initializeOrderedBulkOp();
                        bulk.find({'_id': {$in: codes}})
                            .update({$set: {
                                auditid: userid,
                                status:'4'
                            }});
                        bulk.execute(function (error) {
                             if (error){
                                 result.mark = {
                                     state:false,
                                     msg:'fail',
                                     data:null
                                 }
                                 callback();
                             }else{
                                 result.mark = {
                                     state:true,
                                     msg:'success',
                                     data:null
                                 }
                                 callback();
                             }
                        });
                    }else{
                        result.mark = {
                            state:false,
                            msg:'fail',
                            data:null
                        }
                        callback();
                    }

                    break;
                case 'change':
                    if (result.mark.state){
                        var courses = [];
                        result.query.data.forEach(function(item){
                            courses.push(item.course);
                        });

                        var bulk = courseMod.collection.initializeOrderedBulkOp();
                        bulk.find({'_id': {$in: courses}})
                            .update({$set: {
                                statelv: {
                                    lv:0,
                                    type:2,
                                    name:'审核中'
                                }
                            }});
                        bulk.execute(function (error) {
                            if (error){
                                result.change = {
                                    state:false,
                                    msg:'fail',
                                    data:null
                                }
                                callback();
                            }else{
                                result.change = {
                                    state:true,
                                    msg:'success',
                                    data:null
                                }
                                callback();
                            }
                        });


                    }else{
                        result.change = {
                            state:false,
                            msg:'fail',
                            data:null
                        }
                        callback();
                    }
                    break;
            }
        },
        function(err){
            if (err){
                res.json({
                    state:false,
                    msg:'fail',
                    data:null
                })
            }else{
                if (result.change.state){
                    res.json({
                        state:true,
                        msg:'success',
                        data:null
                    })
                }else{
                    res.json({
                        state:false,
                        msg:'fail',
                        data:null
                    })
                }
            }
        }
    );
}

exports.fetchAuditMsg = function(req, res){
    var code = req.query.code;

    var series = ['queue'];

    var result = {};

    async.eachSeries(
        series,
        function(item, callback){
            switch (item) {
                case 'queue':
                    cremsgMod
                        .findOne({_id:code})
                        .populate({
                            path:'teacher',
                            select:'_id, name'
                        })
                        .populate({
                            path:'course',
                            select:'_id, name'
                        })
                        .exec(function(err, cremsg){
                            if (err){
                                result.queue = {
                                    state:false,
                                    msg:'fail',
                                    data:null
                                }
                                callback();
                            }else{
                                result.queue = {
                                    state:true,
                                    msg:'success',
                                    data:cremsg
                                }
                                callback();
                            }
                        })

                    break;

            }
        },
        function(err){
            if (err){
                res.json({
                    state:false,
                    msg:'fail',
                    data:null
                });
            }else{
                res.json({
                    state:true,
                    msg:'success',
                    data:result.queue.data
                })
            }
        }
    )
}

//是否通过审核
exports.analysisPass = function(req, res){
    var code = req.query.code;
    var pass = req.query.pass;
    var courseid = req.query.courseid;

    var series = ['queue', 'course'];

    var result = {};

    async.eachSeries(
        series,
        function(item, callback){
            switch (item) {
                case 'queue':
                    cremsgMod.update(
                        {
                            _id:code
                        },
                        {
                            $set:{
                                status:(pass=='true')?"2":"3"
                            }
                        },
                        function(err){
                            if (err){
                                result.queue = {
                                    state:false,
                                    msg:'fail',
                                    data:null
                                }
                                callback();
                            }else{
                                result.queue = {
                                    state:true,
                                    msg:'success',
                                    data:null
                                }
                                callback();
                            }
                        }
                    )

                    break;
                case 'course':
                    if (!result.queue.state){
                        result.course = {
                            state:false,
                            msg:'fail',
                            data:null
                        }
                        callback();
                    }else{
                        courseMod.update(
                            {
                                '_id':courseid
                            },
                            {
                                $set:{
                                    statelv:{
                                        lv:0,
                                        type:(pass=='true')?3:4,
                                        name:(pass=='true')?'审核成功':'审核失败'
                                    }
                                }
                            },
                            function(err){
                                if (err){
                                    result.course = {
                                        state:false,
                                        msg:'fail',
                                        data:null
                                    };
                                    callback();
                                }else{
                                    result.course = {
                                        state:true,
                                        msg:'success',
                                        data:null
                                    }
                                    callback()
                                }
                            }
                        )
                    }

                    break;
            }
        },
        function(err){
            if (err){
                res.json({
                    state:false,
                    msg:'fail',
                    data:null
                });
            }else{
                res.json({
                    state:true,
                    msg:'success',
                    data:null
                })
            }
        }
    );

}
