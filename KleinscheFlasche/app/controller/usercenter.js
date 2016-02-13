var tcredSchemaDBmodel = require('../model/tcred');
var teachercertMod = new tcredSchemaDBmodel.Schema('tcred').model;

var userSchemaDBmodel = require('../model/user');
var userMod = new userSchemaDBmodel.Schema('user').model;
var ucrelSchemaDBmodel = require('../model/ucrel');
var ucrelMod = new ucrelSchemaDBmodel.Schema('ucrel').model;
var calnodeSchemaDBmodel = require('../model/calnode');
var calnodeMod = new calnodeSchemaDBmodel.Schema('calnode').model;

var courseSchemaDBModel = require('../model/course');
var courseMod = new courseSchemaDBModel.Schema('course').model;

var async = require('async');
exports.center = function(req, res){
    var usertype = req.session.user.usertype;
    var render = 'usercenter/index';
    switch (usertype){
        case 0:
            render = 'usercenter/index';
            break;
        case 1:
            render = 'usercenter/index';
            break;
        case 2:
            render = 'usercenter/index';
            break;
        case 3:
            render = 'audit/index';
            break;
    }

    res.render(render, {
        title:"B&C Platform",
        page:"",
        login:"login",
        sessinfo:{},
        courses:{},
        teachers:{},
        agency:{}
    });
}

exports.role = function(req, res){
    var state = 0;
    if (req.query.state == 'undefined'){

    }else{
        state = parseInt(req.query.state);
    }
    console.log(req.query.state);
    var json = {
        rolelevel:state
    };
    var user0routes = {
        '':'sthome',
        'home':'sthome',
        'mycourse':'mycourse',
        'myteachers':'myteachers',
        'mycert':'mycert',
        'baseinfo':'baseinfo',
        'myfavorites':'myfavorites',
        'myhomework':'myhomework'
    };
    var user0menu = [
        {
            'name':'主页',
            'url':'home'
        },
        {
            'name':'我的课程',
            'url':'mycourse'
        },
        {
            'name':'我的老师',
            'url':'myteachers'
        },
        {
            'name':'我的作业',
            'url':'myhomework'
        },
        {
            'name':'我的收藏',
            'url':'myfavorites '
        },
        {
            'name':'用户信息',
            'url':'baseinfo'
        },
        {
            'name':'我的认证',
            'url':'mycert'
        }


    ];

    var user1routes = {
        '':'home',
        'home':'home',
        'coursemanage':'coursemanage',
        'mystudents':'mystudents',
        'sthomework':'sthomework',
        'myfavorites':'myfavorites',
        'mycourse':'mycourse',
        'myhomework':'myhomework',
        'myteachers':'myteachers',
        'baseinfo':'baseinfo',
        'mycert':'mycert'
    };
    var user1menu = [
        {
            'name':'主页',
            'url':'home'
        },
        {
            'name':'课程管理',
            'url':'coursemanage'
        },
        {
            'name':'我的学生',
            'url':'mystudents'
        },
        {
            'name':'学生作业',
            'url':'sthomework'
        },
        {
            'name':'我的收藏',
            'url':'myfavorites '
        },

        {
            'name':'我的课程',
            'url':'mycourse'
        },
        {
            'name':'我的作业',
            'url':'myhomework'
        },
        {
            'name':'我的老师',
            'url':'myteachers'
        },
        {
            'name':'用户信息',
            'url':'baseinfo'
        },
        {
            'name':'我的认证',
            'url':'mycert'
        }


    ];

    var user2routes = {
        '':'home',
        'home':'home',
        'mycourse':'mycourse',
        'mycert':'mycert',
        'baseinfo':'baseinfo',
        'coursemanage':'coursemanage',
        'myfavorites':'myfavorites',
        'myhomework':'myhomework',
        'sthomework':'sthomework'
    };
    var user2menu = [
        {
            'name':'主页',
            'url':'home'
        },
        {
            'name':'我的课程',
            'url':'mycourse'
        },
        {
            'name':'我的认证',
            'url':'mycert'
        },
        {
            'name':'用户信息',
            'url':'baseinfo'
        },
        {
            'name':'课程管理',
            'url':'coursemanage'
        },
        {
            'name':'我的收藏',
            'url':'myfavorites '
        }
    ];

    var audit0routes = {
        '':'home',
        'auditcourse':'auditcourse',
        'auditcred':'auditcert'
    };
    var audit0menu = [
        {
            'name':'主页',
            'url':'home'
        },
        {
            'name':'课程审核',
            'url':'auditcourse'
        },
        {
            'name':'认证审核',
            'url':'auditcert'
        }
    ]

    switch (state) {
        case 0:
            json.routes = user0routes;
            json.leftMenus = user0menu;
            break;
        case 1:
            json.routes = user1routes;
            json.leftMenus = user1menu;
            break;
        case 2:
            json.routes = user2routes;
            json.leftMenus = user2menu;
            break;
        case 3:
            json.routes = audit0routes;
            json.leftMenus = audit0menu;
            break;
        default:
            json.routes = user0routes;
            json.leftMenus = user0menu;
            break;

    }
    res.json(json);
}

