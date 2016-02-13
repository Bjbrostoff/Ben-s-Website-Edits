/**
 * Created by cs on 2016/1/20.
 * 我的老师（学生用户、老师用户等...）
 */
var mongoose = require('mongoose');
var turelSchema = require('../../model/turel');
var turelMod = turelSchema.Schema('turel').model;
var ucrelSchema = require('../../model/ucrel');
var ucrelMod = ucrelSchema.Schema('ucrel').model;
var tcrelSchema = require('../../model/tcrel');
var tcrelMod = tcrelSchema.Schema('tcrel').model;
var courseSchema = require('../../model/course');
var courseMod = courseSchema.Schema('course').model;
var userSchema = require('../../model/user');
var userMod = userSchema.Schema('user').model;
var tcredSchema = require('../../model/tcred');
var tcredMod = userSchema.Schema('tcred').model;

var uuid = require('node-uuid');
var md5 = require('md5');
var async = require('async');
var querykey = /test-myteachers/; //测试数据前缀（模糊查询用）
var key = "test-myteachers";      //测试数据关键字（生产id用）

//####################################################################
//生产数据
//url like:http://localhost:3000/mod/user/modMyTeachers?count=100
//####################################################################
exports.modMyTeachers = function (req, res, next) {
    var mUserid = uuid.v4();
    var mUserType = 0;
    //session
    if (req.session.user) {
        if (req.session.user.userid) mUserid = req.session.user.userid;
        if (req.session.user.usertype) mUserType = req.session.user.usertype;
    }
    //query params
    var count = 20; //默认数据20个
    if (req.query.count) {
        count = parseInt(req.query.count);
    }
    var turels = []; //老师学生关系
    var ucrels = []; //学生与课程关系
    var tcrels = [];  //老师与课程关系
    var courses = []; //课程
    var teachers = []; //老师 user表 usertype 1
    var tcreds = [];  // 老师认证 用户扩展
    for (var i = 0; i < count; i++) {
        var mTeacherid = key + uuid.v4();
        var mCourseid = key + uuid.v4();
        var mTcredid = key + uuid.v4();
        var mRelationArr = ['报名', '上课', '学完'];
        var mCourseNameArr = ['日常英语','职场英语', '数学', '计算机'];
        var mTeacherMethodArr = [ '教室授课','上门授课','网上远程授课'];
        var mStateArr = ['准备开课','进行中','结课'];
        var mCityArr = ['杭州','北京','上海','广州','深圳'];
        var mStarlevelArr = ['无星级','一星级','二星级','三星级','四星级','五星级'];
        //老师学生关系 model turel
        var turel = {
            subjectid: mUserid,
            //关系 0教学关系 1收藏关系
            relation: {
                type: 0,
                name: '教学关系'
            },
            //客体 客体唯一标识
            objectid: mTeacherid,
            //状态 教学关系（0正在授课 1曾经授课）
            state: {
                type: i % 2,
                name: i % 2 == 0 ? '正在授课' : '曾经授课'
            },
            enable:true
        }
        //学生与课程关系 model ucrel
        var ucrel = {
            userid: mUserid,
            //关系(0：收藏 1：报名 2：上课 3：学完)
            relation: {
                type: i % 3,
                name: mRelationArr[i % 3]
            },
            //课程id
            courceid: mCourseid,
            //老师ID
            teacherid:mTeacherid,
            //状态
            state: 0,
            enable: true
        }
        //老师与课程关系 model tcrel
        var tcrel = {
            teacherid:mTeacherid,//教师id
            relation:{//#关系 （0拥有,1创建 ?待定）
                type:i % 2,
                name:i % 2 == 0 ? '拥有':'创建'
            },
            courceid:mCourseid,//课程id
            enable:true //1:可用，0：不可用
        }
        //课程 model course
        var course = {
            _id:mCourseid,
            userid:mTeacherid,
            //课程名称
            name:mCourseNameArr[i%3],
            //简介
            introduction:'十年教学经验，每年80%的学生保送国外各个名校',
            //详情
            info:'我们是最专业的，做到最好！',
            //大纲、目录
            catalog:'',
            //计费方式 json
            billing:
            {
                fvalue:i % 2,
                fdetail:i % 2 == 0 ?'按小时计费':'标准计费'
            },
            //单价
            price:'20$/h',
            //授课方式 0教室授课，1上门授课，2网上远程授课
            method:{
                type: i % 3,
                name: mTeacherMethodArr[i%3]
            },
            //授课地点 (教室授课方式指定的地点 其他授课方式不需要)
            classroom:'',
            //授课模式 0一对一 1一对多
            mode:{
                type: i % 2,
                name: i % 2 == 0 ? '一对一':'一对多'
            },
            //面向群体年龄
            range:{
                min: 10, max: 40
            },
            //缩略图 (资源路径)
            thumbnail: '',
            //图片 (资源路径)
            image: '',
            //课程评分 (接收程度。。。。)
            score: Math.ceil(Math.random() * 40)+60,
            //课程点赞
            comment: Math.ceil(Math.random() * 100),
            //可用状态 (老师删除掉的课程状态不可用 0不可用 1可用)
            enable: true,
            //----审核信息----
            //创建日期
            cdate: Date.now,
            // lv=0, 未发布 0:未审核 1:等待审核 2:审核中 3:审核成功 4:审核失败
            // lv=1, 发布 0:报名 1:报名截至
            // lv=2, 进行中 0:准备开课 1:进行中 2:结课
            // lv=3, 下架 0:已下架
            // lv=-1
            statelv:{
                lv:2, //我的老师只造进行中的数据
                type:i % 3,
                name:mStateArr[i % 3]
            },
            //报名的人数
            signnum:Math.ceil(Math.random() * 10) + 20,
            //上课的人数
            actnum:Math.ceil(Math.random() * 10) + 5
        }
        //老师 model user  (usertype:1)
        var teacher = {
            _id: mTeacherid,
            tcredid: mTcredid, //老师认证表id
            name: 'teacher-test' + i,
            email: 'teacher' + i + '@163.com',
            phone: '130888888' + (i < 10 ? '0' + i : i),
            password: md5('123456'),
            age: '24',
            sex: 'male',
            nationality: 'U.S.A',
            birth: '1990-10-10',
            enable: 1,
            usertype: 1,
            portrait: '/inspinia/img/a' + (i % 8 + Number(1)) + '.jpg',
            city: mCityArr[i % 5],
            starlevel: mStarlevelArr[i % 6],
            //点赞数
            likes:Math.ceil(Math.random() * 10),
            //课程维护
            managecourses:[],
            //我的课程
            mycourses:[],
            enable:true //1:可用，0：不可用
        };
        //用户扩展一 老师认证 model tcred
        var tcred = {
            _id: mTcredid,
            userid: mTeacherid,
            name: 'STeve' + i,
            credentype: "idcode",
            credencode: 'ABC-' + i,
            credenimage: '',
            payway: "",
            acadecerti: {
                level: i % 5,
                image: '',
                code: ''
            },
            servexerti: [
                {
                    time: "2009年",
                    info: '带领哈佛大学篮球队取得常春藤联盟分组冠军，进入NCAA64强',
                    image: ''
                },
                {
                    time: "2010年",
                    info: '获得哈弗大学经济学学士学位',
                    image: ''
                },
                {
                    time: "2013年",
                    info: '获得哈弗大学经济学博士学位',
                    image: ''
                },
                {
                    time: "2014年",
                    info: '与金州勇士队签约，成为自1953年后首位进入NBA的哈佛大学学生',
                    image: ''
                }
            ],
            workexp: '6 years',
            info: {
                mothertongue: {
                    value: '英语',
                    pub: '1'
                },
                language: {
                    value: '英语',
                    pub: '1'
                },
                skilledcourse: {
                    value: mCourseNameArr[i % 4],
                    pub: '1'
                },
                info: {
                    value: "来吧同学.来吧同学来吧同学来吧同学来吧同学",
                    pub: '1'
                }
            }
        };
        turels.push(turel);
        ucrels.push(ucrel);
        tcrels.push(tcrel);
        courses.push(course);
        teachers.push(teacher);
        tcreds.push(tcred);
    }

    //async生产数据
    var tasks = ['mod-turel','mod-ucrel','mod-tcrel','mod-course','mod-teacher','mod-tcred'];
    async.each(tasks, function (item, callback) {
        switch (item) {
            case 'mod-turel':
                turelMod.collection.insert(turels,function(err,docs){
                    if (err) { console.error(err);}
                    else { console.info('%d count turels were successfully stored.', docs['insertedCount']);
                        callback();
                    }
                })
                break;
            case 'mod-ucrel':
                ucrelMod.collection.insert(ucrels,function(err,docs){
                    if (err) { console.error(err);}
                    else { console.info('%d count ucrels were successfully stored.', docs['insertedCount']);
                        callback();
                    }
                })
                break;
            case 'mod-tcrel':
                tcrelMod.collection.insert(tcrels,function(err,docs){
                    if (err) { console.error(err);}
                    else { console.info('%d count tcrels were successfully stored.', docs['insertedCount']);
                        callback();
                    }
                })
                break;
            case 'mod-course':
                courseMod.collection.insert(courses,function(err,docs){
                    if (err) { console.error(err);}
                    else { console.info('%d count tcrels were successfully stored.', docs['insertedCount']);
                        callback();
                    }
                })
                break;
            case 'mod-teacher':
                userMod.collection.insert(teachers,function(err,docs){
                    if (err) { console.error(err);}
                    else { console.info('%d count teachers were successfully stored.', docs['insertedCount']);
                        callback();
                    }
                })
                break;
            case 'mod-tcred':
                tcredMod.collection.insert(tcreds,function(err,docs){
                    if (err) { console.error(err);}
                    else { console.info('%d count tcreds were successfully stored.', docs['insertedCount']);
                        callback();
                    }
                })
                break;
        }
    }, function (err) {
        res.json({
            status: 'success',
            turels: turels,
            ucrels: ucrels,
            tcrels: tcrels,
            courses: courses,
            teachers: teachers,
            tcreds:tcreds
        });
    });
},

