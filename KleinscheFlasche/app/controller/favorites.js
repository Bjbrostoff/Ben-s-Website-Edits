/**
 * Created by cs on 2016/1/1.
 */

var uuid = require('node-uuid');
var mongoose = require('mongoose');
var ucrelsMod = require('../model/ucrel').Schema('ucrel').model;
var turelsMod = require('../model/turel').Schema('turel').model;
var userMod = require('../model/user').Schema('user').model;
var coursesMod = require('../model/course').Schema('course').model;
var md5 = require('md5');
var async = require('async');
var querykey = /test-favorite/; //测试用模糊查询（正式的换成具体userid）
exports.activeId = 0,
exports.columns = function (req, res) {
    res.json(
        [
            {fname: 'id', falias: '#'},
            {fname: 'name', falias: '名称'},
            {fname: 'typename', falias: '类型'}
        ]);
},
exports.allTypes = function (req, res) {
    res.json([
        {
            id: '0',
            name: '所有',
            type: '0'
        },
        {
            id: '1',
            name: '课程',
            type: '1'
        },
        {
            id: '2',
            name: '教师',
            type: '2'
        },
        {
            id: '3',
            name: '机构',
            type: '3'
        }
    ]);
},
exports.allData = function (req, res, next) {
        res.json(
            [
                {
                    id: '00001',
                    name: '托福第一期',
                    typename: '课程',
                    type: '1',
                    imageUrl: '/Inspinia/img/a1.jpg',
                    time: '2015/12/27 20:38',
                    timeago: '1小时前',
                    url: ''
                },
                {
                    id: '00002',
                    name: '托福第二期',
                    typename: '课程',
                    type: '1',
                    imageUrl: '/Inspinia/img/a1.jpg',
                    time: '2015/12/27 20:38',
                    timeago: '1天前',
                    url: ''
                },
                {
                    id: '00003',
                    name: '张老师的第一堂课',
                    typename: '教师',
                    type: '2', imageUrl: '/Inspinia/img/a1.jpg',
                    time: '2015/12/27 20:38',
                    timeago: '1天前',
                    url: ''
                },
                {
                    id: '00004',
                    name: '张老师的第一堂课',
                    typename: '课程',
                    type: '2',
                    imageUrl: '/Inspinia/img/a1.jpg',
                    time: '2015/12/27 20:38',
                    timeago: '1天前',
                    url: ''
                },
                {
                    id: '00005',
                    name: '张老师的第一堂课',
                    typename: '课程',
                    type: '2',
                    imageUrl: '/Inspinia/img/a1.jpg',
                    time: '2015/12/27 20:38',
                    timeago: '1天前',
                    url: ''
                },
                {
                    id: '00006',
                    name: '新东方英语',
                    typename: '机构',
                    type: '3',
                    imageUrl: '/Inspinia/img/a1.jpg',
                    time: '2015/12/27 20:38',
                    timeago: '1天前',
                    url: ''
                },
                {
                    id: '00007',
                    name: '新东方英语',
                    typename: '机构',
                    type: '3',
                    imageUrl: '/Inspinia/img/a1.jpg',
                    time: '2015/12/27 20:38',
                    timeago: '1天前',
                    url: ''
                }
            ]
        )
    },

