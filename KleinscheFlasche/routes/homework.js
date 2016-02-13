/**
 * Created by Administrator on 2016/1/4.
 */
var express = require('express');
var router = express.Router();

var courseCtrl = require('../app/controller/assignment');


router.get('/work', courseCtrl.work);

module.exports = router;