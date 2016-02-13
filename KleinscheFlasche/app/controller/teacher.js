/**
 * Created by xiaoguo on 2015/12/6.
 */
var fs = require('fs');
var teacherpath = "./app/config/recommendteachers.json";
var conditionpath = "./app/config/teachersearchcondition.json";

//var teacherDBModel = require('../model/teacher');
//var userDBModel = require('../model/user');
//var teacherMod = new teacherDBModel.Schema('teacher').model;
//var userMod = new userDBModel.Schema('user').model;

var userDBSchema = require('../model/user');
var userMod = userDBSchema.Schema('user').model;
var tcredSBSchema = require('../model/tcred');
var tcredMod = tcredSBSchema.Schema('tcred').model;

var indexUtil = require('../util/index');


//
exports.index = function(req, res){
    res.render('index/teachers', {

    });
}

//推荐的老师
exports.recommendation = function(req, res){
    console.log(req.query);
    if (typeof(req.query.type ) != 'undefined'){
        var qo = req.query.qo;
        //console.log(qo);


        //console.log(sorttag);
        var teredn = {};
        var usern = {};
        if(qo.skilledcourse != 'all'){
            teredn['info.skilledcourse.value'] = qo.skilledcourse;
        }
        if(qo.degree!="all"){
            teredn['acadecerti.level'] = qo.degree;
        }
        if(qo.starlevel!="all"){
            usern['starlevel'] = qo.starlevel;
        }
        if(qo.city!="all"){
            usern['city'] = qo.city;
        }
        //var sorttag = req.query.sorttag;
        var sorttag = {};
        if(req.query.sorttag=='likes'){
            sorttag = {'likes':-1};
        }else if(req.query.sorttag=='score'){
            sorttag = {'score':-1};
        }

        //console.log(usern);
        userMod.find(usern)
            .populate({
                path:'tcredid',
                select:'name acadecerti servexerti info',
                model:"tcred",
                match:teredn
            })
            .sort(sorttag)
            .exec(function(err, docs){
                console.log(err);

                var resjson = {};
                var count;
                var arr = [];
                for (var i=0; i < docs.length; i++){
                    var doc = docs[i];
                    if (doc.tcredid != null){
                        arr.push(doc);
                    }
                }

                count = arr.length;
                var page = req.query.page;
                var num = req.query.limit;
                console.log(page);
                console.log(num);;
                var arr2 = [];
                var total = page*num;
                if (total > arr.length){
                    total = arr.length;
                }
                for (var j = (page-1)*num; j < total; j++){
                    arr2.push(arr[j]);

                }

                var collection = [];
                var degreearray = ['学士以下','学士','硕士','博士','无'];
                var stararray = ['无星级','一星级','二星级','三星级','四星级','五星级'];
                for(var i=0; i<arr2.length; i++){
                    var model = {};
                    model['uuid'] = arr2[i]._id;
                    model['name'] = arr2[i].tcredid.name;
                    model['nationality'] = arr2[i].nationality;
                    model['city'] = arr2[i].city;
                    model['portrait'] = arr2[i].portrait;
                    model['degree'] = degreearray[arr2[i].tcredid.acadecerti.level];
                    model['servexerti'] = arr2[i].tcredid.servexerti;
                    model['starlevel'] = stararray[arr2[i].starlevel];
                    model['optioninfo'] = arr2[i].tcredid.info;

                    collection.push(model);
                }

                resjson['count'] = count;
                resjson['collection'] = collection;
                res.json(resjson);
            })
    }else{
        var teacherjson = indexUtil.recomteachers();
        res.json(teacherjson);
    }
}

//老师的详细资料
exports.searchOneDetail = function(req, res){
    console.log(req.query);
    if (typeof(req.query.type ) != 'undefined'){
        var qo = req.query.qo;

        //console.log(usern);
        userMod.find(qo)
            .populate({
                path:'tcredid',
                select:'name acadecerti servexerti info',
                model:"tcred"
            })
            .exec(function(err, docs){
                console.log(err);

                var doc = docs[0];
                var model = {};

                var degreearray = ['学士以下','学士','硕士','博士','无'];
                var stararray = ['无星级','一星级','二星级','三星级','四星级','五星级'];
                model['uuid'] = doc._id;
                model['name'] = doc.tcredid.name;
                model['sex'] = doc.sex;
                model['age'] = doc.age;
                model['nationality'] = doc.nationality;
                model['city'] = doc.city;
                model['portrait'] = doc.portrait;
                model['degree'] = degreearray[doc.tcredid.acadecerti.level];
                model['servexerti'] = doc.tcredid.servexerti;
                model['starlevel'] = stararray[doc.starlevel];
                model['optioninfo'] = doc.tcredid.info;

                res.json(model);
            })
    }else{
        var teacherjson = indexUtil.recomteachers();
        res.json(teacherjson);
    }
}

//搜索条件
exports.searchCondition = function(req, res){
    var conditionjson = JSON.parse(fs.readFileSync(conditionpath));
    res.json(conditionjson);
}

exports.teachers = function(req, res, next) {
    teacherMod.find({}, function(err, listitems){
        if (err){
            console.log(err);
            res.render('index', {
                title:'404'
            })
        }else{
            res.render('teacher', {
                teachers:listitems,
                title:'老师'
            });
        }

    });

}