//生产数据收藏包括（学生与课程关系...）
modFavorites = function (userId) {
    var key = "test-favorite"; //测试数据关键字
    var userType = 0;
    switch (userType) {
        case 0: //普通用户（学生）
            this.modStudentFavorites(key, userId);
            break;
    }
},
//统计（统计图表用）
exports.queryFavoriteCharts = function (req, res) {
    var tasks = ['course', 'teacher','agency'];
    var chartDatas = [];
    var colors = ['#87d6c6', '#54cdb4','#1ab394'];
    var mUserid = querykey;
    if (req.session.user) {
        mUserid = req.session.user.userid;
    }
    async.each(tasks, function (item, callback) {
        switch (item) {
            case 'course':
                ucrelsMod.count({'userid':mUserid,'relation.type':0}, function (err, result) {
                    var count = 0;
                    if (err) console.log(err);
                    count = result;
                    chartDatas.push({
                        label: '课程',
                        value: count,
                        type:1
                    });
                    callback();
                });
                break;
            case 'teacher':
                turelsMod.count({'subjectid': mUserid,'relation.type': 0}, function (err, result) {
                    var count = 0;
                    if (err) console.log(err);
                    count = result;
                    chartDatas.push({
                        label: '教师',
                        value: count,
                        type:2
                    });
                    callback();
                });
                break;
            case 'agency': //机构关系暂缺
                chartDatas.push({
                    label: '机构',
                    value: 0,
                    type:3
                });
                callback();
                break;
        }
    }, function (err) {
        console.log("err: " + err);
        res.json({data:chartDatas,colors:colors});
    });
},
exports.queryFavorite = function (req, res, next){
    var reset = -1;
    if (req.query.reset) {
        reset = parseInt(req.query.reset);
    }
    console.log("queryFavorite");
    var self = this;
    var mUserid = querykey;
    var mPassword = '123456';
    var mUserType = 0;
    if (req.session.user) {
        console.log(req.session.user);
        mUserid = req.session.user.userid;
        mUserType = req.session.user.usertype;
    } else {
        mUserid = key + uuid.v4();
    }
    //删除测试数据
   // self.resetTestData(req, res, next,true);
    console.log('_id'+ mUserid+'usertype:'+ mUserType);
    userMod.count({'_id': mUserid}, function (err, result) {
        if (err) console.log(err);
        console.log(result);
        if (reset != 0 && result > 0) {
            self.queryTestData(req, res, next);
        } else {
            self.resetTestData(req, res, next, false);
        }
    })
},
exports.clearFavorite = function (req, res, next){
    this.resetTestData(req,res,next,true);
},
resetTestData = function (req, res, next, removeonly) {
    var mUserid = querykey;
    if (req.session.user) {
        mUserid = req.session.user.userid;
    }
    var self =this;
    console.log('resetTestData'+'mUserid:'+mUserid);
    var tasks = ['remove-user', 'remove-courses','remove-ucrels','remove-turels'];
    async.each(tasks, function (item, callback) {
        switch (item) {
            case 'remove-user':
                userMod.remove({'_id': querykey}, function (err, result) {
                    if (err) console.log(err);
                    callback();
                });
                break;
            case 'remove-courses':
                coursesMod.remove({'_id': querykey}, function (err, result) {
                    if (err) console.log(err);
                    callback();
                });
                break;
            case 'remove-ucrels':
                ucrelsMod.remove({'teacherid': querykey}, function (err, result) {
                    if (err) console.log(err);
                    callback();
                });
                break;
            case 'remove-turels':
                turelsMod.remove({'objectid': querykey}, function (err, result) {
                    if (err) console.log(err);
                    callback();
                });
                break;
        }
    }, function (err) {
        console.log("删除原来测试数据成功！");
        if (!removeonly) {
            self.modFavorites(mUserid);
        }
        self.queryTestData(req, res, next);
    });
},
queryTestData = function (req, res, next) {
    var self = this;
    var mUserid = querykey;
    var mUsertype = 0;
        if (req.session.user) {
            mUserid = req.session.user.userid;
            mUsertype = req.session.user.usertype;
        }
        userMod.findOne({'_id': mUserid, usertype: mUsertype}, function (err, model) {
            var curuserid;
            var type = 1;
            if (req.query.type) {
                type = parseInt(req.query.type);
            }
            switch (type) {
                case 1: //课程
                    self.getStudentFavorites(mUserid, req, res, next);
                    break;
                case 2://老师
                    self.getTeacherFavorites(mUserid, req, res, next);
                    break;
                default:
            }
        })
    },

