/**
 * Created by Administrator on 2016/1/3.
 */
var express = require('express');
var router = express.Router();

var courseCtrl = require('../app/controller/calendarEvent');


router.get('/events', courseCtrl.events);

//可安排课程
router.get('/courseArrange', courseCtrl.coursesArrange);


module.exports = router;