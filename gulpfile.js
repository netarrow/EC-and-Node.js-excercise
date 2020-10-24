var gulp = require('gulp');
var del = require('del')
var rename = require("gulp-rename");
var webpack = require('webpack-stream');
var config = require('./webpack.config')

function clean() {
    return del('dist/**/*', {force:true});
}

function modernPack() {
    return gulp.src('src/js/index.js')
        .pipe(webpack(config.modern))
        .pipe(rename('bundle.js'))
        .pipe(gulp.dest('dist/'));
}

function legacyPack() {
    return gulp.src('src/js/index.js')
        .pipe(webpack(config.legacy))
        .pipe(rename('bundle.legacy.js'))
        .pipe(gulp.dest('dist/'));
}

gulp.task('build', function (done) {
    clean()
    modernPack()
    legacyPack()
    return gulp.src('src/index.html').pipe(gulp.dest('dist/'))
});