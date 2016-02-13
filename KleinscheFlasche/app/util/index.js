/**
 * Created by xiaoguo on 2015/12/8.
 */
var fs = require('fs');

var path = "./app/config/index.json";

var userDBSchema = require('../model/user');
var userMod = userDBSchema.Schema('user').model;
var tcredSBSchema = require('../model/tcred');
var tcredMod = tcredSBSchema.Schema('tcred').model;

var recomteachersArr = [];

var courses = [],
    users = [],
    teachers = [],
    agency = [],
    recomteachersArr = [];

exports.indexjson = function(){
    console.log(1111);
    if (courses.length < 1) {
        var json = JSON.parse(fs.readFileSync(path));
        courses = json.courses;
        users = json.users;
        teachers = json.teachers;
        agency = json.agency;
    }

    return {
        courses:courses,
        users:users,
        teachers:teachers,
        agency:agency
    }
}

exports.recomteachers = function(arr){
    return recomteachersArr ;
}

exports.setRecomteachers = function(arr){
    recomteachersArr = arr;
}

//exports.recomteachers = function(){
//    if (recomteachersArr.length < 1){
//        recomteachersArr = JSON.parse(fs.readFileSync('./app/config/recommendteachers.json'));
//    }
//
//    return recomteachersArr;
//}