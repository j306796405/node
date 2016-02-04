module.exports = function (grunt) {
    'use strict';

    var pkgInfo = {
        target: '../build/proManage',
    };

    grunt.initConfig({
        pkgInfo: pkgInfo,
        pkg: '',
        clean: {
            build: {
                src: ['<%= pkgInfo.target%>'],
                options: {
                    force: true
                }
            }
        },
        copy: {
            dist: {
                files: [{
                    expand: true,
                    cwd: './',
                    src: ['**'],
                    dest: '<%= pkgInfo.target %>'
                }]
            }
        },
        /*
            separator 文件连接分隔符，表示连接的文件用指定的separator分割。
            banner 出现在合并后的文件开头出现，一般做说明和注释用。
            footer 出现在合并后的文件底部出现，一般做说明和注释用。
            stripBanners 如果为true，去除代码中的块注释，默认为false
            process  如果为true，则在合并前先执行。
        */
        concat: {
            options: {
                separator: ';',
                stripBanners: true,
                banner: '/*! concat - v1.0.0 - 2015-12-18 */'
            },
            dist: {
                src: ['<%= pkgInfo.target %>/page/js/**/*.js'],
                dest: '<%= pkgInfo.target %>/page/js/combin.js',
            },
        },
        uglify: {
            js: {
                files: {
                    '<%= pkgInfo.target %>/page/js/combin.min.js': ['<%= pkgInfo.target %>/page/js/combin.js']
                }
            }
        },
        cssmin: {
            options: {
                shorthandCompacting: false,
                roundingPrecision: -1
            },
            target: {
                files: {
                    '<%= pkgInfo.target %>/page/style/combin.min.css': ['<%= pkgInfo.target %>/page/style/**/*.css']
                }
            }
        },
        useminPrepare: {
            html: {
                src: ['<%= pkgInfo.target %>/page/app*.html']
            }
        },
        usemin: {
            html: {
                src: ['<%= pkgInfo.target %>/page/app*.html']
            }
        }
    });

    // Load the plugin
    grunt.loadNpmTasks('grunt-usemin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    // Default task(s)
    grunt.registerTask('default', [
        'clean',
        'copy',
        'useminPrepare',
        'concat',
        'uglify',
        'cssmin',
        'usemin'
    ]);
};