//生产学生与课程与老师关系数据
modStudentFavorites = function (key, userId) {
        /*
         #用户类型 0普通 1老师 2机构 3审核员 4.管理员
         */
        var relations = ['收藏', '报名', '上课', '学完'];
        var methods = ['教室授课', '上门授课', '网上远程授课'];
        var checkstates = ['未审核', '等待审核', '审核中', '审核成功', '审核失败'];
        var pubstates = ['未发布', '已发布', '已下架'];
        var actstates = ['未开课', '进行中', '已结束'];

        var courcesArr = [];
        var ucrelsArr = [];
        var tucrelsArr = [];

        var student = {
            _id: userId,
            name: 'student-test',
            email: 'student@163.com',
            phone: '1234',
            password: '123456',
            age: '24',
            sex: 'male',
            nationality: 'U.S.A',
            birth: '1990-10-10',
            enable: 1,
            usertype: 0,
            portrait: '',
            city: '杭州'
        };
        var studentEntity = new userMod(student);
        studentEntity.save(function (err) {
            console.log(err);
        });
        for (var i = 0; i < 20; i++) {
            //学生与课程关系
            var courceid = key + uuid.v4();
            var iRelation = Math.ceil(Math.random() * 4) - 1;
            var iMethod = Math.ceil(Math.random() * 3) - 1;
            var iCheckstate = Math.ceil(Math.random() * 5) - 1;
            var iPubstate = Math.ceil(Math.random() * 3) - 1;
            var iActstate = Math.ceil(Math.random() * 3) - 1;
            var cources = {
                _id: courceid,
                //课程名称
                name: 'cource-' + i,
                //简介
                introduction: 'introduction-' + i,
                //详情
                info: 'info-' + i,
                //大纲、目录
                catalog: 'catalog' + i,
                //计费方式 json
                billing: {
                    type: {
                        fvalue: i % 2,
                        fdetail: i % 2 == 0 ? '标准' : '小时',
                    },
                    info: {
                        total: Math.ceil(Math.random() * 20),
                        duration: Math.ceil(10 + Math.random() * 10),
                    }
                },
                //单价
                price: '5$/h',
                //授课方式 0教室授课，1上门授课，2网上远程授课
                method: {
                    type: iMethod,
                    name: methods[iMethod]
                },
                //授课地点 (教室授课方式指定的地点 其他授课方式不需要)
                classroom: String,
                //授课模式 0一对一 1一对多
                mode: {
                    type: i % 2,
                    name: i % 2 == 0 ? '一对一' : '一对多',
                },
                //面向群体年龄
                range: {
                    min: 10, max: 40
                },
                //缩略图 (资源路径)
                thumbnail: '',
                //图片 (资源路径)
                image: '',
                //课程评分 (接收程度。。。。)
                score: i % 2 == 0 ? 'A' : 'B',
                //课程点赞
                comment: Math.ceil(Math.random() * 100),
                //可用状态 (老师删除掉的课程状态不可用 0不可用 1可用)
                enable: i % 2 == 0,
                //----审核信息----
                //创建日期
                date: Date.now,
                //审核状态 0未审核 1等待审核 2审核中 3审核成功 4审核失败
                checkstate: {
                    type: iCheckstate,
                    name: checkstates[iCheckstate]
                },
                //发布状态 0未发布 1已发布 2已下架
                pubstate: {
                    type: iPubstate,
                    name: pubstates[iPubstate]
                },
                //进行状态 0未开课 1进行中 2已结束
                actstate: {
                    type: iActstate,
                    name: actstates[iActstate]
                }
            };
            var ucrels = {
                userid: userId,
                //关系(0：收藏 1：报名 2：上课 3：学完)
                relation: {
                    type: iRelation,
                    name: relations[iRelation]
                },
                //课程id
                courceid: courceid,
                teacherid: key + uuid.v4(),
                //状态
                state: i % 2
            };
            courcesArr.push(cources);
            ucrelsArr.push(ucrels);
            var courcesEntity = new coursesMod(cources);
            courcesEntity.save(function (err) {
                console.log(err);
            });
            var ucrelsEntity = new ucrelsMod(ucrels);
            ucrelsEntity.save(function (err) {
                console.log(err);
            });
            //----------------------------------------
            //学生与老师关系
            //----------------------------------------
            var teacherId = key + uuid.v4();
            var teacher = {
                _id: teacherId,
                name: 'teacher-test' + i,
                email: 'teacher' + i + '@163.com',
                phone: '1234',
                password: '123456',
                age: '24',
                sex: 'male',
                nationality: 'U.S.A',
                birth: '1990-10-10',
                enable: 1,
                usertype: 1,
                portrait: '',
                city: '杭州'
            };
            var teacheEntity = new userMod(teacher);
            teacheEntity.save(function (err) {
                console.log(err);
            });

            var iState = Math.ceil(Math.random() * 2) - 1
            var turels = {
                subjectid: userId,
                //关系 0教学关系 1收藏关系
                relation: {
                    type: i % 2,
                    name: i % 2 == 0 ? '教学关系' : '收藏关系'
                },
                //客体 客体唯一标识
                objectid: teacherId,
                //状态 教学关系（0正在授课 1曾经授课）
                state: {
                    type: iState,
                    name: iState == 0 ? '正在授课' : '曾经授课'
                }
            }
            tucrelsArr.push(turels);
            var turelsEntity = new turelsMod(turels);
            turelsEntity.save(function (err) {
                console.log(err);
            });
        }
    },
