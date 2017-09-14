var gulp = require('gulp');
var ejs = require('gulp-ejs');
var gutil = require('gulp-util');

gulp.task('html', function() {
	gulp.src("src/*.ejs")
		.pipe(ejs({
			msg: "Hello Gulp!"
		}, undefined, {ext: ''}))
		.pipe(gulp.dest("target"));
});

gulp.task('html:watch', function() {
	gulp.watch('src/*.ejs', ['html']);
});

gulp.task('default', ['html']);

gulp.task('watch', ['html:watch']);