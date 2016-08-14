var gulp = require('gulp'),
    webserver = require('gulp-webserver'),
    concat = require('gulp-concat'),
    minifyCSS = require('gulp-clean-css'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    minifyHTML = require('gulp-minify-html'),
    rimraf = require('gulp-rimraf'),
    zip = require('gulp-zip'),
    checkFileSize = require('gulp-check-filesize'),
    watch = require('gulp-watch'),

    serveDir = './build',

    server = {
        host: 'localhost',
        port: '1337'
    },

    distPaths = {
        build: 'build',
        js_build_file: 'game.min.js',
        css_build_file: 'game.min.css'
    },

    sourcePaths = {
        css: [
            'src/css/*.css',
        ],
        js: [
            'src/js/engine.js',
            'src/js/*.js'
        ],
        mainHtml: [
            'src/index.html'
        ]
    };

gulp.task('serve', function() {
    gulp.src(serveDir)
        .pipe(webserver({
            host: server.host,
            port: server.port,
            fallback: 'index.html',
            livereload: true,
            directoryListing: false,
            open: false
        }));
});

gulp.task('buildCSS', function() {
    return gulp.src(sourcePaths.css)
        .pipe(concat(distPaths.css_build_file))
        .pipe(minifyCSS())
        .pipe(gulp.dest(distPaths.build));
});

gulp.task('buildJS', function() {
    return gulp.src(sourcePaths.js)
        .pipe(concat(distPaths.js_build_file))
        .pipe(uglify())
        .pipe(gulp.dest(distPaths.build));
});

gulp.task('buildIndex', function() {
    return gulp.src(sourcePaths.mainHtml)
        .pipe(minifyHTML())
        .pipe(rename('index.html'))
        .pipe(gulp.dest(distPaths.build));
});

gulp.task('cleanBuild', function() {
    return gulp.src('./build/*', {
            read: false
        })
        .pipe(ignore('.gitignore'))
        .pipe(rimraf());
});

gulp.task('zipBuild', function() {
    return gulp.src('./build/*')
        .pipe(zip('game.zip'))
        .pipe(gulp.dest('./dist'))
        .pipe(checkFileSize({
            fileSizeLimit: 16384
        }));
});

gulp.task('watch', function() {
    gulp.watch(sourcePaths.css, ['buildCSS', 'zipBuild']);
    gulp.watch(sourcePaths.js, ['buildJS', 'zipBuild']);
    gulp.watch(sourcePaths.mainHtml, ['buildIndex', 'zipBuild']);
});

gulp.task('build', ['buildJS', 'buildCSS', 'buildIndex', 'zipBuild']);
gulp.task('default', ['build', 'serve', 'watch']);