exports.leftMenu = function(req, res){
    var rolelevel = 0;
    res.json([
        {
            'name':'主页',
            'url':'home'
        },
        {
            'name':'我的课程',
            'url':'mycourse'
        },
        {
            'name':'我的认证',
            'url':'mycert'
        },
        {
            'name':'用户信息',
            'url':'baseinfo'
        },
        {
            'name':'课程管理',
            'url':'coursemanage'
        },
        {
            'name':'我的收藏',
            'url':'myfavorites '
        }
    ]);
};
//消息列表
exports.info = function(req, res){
    res.json([
        {
            'url':'/ww1',
            'imgUrl':'/images/test/touxiang.jpg',
            'info':'xx点赞了我',
            'time':'2015-12-12'

        },
        {
            'url':'/www2',
            'imgUrl':'/images/test/touxiang.jpg',
            'info':'xx收藏了我的课程xx',
            'time':'2015-12-12'
        },
        {
            'url':'/www3',
            'imgUrl':'/images/test/touxiang.jpg',
            'info':'xx点赞了我',
            'time':'2015-12-12'
        },
        {
            'url':'/www4',
            'imgUrl':'/images/test/touxiang.jpg',
            'info':'xx给xx课程打了XX分',
            'time':'2015-12-12'
        }
    ]);
}
exports.basicinfo = function(req, res) {
    var data = req.body;
    console.log(data);
    res.json({
        'name':'sun',
        'sex':'女',
        'email':'123456789@qq.com',
        'phone':'12345678901',
        'birth':'2015-12-12',
        'city':'杭州',
        'nationality':'中国'
    })
};

exports.mycertdemo = function(req, res){
	var ss = req.session;
	var userid = '';
	var usertype= '0';
	if(ss != undefined){
		var user = ss.user;
		if(user != undefined){
			userid = user.userid;
			usertype = user.usertype;
		}
	}
	teachercertMod.find({"userid":userid},function(err,collection){
		if(err){
			res.json({
				usertype:usertype
			});
		}else{
			if(collection.length != 1){
				res.json({
					usertype:usertype
				});
			}else{
				var dd = collection[0]._doc;
				dd.usertype = usertype;
				res.json(dd);
			}
		}
	})

};

