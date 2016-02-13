/**
 * Created by xiaoguo on 2015/12/14.
 */

var express = require('express');
var router = express.Router();

var indexCtlr = require("../app/controller/index");

/* GET home page. */
router.get('/', indexCtlr.index);

router.get('/courses', function(req, res){
  res.render('index/cources', {title:'课程中心', page:'cources', sessinfo:{user:req.session.user}});
});

router.get('/teachers', function(req, res){
  res.render('index/teachers', {title:"金牌讲师", page:'teachers', sessinfo:{user:req.session.user}});
});

router.get('/agencies', function(req, res){
  res.render('index/agencies', {title:"专业机构", page:'agencies', sessinfo:{user:req.session.user}});
});

router.get('/test', function(req, res){
  /*
   res.header("Content-Type", "text/html");
   res.write("<html><head></head><body><div>test</div></body></html>");
   res.end();
   */
  res.render("index");
});
router.get('/register',function(req,res){
  res.render("register/register", {
    title:"注册",
    page:""
  });
});

router.get('/basicAuth',function(req,res){
	res.render("register/basicAuth", {
		title:"基础认证",
		page:"",
		login:"login",
		courses:"",
		teachers:"",
		agency:""
	});
});

module.exports = router;

