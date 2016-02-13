/**
 * Created by xiaoguo on 2015/12/6.
 */

var express = require('express');
var router = express.Router();

var teacherCtlr = require('../app/controller/teacher');

/* GET users listing. */
//老师搜索首页
router.get('/', teacherCtlr.index);
router.get('/recommendation', teacherCtlr.recommendation);
router.get('/searchCondition', teacherCtlr.searchCondition);
router.get('/searchOneDetail', teacherCtlr.searchOneDetail);

router.get('/all', teacherCtlr.teachers);

module.exports = router;