exports.mycoursemanage = function(req, res){
    var courses = [];

    var nameArr = ["旅游英语", "历史专业英语", "化学专业英语", "物理专业英语","实用英语", "计算机专业英语"]

    var billingArr =  [0,1,2];
    var billingAliasArr = ["按每节课收费", "按小时收费", "课程总体收费"];
    var methodArr = [0,1,2];
    var methodAliasArr = ["教室授课", "上门授课", "网上远程授课"];
    var modeArr = [0, 1];
    var modeAliasArr = ["一对一", "一对多"];
    var checkArr = [0,1,2,3,4];
    var checkAliasArr = ["未审核", "等待审核", "审核中", "审核成功", "审核失败"];
    var pubarr = [1];
    var pubAliasArr = ["已发布"];
    var actstateArr = [0, 1, 2];
    var actstateAliassArr = ["未开课", "进行中", "已结束"];

    var signArr = [5,7,1,3,6,7];

    var statelv = 0;

    var select = 0;
    if (req.query.select){
        select = parseInt(req.query.select);
    }

    for (var i=0; i<10;i++){
        var name = nameArr[i%nameArr.length];
        var billing = billingArr[i%billingArr.length];
        var billingAlias = billingAliasArr[i%billingAliasArr.length];
        var method = methodArr[i%methodArr.length];
        var methodAlias = methodAliasArr[i%methodAliasArr.length];
        var mode = modeArr[i%modeArr.length];
        var modeAliass = modeAliasArr[i%modeAliasArr.length];
        var check = checkArr[i%checkArr.length];
        var checkAlias = checkAliasArr[i%checkAliasArr.length];
        var pub = pubarr[i%pubarr.length];
        var pubAlias = pubAliasArr[i%pubAliasArr.length];
        var actstate = actstateArr[i%actstateArr.length];
        var actstateAlias = actstateAliassArr[i%actstateAliassArr.length];

        var sltype =0;
        var slname = "";

        switch (select){
            case 0://未公开
                sltype = check;
                slname = checkAlias;
                break;
            case 1://已发布
                sltype = pub;
                slname = pubAlias;
                break;
            case 2://进行中
                sltype = actstate;
                slname = actstateAlias;
                break;
            case 3://已下架
                sltype = 2;
                slname = "已下架";
                break;
        }

        var crs = {
            id:'course-'+i+'-lv-'+select+'-'+parseInt(Math.random()*1000),
            name:name,
            introduction:'简介',
            info:'描述',
            catalog:'大纲',
            billing:{
                type:{
                    fvalue:billing,
                    fdetail:billingAlias
                }
            },
            price:i*10,
            method:{
                type:method,
                name:methodAlias
            },
            classroom:"自选教室",
            mode:{
                type:mode,
                name:modeAliass
            },
            range:{
                max:22,
                min:14
            },
            thumbnail:'',
            image:'',
            score:'100',
            comment:5,
            enable:1,
            cdate:new Date(),
            statelv:{
                lv:select,
                type:sltype,
                name:slname
            },
            signnum:signArr[i%signArr.length],
            actnum:signArr[i%signArr.length]-1
        };

        courses.push(crs);
    }

    res.json(courses);
}

