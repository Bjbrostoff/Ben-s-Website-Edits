var uuid = require('node-uuid');
var md5 = require('md5');

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

var userDBSchema = require('../../model/user');

var userMod = userDBSchema.Schema('user').model;

var tcredSBSchema = require('../../model/tcred');
var tcredMod = tcredSBSchema.Schema('tcred').model;
var courseSchema = require('../../model/course');
var courseMod = courseSchema.Schema('course').model;
var tcrelsSchema = require('../../model/tcrel');
var tcrels = tcrelsSchema.Schema('tcrel').model;

var calnodeDBSchema = require("../../model/calnode");
var calnodeMod = calnodeDBSchema.Schema("calnode").model;



exports.modUserList = function(req, res){
    console.log('mod user list');
}

//mod老师用户
exports.modTeacherUser = function(req, res){

    var cityarray = ['杭州','北京','上海','广州'];
    var coursearray = ['零基础','日常英语','旅游英语','职场英语'];
    for (var i=0; i < 100; i++){
        var uuuid = uuid.v4();
        var tuuid = uuid.v4();
        var user = {
            _id:uuuid,
            tcredid:tuuid,
            name:'name-'+i,
            email:'abc'+i+'@163.com',
            phone:'1234'+i,
            password:md5('123456'+i),
            age:'24',
            sex:'male',
            nationality:'U.S.A',
            birth:'1990-10-10',
            enable:1,
            usertype:1,
            portrait:'/inspinia/img/a'+(i%6+Number(1))+'.jpg',
            city:cityarray[i%4],
            score:i,
            starlevel:i%5,
            likes:i
        };
        var tcred = {
            _id:tuuid,
            name:'Chris'+i,
            credentype:"idcode",
            credencode:'ABC-'+i,
            credenimage:'',
            payway:"",
            acadecerti:{
                level:i%5,
                image:'',
                code:''
            },
            servexerti:
             [
                 {
                    time:"2009年",
                    info:'带领哈佛大学篮球队取得常春藤联盟分组冠军，进入NCAA64强',
                    image:''
                 },
                 {
                     time:"2010年",
                     info:'获得哈弗大学经济学学士学位',
                     image:''
                 },
                 {
                     time:"2013年",
                     info:'获得哈弗大学经济学博士学位',
                     image:''
                 },
                 {
                     time:"2014年",
                     info:'与金州勇士队签约，成为自1953年后首位进入NBA的哈佛大学学生',
                     image:''
                 }
             ],
            workexp:'6 years',
            info:{
                mothertongue:{
                    value:'英语',
                    pub:'1'
                },
                language:{
                    value:'英语',
                    pub:'1'
                },
                skilledcourse:{
                    value:coursearray[i%4],
                    pub:'1'
                },
                info:{
                    value:"来吧同学.来吧同学来吧同学来吧同学来吧同学",
                    pub:'1'
                }
            }

        };

        var userEntity = new userMod(user);
        userEntity.save(function(err){
            console.log(err);
        });
        var tcredEntity = new tcredMod(tcred);
        tcredEntity.save(function(err){

        });

    }

    res.json({
        status:'sucess'
    })
};

exports.queryTeacher = function(req, res){
    userMod.find({'name':'name-2'})
        .populate({
            path:'tcredid',
            select:'name',
            model:"tcred",
            match:{
                'name':'Chris2'
            }
        })
        .exec(function(err, docs){
            var arr = [];
            for (var i=0; i < docs.length; i++){
                var doc = docs[i];

                if (doc.userid != null){
                    arr.push(doc);
                }
            }

            var page = 0;
            var num = 10;
            var arr2 = [];
            var total = (page+1)*num;
            if (total > arr.length){
                total = arr.length;
            }
            for (var j = page*num; j < total; j++){
                arr2.push(arr[j]);

            }

            res.json(arr2);
        })
}

