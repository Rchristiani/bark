'use strict';

const gulp = require('gulp');
const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const uglify = require('gulp-uglify');

gulp.task('js', () => {
	return browserify('src/bark.js')
		.transform('babelify', {
			presets: ['es2015']
		})
		.bundle()
		.pipe(source('bark.min.js'))
		.pipe(buffer())
		.pipe(uglify())
		.pipe(gulp.dest('./dist/'));
});

gulp.task('default', ['js'], () => {
	gulp.watch('./src/**/*.js',['js']);
});