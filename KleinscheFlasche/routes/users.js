var express = require('express');
var router = express.Router();
var userCtlr = require('../app/controller/user');
var mailCtlr = require('../app/controller/mail');
var userCenterCtrl = require('../app/controller/usercenter');

var courseCtrl = require('../app/controller/course');

var auditCtrl = require('../app/controller/audit');

/* GET users listing. */
router.post('/register',userCtlr.register);
router.post('/sendEmail',mailCtlr.sendEmail);
router.post('/loginIn',userCtlr.loginIn);

//-------------------------------用户中心-----------------------
//用户中心 main页面
router.get('/center', userCenterCtrl.center);

//用户中心左侧菜单
router.get('/leftMenu', userCenterCtrl.leftMenu);

//用户角色权限
router.get('/role', userCenterCtrl.role);

//用户中心demo
router.get('/centerdemo', function(req, res){
    res.render('usercenter/indexdemo', {
        page:'usercenter',
        sessinfo:{user:req.session.user}
    });
});


//用户中心 main页面
router.get('/center', userCenterCtrl.center);

//消息列表
router.get('/info', userCenterCtrl.info);

//用户中心左侧菜单
router.get('/leftMenu', userCenterCtrl.leftMenu);

//跳转到基础认证信息 lcc
router.get('/toBasicAuth',userCtlr.toBasicAuth);

//文件上传 lcc
router.post('/fileUpload',userCtlr.fileUpload);

//注册成功，并且点击去进行的认证的时候，将其默认为登陆状态 lcc
router.post('/regToSession',userCtlr.regToSession);


//基本信息
router.get('/basicinfo', userCenterCtrl.basicinfo);

//认证测试数据
router.get('/mycertdemo', userCenterCtrl.mycertdemo);

//----------------------- 课程维护 ------------------------------
//课程测试数据
router.get('/mycoursemanage', userCenterCtrl.mycoursemanage);
//课程维护真实数据
router.get('/myActCourses', courseCtrl.myActCourses);
router.get('/myPubCourses', courseCtrl.myPubCourses);
router.get('/myNewCourses', courseCtrl.myNewCourses);
router.get('/mySelloutCourses', courseCtrl.mySelloutCourses);
router.get('/myAllCourses', courseCtrl.myAllCourses);
//----------------------- 课程维护 ------------------------------

router.post('/authenticate',userCtlr.authenticate);

router.post('/authenticateDB',userCtlr.authenticateDB);

router.get('/forgetpwd',userCtlr.forgetpwd);
router.post('/findUser',userCtlr.findUser);

router.post("/checkValidate",userCtlr.checkValidate);

router.post("/updatePwdForForget",userCtlr.updatePwdForForget);

router.get("/toBasicAuthXg",userCtlr.toBasicAuthXg);

//-------------------------------------------- 课程维护逻辑 -------------------------------------------
//创建
router.post('/createNewCourse', courseCtrl.createNewCourse);
//提交审核
router.post('/commitCourse', courseCtrl.commitCourse);
//-------------------------------------------- 课程维护逻辑 ------------------------------------------

//获得正在进行的或者报名的课程
router.get("/getStuCourse",userCenterCtrl.myStuCourse);

//获取结束的课程
router.get("/myStuEndCourse",userCenterCtrl.myStuEndCourse);

/*取消报名*/
router.post("/cancelSign",userCenterCtrl.cancelSign);

//获得课程信息
router.get("/getCourseInfo",userCenterCtrl.getCourseInfo);

//给课程评分
router.post("/markTheCourse",userCenterCtrl.markTheCourse);

router.get("/getTeacherInfo",userCenterCtrl.getTeacherInfo);

//-------------------------------------------- 课程审核逻辑 -------------------------------------------
//创建
router.post('/createNewCourse', courseCtrl.createNewCourse);
//提交审核
router.post('/commitCourse', courseCtrl.commitCourse);

//待审核的课程
router.get('/waitAuditCourses', auditCtrl.waitAuditCourses);
//审核中的课程
router.get('/actAuditCourses', auditCtrl.actAuditCourses);
//已审核的课程
router.get('/doneAuditCourses', auditCtrl.doneAuditCourses);

//标记为审核中
router.post('/actingAuditCourse', auditCtrl.actingAuditCourse);
router.get('/audit/fetchAnalysisMsg', auditCtrl.fetchAuditMsg);
router.get('/audit/analysisPass', auditCtrl.analysisPass);
//-------------------------------------------- 课程审核逻辑 ------------------------------------------


module.exports = router;
