"use strict";

var gulp     = require('gulp'),
sass         = require('gulp-ruby-sass'),
autoprefixer = require('gulp-autoprefixer'),
minifycss    = require('gulp-clean-css'),
concat       = require('gulp-concat'),
uglify       = require('gulp-uglify'),
imgop        = require('gulp-image-optimization'),
webpack      = require('webpack'),
config       = require('./webpack.config.dev'),
configPro    = require('./webpack.config'),
path         = require('path');

var src = {
  scss : './src/scss/**/*',
	img  : './src/img/**/*'
};

/**
 * COPY
 */

gulp.task('fonts', function () {
	gulp.src('./node_modules/bootstrap-sass/assets/fonts/bootstrap/*')
		.pipe(gulp.dest('./build/fonts/bootstrap'));
});

gulp.task('vendors', function () {
	gulp.src('./node_modules/jquery/dist/jquery.js')
		.pipe(uglify())
		.pipe(gulp.dest('./build/js/vendors'));
});

gulp.task('img', function () {
	gulp.src(src.img)
		.pipe(imgop({
			optimizationLevel: 5,
			progressive: true,
			interlaced: true
		}))
		.pipe(gulp.dest('./build/img'));
});

/**
 * SCSS
 */

gulp.task('scss', function() {
  return sass(src.scss, {
    style: 'expanded',
    sourcemap: true
  })
  .pipe(autoprefixer())
  .pipe(concat('main.css'))
  .pipe(minifycss({
		keepSpecialComments: 0
	}))
  .pipe(gulp.dest('./build/css'));
});

/**
 * JS
 */

gulp.task('js-build', function (done) {
	webpack(config).run(function (err, stats) {
		if (err) console.log(err);
		console.log(stats.toString());
		done();
	});
});

gulp.task('js-build-pro', function (done) {
	webpack(configPro).run(function (err, stats) {
		if (err) console.log(err);
		console.log(stats.toString());
		done();
	});
});

gulp.task('js-watch', function () {
	webpack(config).watch(100, function (err, stats) {
		if (err) console.log(err);
		console.log(stats.toString());
	});
});

gulp.task('styles-watch', function() {
    gulp.watch('src/scss/**/*', ['scss']);
});

gulp.task('build', ['fonts', 'vendors', 'img', 'scss', 'js-build']);
gulp.task('build-pro', ['fonts', 'vendors', 'img', 'scss', 'js-build-pro']);
gulp.task('watch', ['styles-watch', 'js-watch']);
gulp.task('default', ['build']);