//####################################################################
//删除我的老师测试数据
//url: http://localhost:3000/mod/user/clearMyTeachersTestData
//####################################################################
exports.clearMyTeachersTestData = function (req, res, next) {
    var tasks = ['remove-turel','remove-ucrel','remove-tcrel','remove-course','remove-teacher','remove-tcred'];
    async.each(tasks, function (item, callback) {
        switch (item) {
            case 'remove-turel':
                turelMod.remove({'objectid': querykey}, function (err, result) {
                    if (err) console.error(err);
                    callback();
                });
                break;
            case 'remove-ucrel':
                ucrelMod.remove({'courceid': querykey}, function (err, result) {
                    if (err) console.error(err);
                    callback();
                });
                break;
            case 'remove-tcrel':
                tcrelMod.remove({'courceid': querykey}, function (err, result) {
                    if (err) console.error(err);
                    callback();
                });
                break;
            case 'remove-course':
                courseMod.remove({'_id': querykey}, function (err, result) {
                    if (err) console.error(err);
                    callback();
                });
                break;
            case 'remove-teacher':
                userMod.remove({'_id': querykey}, function (err, result) {
                    if (err) console.error(err);
                    callback();
                });
                break;
            case 'remove-tcred':
                tcredMod.remove({'_id': querykey}, function (err, result) {
                    if (err) console.error(err);
                    callback();
                });
                break;
        }
    }, function (err) {
        console.log("删除原来测试数据成功！");
        res.json({status:'success'});
    });
}