exports.mapReduce = function(req, res){
    /*
    tcredMod.find({'name':'Chris1'})
        .populate({
            path:'userid',
            select:'city name',
            model:"user",
            match:{
                'userid.name':'name-2'
            }
        })
        .exec(function(err, docs){
            var arr = [];
            for (var i=0; i < docs.length; i++){
                var doc = docs[i];

                if (doc.userid != null){
                    arr.push(doc);
                }
            }

            var page = 0;
            var num = 10;
            var arr2 = [];
            var total = (page+1)*num;
            if (total > arr.length){
                total = arr.length;
            }
            for (var j = page*num; j < total; j++){
                arr2.push(arr[j]);

            }

            res.json(arr2);
        })
        */
    var mapTcred = function(){
        var values = {
            userid:this.userid
        };
        emit(this.userid, values);
    };
    var mapUser = function(){
        var values = {
            city:this.city
        };
        emit(this.city, values);
    }

    var reduce = function(k, vals){
        var result = {};
        values.forEach(function(value){
            var field;
            if ("userid" in value){
                if (!('userids' in result)){
                    result.userids = [];
                }
                result.userids.push(value);
            }else{
                for (filed in value){
                    if (value.hasOwnProperty(field)){
                        result[field] = value[field];
                    }
                }
            }
        });

        return result;
    };

    mongoose.connection.db.dropCollection('teacher');

    userMod.mapReduce(mapUser, reduce, {"out":{"reduce":"teacher"}});
    tcredMod.mapReduce(tcredMod, reduce, {"out":{"reduce":"teacher"}});
    mongoose.connection.db.teacher.find({}, function(err, teachers){
        res.json(teachers);
    })

}

exports.createCourse = function(req,res,next){
	userMod.find({},function(err,collection){
		if(collection.length > 0 ){
			for(var xx = 0 ; xx < collection.length ;xx++){
				var cc = collection[xx];
				var userid = cc._id;
				for(var i = 0 ; i < 10; i++){
					var courseId = uuid.v4();
					var entity = new courseMod({
						_id:courseId,
						name:"英语"+i,
						introduction:"这是个简介",
						info:"这是一门英语课",
						catalog:"这是课程目录",
						billing:
						{
							type:{
								fvalue:1,
								fdetail:"标准"
							},
							info:{
								total:10,
								duration:60
							}
						},
						price:"50",
						method:{
							type: 1,
							name: "上门授课"
						},
						mode:{
							type: 0,
							name: "一对一"
						},range:{
							min:1,max:10
						},


						//课程评分 (接收程度。。。。)
						score:"6",
						//课程点赞
						comment:100+i,
						//可用状态 (老师删除掉的课程状态不可用 0不可用 1可用)
						enable:1,
						//----审核信息----
						//创建日期
						cdate: new Date(),
						//审核状态 0未审核 1等待审核 2审核中 3审核成功 4审核失败
						checkstate:{
							type: 3,
							name: '审核成功'
						},
						//发布状态 0未发布 1已发布 2已下架
						pubstate:
						{
							type: 1,
							name: "已发布"
						},
						//进行状态 0未开课 1进行中 2已结束
						actstate:{
							type: 0,
							name: "未开课"
						}
					});
					entity.save(function(err){

					});
					var tcl = new tcrels({
						teacherid:userid,//教师id
						relation:{//#关系 （0拥有,1创建 ?待定）
							type:1,
							name:"拥有"
						},
						courceid:courseId//课程id
					});
					tcl.save(function(err){
						console.log("tcl"+err);
					})
				}
			}
		}
	});
}


exports.modAuditUser = function(req, res){
    var uuuid = uuid.v4();
    var i='audit';
    var user = {
        _id:uuuid,
        tcredid:null,
        name:'name-'+i,
        email:i+'@163.com',
        phone:'1234'+i,
        password:md5('123456'+i),
        age:'24',
        sex:'male',
        nationality:'U.S.A',
        birth:'1990-10-10',
        enable:1,
        usertype:3,
        portrait:'',
        city:'杭州',
        score:1,
        starlevel:1,
        likes:1
    };

    var userEntity = new userMod(user);
    userEntity.save(function(err){
        console.log(err);
    });

    res.json({
        state:'success'
    })
}

exports.saveCalnode = function(req,res){
	for(var i = 12; i < 20; i ++){
		var newDate = new Date("2016-01-"+i);
		var calnodeEntity = new calnodeMod({
			_id:uuid.v4(),
			tdate:newDate,
			teacherid:'33f0fc21-459f-43a1-9ede-30c4832c511d',
			courseid:'test-favorite3c46e9a0-dbc5-44da-834c-4a3c234bb662',
			state:0,// (0未上课，1已上课)
			students:[{
				stuid:"66373b0f-539d-47d6-bc3a-5c27b5133bfe",
				status:0 //0：未来上课，1：已经来上课
			}],
			address:"杭州滨江伟业路XXX路XXX街道"
		})
		calnodeEntity.save(function(err){

		});

	}
	res.json({"msg":'success'})
}
