/**
 * Created by cs on 2016/1/1.
 */
var express = require('express');
var router = express.Router();

var favoriteCtrl = require('../app/controller/favorites');

//--------------我的收藏--------------
router.get('/columns', favoriteCtrl.columns);
router.get('/allTypes', favoriteCtrl.allTypes);
router.get('/allData', favoriteCtrl.allData);

module.exports = router;
