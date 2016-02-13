/**
 * Created by apple on 15/12/5.
 */

module.exports = function(grunt) {

    grunt.initConfig({
        watch:{
            ejs:{
                files:["views/**"],
                options:{
                    livereload:true
                }
            },
            js:{
                files:[
                    "public/javascripts/*.js",
                    "app/**/*.js",
                    "routes/*.js",
                    "app.js"
                ],
                options:{
                    livereload:true
                }
            }
        },
        jshint:{
            options:{
                jshint:'.jshint',
                ignores:['public/libs/**/*.js']
            },
            all:['public/js/*.js', 'test/**/*.js', 'app/**/*.js']
        },
        less:{
            development: {
                options: {
                    compress: true,
                    yuicompress: true,
                    optimization: 2
                },
                files: {
                    'public/build/index.css': 'public/stylesheets/index.less'
                }
            }
        },
        uglify: {
            development: {
                files: {
                    'public/build/admin.min.js': 'public/js/admin.js',
                    'public/build/detail.min.js': [
                        'public/js/detail.js'
                    ]
                }
            }
        },

        nodemon: {
            dev: {
                options: {
                    file: 'app.js',
                    args: [],
                    ignoredFiles: ['README.md', 'node_modules/**', '.DS_Store'],
                    watchedExtensions: ['js'],
                    watchedFolders: ['./'],
                    debug: true,
                    delayTime: 1,
                    env: {
                        PORT: 3000
                    },
                    cwd: __dirname
                }
            }
        },

        mochaTest: {
            options: {
                reporter: 'spec'
            },
            src: ['test/**/*.js']
        },

        concurrent: {
            tasks: ['nodemon', 'watch', 'less', 'uglify', 'jshint'],
            options: {
                logConcurrentOutput: true
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');//文件添加修改重新执行
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-concurrent');

    grunt.option('force', true);
    grunt.registerTask('default', ['concurrent']);
}