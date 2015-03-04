var gulp = require('gulp'),
	babel = require('gulp-babel'),
	jshint = require('gulp-jshint'),
	gulpIf = require('gulp-if');

// jshint task
gulp.task('jshint', function() {
	return gulp.src(['src/**/*.js'])
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
});

// transpile es6
gulp.task('es6', ['jshint'], function() {
	function filter(path) {
		return !/index\.js/.test(path.path);
	}
	
	return gulp.src(['src/**/*.js'], {base: 'src'})
		.pipe(gulpIf(filter, babel({
			modules: 'amd'
		})))
		.on('error', function(err) { throw err; })
		.pipe(gulp.dest('build'));
});

// build
gulp.task('build', ['es6'], function() {
});

// default task
gulp.task('default', ['build'])