//####################################################################
//查询我的老师
//@param reset 0:重置调用mod生产数据(默认-1，不重置)
//@param state -1：所有,0:正在授课 1:曾经授课(默认-1)
//@param count 一次查询的个数(默认20)
//url: http://localhost:3000/mod/user/queryMyTeachers?reset=0&type=0&count=20
//####################################################################
exports.queryMyTeachers = function(req,res,next){
    var reset = -1;
    var state = -1;
    var mUserid = uuid.v4();
    var mUserType = 0;
    //session
    if (req.session.user) {
        if (req.session.user.userid) mUserid = req.session.user.userid;
        if (req.session.user.usertype) mUserType = req.session.user.usertype;
    }
    //query params
    var count = 20; //默认数据20个
    if (req.query) {
        if (req.query.reset) reset = parseInt(req.query.reset);
        if (req.query.state) state = parseInt(req.query.state);
        if (req.query.count) count = parseInt(req.query.count);
    }

    var tasks = ['get-teachers','get-courses'];
    var teacherArr = [];
    var courseArr = [];
    var teacherIds = [];
    async.eachSeries(tasks, function (item, callback) {
        switch (item) {
            case 'get-teachers':
                //教学关系
                var query;
                if(state == -1) query = {"subjectid": mUserid,"relation.type": 0};
                else query = {"subjectid": mUserid,"relation.type": 0,"state.type":state};
                turelMod.find(query)
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
                        docs.forEach(function (value) {
                            teacherIds.push(value.objectid._id);
                            teacherArr.push({
                                //@see front model 'app/usercenter/model/myteachers/MyTeacherListItemModel'
                                id:value.objectid._id,
                                name:value.objectid.name,
                                email:value.objectid.email,
                                portrait:value.objectid.portrait,
                                phone:value.objectid.phone,
                                state:value.state,
                                course:{}
                            });
                        });
                        console.log(teacherIds);
                        callback();
                    });
                break;
            case 'get-courses':
                console.log(teacherIds);
                tcrelMod.find({"teacherid": { $in:teacherIds}})
                    .populate(
                        {
                            path: 'courceid',
                            select: {},
                            model: 'course',
                            match: {'statelv.lv': 2}
                        }
                    )
                    .exec(function (err, docs) {
                        if (err) console.log(err);
                        courseArr = docs;
                        callback();
                    });
                break;
        }
    }, function (err) {
        if(err) res.json(err);
        var result = [];
        teacherArr.forEach(function (teacher) {
            courseArr.forEach(function (course) {
                if(teacher.id == course.teacherid){
                    teacher.course = course.courceid
                    result.push(teacher);
                }
            })
        });
        res.json(result);
    });
}