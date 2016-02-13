/**
 * Created by xiaoguo on 2015/12/14.
 */

var userDBSchema = require('../model/user');
var userMod = userDBSchema.Schema('user').model;
var tcredSBSchema = require('../model/tcred');
var tcredMod = tcredSBSchema.Schema('tcred').model;
var indexUtil = require("../util/index");

exports.index = function(req, res, next){
    //console.log(req);
    var json = indexUtil.indexjson();
    var recomteachersArr = indexUtil.recomteachers();
    if (recomteachersArr.length < 1){

        var sorttag = {'likes':-1};

        //console.log(usern);
        userMod.find()
            .populate({
                path:'tcredid',
                select:'name acadecerti servexerti info'
            })
            .sort(sorttag)
            .exec(function(err, docs){
                console.log(err);

                var arr = [];
                for (var i=0; i < docs.length; i++){
                    var doc = docs[i];
                    if (doc.tcredid != null){
                        arr.push(doc);
                    }
                }

                var page = 1;
                var num = 3;
                var arr2 = [];
                var total = page*num;
                if (total > arr.length){
                    total = arr.length;
                }
                for (var j = (page-1)*num; j < total; j++){
                    arr2.push(arr[j]);

                }

                var degreearray = ['学士以下','学士','硕士','博士','无'];
                var stararray = ['无星级','一星级','二星级','三星级','四星级','五星级'];
                for(var i=0; i<arr2.length; i++){
                    var model = {};


                    var userinfo = {};
                    userinfo['uuid'] = arr2[i]._id;
                    userinfo['name'] = arr2[i].tcredid.name;
                    userinfo['nationality'] = arr2[i].nationality;
                    userinfo['city'] = arr2[i].city;
                    userinfo['portrait'] = arr2[i].portrait;

                    var custominfo = {};
                    custominfo['degree'] = degreearray[arr2[i].tcredid.acadecerti.level];
                    custominfo['servexerti'] = arr2[i].tcredid.servexerti;
                    custominfo['starlevel'] = stararray[arr2[i].starlevel];

                    var optioninfo = arr2[i].tcredid.info;

                    model['userinfo'] = userinfo;
                    model['custominfo'] = custominfo;
                    model['optioninfo'] = optioninfo;

                    recomteachersArr.push(model);



                }

                var sinfo = {};
                if (req.session){
                    sinfo = {
                        user:req.session.user
                    }
                }
                res.render("index", {
                    title:"index",
                    page:"index",
                    login:"login",
                    sessinfo:sinfo,
                    courses:json.courses,
                    users:json.users,
                    teachers:recomteachersArr,
                    agency:json.agency
                });
            })
    }else{
        var sinfo = {};
        if (req.session){
            sinfo = {
                user:req.session.user
            }
        }
        res.render("index", {
            title:"index",
            page:"index",
            login:"login",
            sessinfo:sinfo,
            courses:json.courses,
            users:json.users,
            teachers:recomteachersArr,
            agency:json.agency
        });
    }

}