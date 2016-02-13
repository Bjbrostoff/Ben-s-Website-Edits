var express = require('express');
var router = express.Router();

var modCourseCtlr = require('../app/controller/mod/course');
var modUserCtlr = require('../app/controller/mod/user');
var favoriteCtlr = require('../app/controller/favorites');
var myTeacherCtlr = require('../app/controller/mod/myteacher');

//用户
router.get('/user/modUserList', modUserCtlr.modUserList);
router.get('/user/modteacheruser', modUserCtlr.modTeacherUser);
router.get('/user/modAuditUser', modUserCtlr.modAuditUser);

router.get('/user/query/teacher', modUserCtlr.queryTeacher);

//收藏
router.get('/user/queryFavorite', favoriteCtlr.queryFavorite);
router.get('/user/clearFavorite', favoriteCtlr.clearFavorite);
router.get('/user/queryFavoriteCharts', favoriteCtlr.queryFavoriteCharts); //图表

//我的老师
router.get('/user/modMyTeachers', myTeacherCtlr.modMyTeachers);
router.get('/user/clearMyTeachersTestData', myTeacherCtlr.clearMyTeachersTestData);
router.get('/user/queryMyTeachers', myTeacherCtlr.queryMyTeachers);
//MapReduce
router.get('/user/mapReduce', modUserCtlr.mapReduce);
router.get('/course/createCourse', modCourseCtlr.createCourse);
router.get("/user/saveCalnode",modUserCtlr.saveCalnode);
module.exports = router;
