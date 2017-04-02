'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var inject = require('gulp-inject');
var concat = require('gulp-concat')
var wiredep = require('wiredep').stream;
var del = require('del');
var csso = require('gulp-csso');
var mainBowerFiles = require('main-bower-files');

gulp.task('clean', function (cb) {
    del(['assets/dist/css/', 'assets/dist/fonts/bootstrap/', 'assets/dist/js/'], cb);
});

gulp.task('sass', function () {
    var injectGlobalFiles = gulp.src('assets/src/scss/global/*.scss', { read: false });

    function transformFilepath (filepath) {
        return '@import "' + filepath + '";';
    }

    var injectGlobalOptions = {
        transform: transformFilepath,
        starttag: '// inject:global',
        endtag: '// endinject',
        addRootSlash: false
    };

    return gulp.src('assets/src/scss/main.scss')
        .pipe(wiredep().on('error', function(err) {
            console.log(err.stack);
            this.end();
        }))
        .pipe(inject(injectGlobalFiles, injectGlobalOptions))
        .pipe(sass())
        .pipe(csso())
        .pipe(gulp.dest('assets/dist/css/'))
});

gulp.task('copy-bs-fonts', function () {
    return gulp.src('./bower_components/bootstrap/fonts/*.{eot,svg,ttf,woff,woff2}')
        .pipe(gulp.dest('assets/dist/fonts/bootstrap/'));
});

gulp.task('js', function () {
    var sources = mainBowerFiles('**/*.js');
    sources.push('assets/src/js/*.js');

    return gulp.src(sources)
        .pipe(concat('main.js'))
        .pipe(gulp.dest('assets/dist/js/'))
});

gulp.task('sass:watch', function () {
    gulp.watch(['assets/src/scss/main.scss', 'assets/src/scss/global/*.scss'], ['sass']);
});

gulp.task('default', ['clean', 'sass', 'copy-bs-fonts', 'js']);