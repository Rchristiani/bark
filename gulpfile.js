'use strict';

const gulp = require('gulp');
const plumber = require('gulp-plumber');
const util = require('gulp-util');
const notify = require('gulp-notify');
const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const mocha = require('gulp-mocha');

gulp.task('js', () => {
	return browserify('./src/bark.js')
		.transform('babelify', {
			presets: ['es2015']
		})
		.bundle()
		.pipe(source('bark.min.js'))
		.pipe(buffer())
		.pipe(gulp.dest('./dist/'));
});

gulp.task('test', () => {
	gulp.src('./tests/**/*.js')
		.pipe(plumber({
			errorHandler: util.env.type === 'ci' ? util.noop() : notify.onError("Error: <%= error %>")   
		}))
		.pipe(mocha({reporter: 'spec'}));
});

gulp.task('default', ['js','test'], () => {
	gulp.watch('./src/**/*.js',['js','test']);
	gulp.watch('./tests/**/*.js',['test']);
});
