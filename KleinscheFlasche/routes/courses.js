var express = require('express');
var router = express.Router();

var courseCtrl = require('../app/controller/course');

//--------------课程--------------
//我进行中的课程
router.get('/myActCourses', courseCtrl.myActCourses);
router.get('/myPubCourses', courseCtrl.myPubCourses);
router.get('/myNewCourses', courseCtrl.myNewCourses);
router.get('/mySelloutCourses', courseCtrl.mySelloutCourses);
router.get('/myAllCourses', courseCtrl.myAllCourses);

//课程概览
router.get('/summary', courseCtrl.overview);

/* xiaoguo 2016-01-02. */
//课程搜索首页
router.get('/', courseCtrl.index);
router.get('/recommendation', courseCtrl.recommendation);
router.get('/searchCondition', courseCtrl.searchCondition);

router.get('/all', courseCtrl.courses);

module.exports = router;
