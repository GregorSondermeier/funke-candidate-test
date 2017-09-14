var gulp = require('gulp'),
	ejs = require('gulp-ejs'),
	// ts = require('gulp-typescript'),
	concat = require('gulp-concat'),
	// rename = require('gulp-rename'),
	// uglify = require('gulp-uglify'),
	// gulpCopy = require('gulp-copy'),
	sass = require('gulp-sass');

//////////////////////////////////////////////////////
// html
//////////////////////////////////////////////////////
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

//////////////////////////////////////////////////////
// javascript
//////////////////////////////////////////////////////
gulp.task('js', function() {
	return gulp
		.src('src/js/**/*.js')
		.pipe(concat('script.js'))
		.pipe(gulp.dest('target/js'));
});

gulp.task('js:watch', function() {
	gulp.watch('src/js/**/*.js', ['js']);
});

//////////////////////////////////////////////////////
// typescript
//////////////////////////////////////////////////////
// var tsProject = ts.createProject('tsconfig.json');
// gulp.task('ts', function () {
// 	return gulp.src('src/**/*.ts')
// 		.pipe(gulp.dest('target/js'))
// 		.pipe(tsProject('tsconfig.json', {
// 			noImplicitAny: true,
// 			outFile: 'script.js'
// 		}));
// });
// gulp.task('ts:watch', function() {
// 	gulp.watch('src/**/*.ts', ['ts']);
// });

//////////////////////////////////////////////////////
// json
//////////////////////////////////////////////////////
gulp.task('json', function () {
	gulp
		.src('src/json/**/*.json')
		.pipe(gulp.dest('target/json'));
});

gulp.task('json:watch', function() {
	gulp.watch('src/json/**/*.json', ['json']);
});

//////////////////////////////////////////////////////
// css
//////////////////////////////////////////////////////
gulp.task('scss', function() {
	return gulp.src('src/scss/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('target/css'))
});

gulp.task('scss:watch', function() {
	gulp.watch('src/scss/**/*.scss', ['scss']);
});

gulp.task('default', ['html', 'js', 'json', 'scss']);

gulp.task('watch', ['html:watch', 'js:watch', 'json:watch', 'scss:watch']);