//学生与课程与老师关系数据
    getStudentFavorites = function (userId, req, res, next) {
        //###1.populate方式
        var result = [];
        ucrelsMod.find({"relation.type": 0, "userid": userId})
            .populate(
                {
                    path: 'userid',
                    select: {},
                    model: "user",
                    match: {usertype: 0}
                }
            )
            .exec(function (err, docs) {
                if (err) console.log(err);
                var courses = [];
                docs.forEach(function (value) {
                    courses.push(value.courceid);
                });
                coursesMod.find({_id: {$in: courses}}, function (err, datas) {
                    datas.forEach(function (data) {
                        docs.forEach(function (ucrel) {
                            if (data._id == ucrel.courceid) {
                                result.push({
                                    course: data, ucrelUser: ucrel,
                                    user: ucrel.userid,
                                    id: data._id,
                                    type: '1',   //课程
                                    typename: '课程',
                                    imageUrl: '/Inspinia/img/a1.jpg',
                                    time: '2015/12/27 20:38',
                                    timeago: '1小时前',
                                });
                            }
                        });
                    });
                    res.json(result);
                })
            });
    },
//老师与学生关系（老师收藏学生，老师收藏老师，学生收藏老师）
    getTeacherFavorites = function (userId, req, res, next) {
        var result = [];
        turelsMod.find({"relation.type": 1, "subjectid": userId})
            .populate(
                {
                    path: 'objectid',
                    select: {},
                    model: "user",
                    match: {usertype: 1}
                }
            )
            .exec(function (err, docs) {
                if (err) console.log(err);
                var datas = [];
                docs.forEach(function (value) {
                    datas.push({
                        data:value,
                        id:value._id
                    });
                });
                console.log(datas.length);
                      /*datas.forEach(function (data) {
                        console.log(data);
                        result.push({
                            course: data
                        });
                    }*/
                res.json(datas);
            });
    },
    testmapReduce = function () {
        /*
         var teachersModel = mongoose.model('user_teachers',{});
         turelsMod.find({'subjectid':userId,'relation.type':0})
         .populate(
         {
         path:'objectid',
         select:'name email age sex',
         model:"user_teachers"
         })
         .exec(function(err, docs) {
         if (err) console.log(err);
         console.log(docs);
         }
         );*/
        //###2.mapReduce方式
        //获取session的user
        /*var students = this.mapReduceUserMod(0,'user_students');
         userMod.mapReduce(students, function (err, model, stats) {
         console.log('map reduce took %d ms', stats.processtime)
         })
         var teachers = this.mapReduceUserMod(1,'user_teachers');
         userMod.mapReduce(teachers, function (err, model, stats) {
         console.log('map reduce took %d ms', stats.processtime)
         });

         var studentsModel = mongoose.model('user_students',{});
         var teachersModel = mongoose.model('user_teachers',{});

         studentsModel.find({},function(err,docs){
         if(err)console.log(err);
         console.log(docs);
         });
         teachersModel.find({},function(err,docs){
         if(err)console.log(err);
         console.log(docs);
         });
         res.json({status:'success'});*/
    }

//拆分user表为多个表（user-students,user-teachers...）
mapReduceUserMod = function (type, newModelName) {

    var mapReduce = {};
    mapReduce.map = function () {
        emit(this.usertype, this)
    };
    mapReduce.query = {usertype: {$eq: type}};
    mapReduce.reduce = function (k, values) {
        var result = {};
        values.forEach(function (value) {
            var field;
            for (field in value) {
                if (value.hasOwnProperty(field)) {
                    result[field] = value[field].toFixed(0);
                }
            }
        });
        return result;
    };
    mapReduce.out = {reduce: newModelName};

    userMod.mapReduce(mapReduce, function (err, model, stats) {
        console.log('map reduce took %d ms', stats.processtime)
    })
    return mapReduce;
}