exports.myStuCourse = function(req,res) {
	if (req.session == undefined) {
		res.reject = "/";
		return;
	}
	var type = req.query.type;
	if (type == undefined) {
		type = 2;
	}
	var user = req.session.user;
	var userid = user.userid;
	if (userid == undefined) {
		res.reject = "/";
		return;
	}
	var tasks = [];
	if (type == 2) {
		tasks = ["ucrel", "calnodes", "toResult"];
	}else{
		tasks = ["ucrel", "toResult"];
	}
	var result = {} ;
	var objList ;
	var ss = [];
	async.eachSeries(tasks, function (item, callback) {
		switch(item){
			case "ucrel":
			{
				ucrelMod.find({"userid":userid,"relation.type":type,"enable":true}).populate([{path:"userid",select:"name"}
					,{path:"courceid","select":"name"}
					,{path:"teacherid","select":"name"}
				]).exec(function(err,collection){
					if(err){
						result.ucrel = null;
						result.ucrelmsg= {
							state:'fail',
							msg:'数据库错误'
						}
						callback();
					}else{
						objList = collection;
						ss  = objList;
						result.ucrel = objList;
						result.ucrelmsg = {
							state:'success',
							msg:''
						};
						callback();
					}

				});
				break;
			}

			case "calnodes":{
					if (result.ucrelmsg.state == 'fail'){
						result.calnodes = null;
						result.calnodesmsg = {
							state:'fail'
						};
						callback();
					}
					var zindex = 0;
					for(var i = 0 ; i < objList.length ; i ++){
						var obb = objList[i];

						var dd = new Date();

						calnodeMod.find({"courseid":obb.courceid._id,"students.stuid":userid,"tdate":{"$gte": new Date("2016-01-11")}})
							.sort({"tdate":1}).exec(function(err,datas){
								var obj = objList[zindex];
								zindex++;
								if(err){
									obj._doc.nextdate = "未安排";
									obj._doc.nextaddress = "未安排";
									ss.push(obj);
								}else{
									if(datas.length != 0){
										obj._doc.nextdate =datas[0].tdate;
										obj._doc.nextaddress = datas[0].address;
									}else{
										obj._doc.nextdate = "未安排";
										obj._doc.nextaddress = "未安排";
									}
									ss.push(obj);
								}
								if( i == zindex){

									callback();
								}
							});
					}
				break;

			}
			case "toResult":{
				result.ucrel = ss;
				callback();
				break;
			}
		}

	}, function (err) {
		if (err){
			res.json({
				"code":"202",
				"msg":"数据不存在"
			})
		}else{
			res.json(result.ucrel);
		}
	});

}


exports.myStuEndCourse = function(req,res){
	if(req.session == undefined){
		res.reject ="/";
		return;
	}
	var type = req.query.type;
	if(type == undefined){
		type = 3;
	}
	var user = req.session.user;
	var userid = user.userid;
	if(userid == undefined){
		res.reject ="/";
		return;
	}
	var tasks = ["ucrel","calnodes","toResult"];
	var result = {} ;
	var objList ;
	var ss = [];

	ucrelMod.find({"userid":userid,"relation.type":type,"enable":true}).populate([{path:"userid",select:"name"}
		,{path:"courceid","select":"name"}
		,{path:"teacherid","select":"name"}
	]).exec(function(err,collection){
		if (err){
			res.json({
				"code":"202",
				"msg":"数据不存在"
			})
		}else{
			res.json(collection);
		}


	});

}

/* 取消报名*/
exports.cancelSign = function(req,res){
	var curelid = req.body.cureid;
	ucrelMod.find({"_id":curelid},function(err,collection){
		if(err){
			res.json({"code":202,"msg":"数据库错误"});
		}else{
			ucrelMod.update({"_id":curelid},{"enable":false,"state":0} ,{},function(err,dd){});
			console.log("取消成功");
			res.json({"code":200});

		}
	});
}

exports.getCourseInfo = function(req,res){
	var courseid = req.query.courseid;
console.log(courseid);
	courseMod.find({"_id":courseid},function(err,collection){
		if(err){
			res.json({"code":"202","msg":"数据库错误"})
		}else{
			if(collection.length != 1){
				res.json({"code":"202","msg":"数据错误"})
			}else{
				res.json(collection[0]);
			}

		}
	});
}
exports.markTheCourse = function(req,res){
	var score = req.body.score;
	var curelid = req.body.cureid;
	ucrelMod.update({"_id":curelid},{$set:{"coursescore":score}},{},function(err,dd){});
	res.json({"code":"200","msg":"评分成功"});
}


exports.getTeacherInfo = function(req,res){
	var userid = req.query.userid;

	userModMod.find({"_id":userid},function(err,collection){
		if(err){
			res.json({"code":"202","msg":"数据库错误"})
		}else{
			if(collection.length != 1){
				res.json({"code":"202","msg":"数据错误"})
			}else{
				res.json(collection[0]);
			}

		}
	});
}
exports.markTheTeacher = function(req,res){
	var score = req.body.score;
	var curelid = req.body.cureid;
	ucrelMod.update({"_id":curelid},{$set:{"teacherscore":score}},{},function(err,dd){});
	res.json({"code":"200","msg":"评分成功"});
}