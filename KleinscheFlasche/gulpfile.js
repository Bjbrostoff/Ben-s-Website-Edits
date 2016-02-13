/**
 * Created by apple on 15/12/16.
 */
var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var livereload = require('gulp-livereload');

var paths = {
    client:[
        'public/javascripts/**',
        'public/stylesheets/**'
    ],
    server:{
        index:'./bin/www'
    }
}

//
var nodemonConfig = {
    script:paths.server.index,
    ignore:[
        "public/**",
        "views/**"
    ],
    env:{
        "NODE_ENV":"development"
    }
};

gulp.task('server', ['livereload'], function(){
    return nodemon(nodemonConfig);
});

gulp.task('livereload', function(){
    livereload.listen();
    var server = livereload();

    return gulp.watch(paths.client);
});

gulp.task('default', ['server', 'livereload']);