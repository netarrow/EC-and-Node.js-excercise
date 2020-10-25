var gulp = require('gulp');
var del = require('del')
var rename = require("gulp-rename");
var webpack = require('webpack-stream');
var hash = require('gulp-hash')
var inject = require('gulp-inject-string');
var tap = require('gulp-tap')
var config = require('./webpack.config')
var path = require('path')

var modernFile
var legacyFile

function clean(next) {
    return del('dist/**/*', {force:true})
}

function modernPack(next) {
    gulp.src('src/js/index.js')
        .pipe(webpack(config.modern))
        .pipe(rename('bundle.js'))
        .pipe(hash())
        .pipe(tap(file => modernFile = path.basename(file.path)))
        .pipe(gulp.dest('dist/'))
        .on('end', next)
}

function legacyPack(next) {
    gulp.src('src/js/index.js')
        .pipe(webpack(config.legacy))
        .pipe(rename('bundle.legacy.js'))
        .pipe(hash())
        .pipe(tap(file => legacyFile = path.basename(file.path)))
        .pipe(gulp.dest('dist/'))
        .on('end', next)
}

function copyHtmlWithFixedSrc(next) {
    gulp.src('src/index.html')
        .pipe(inject.replace('modernFile', modernFile))
        .pipe(inject.replace('legacyFile', legacyFile))
        .pipe(gulp.dest('dist/'))
        .on('end', next)
}

gulp.task('build', function (done) {
    clean()
    modernPack(() => legacyPack(() => copyHtmlWithFixedSrc(() => done())))
});