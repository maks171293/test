const gulp = require('gulp');
const imagemin = require('gulp-imagemin'); //image optimizer
const uglify = require('gulp-uglify'); //js minify
const sass = require('gulp-sass');
const concat = require('gulp-concat');//concat all js files into one
const babel = require('gulp-babel'); // es6 to es5

/*
			--FUNCTIONS--
	gulp.task - define tasks
	gulp.src - point to files to use
	gulp.dest - point to folder to output
	gulp.watch - watch files and folders for changes
*/


//logs message
gulp.task('message', function(){
	console.log('Gulp is running...')
});

//copy all Html
gulp.task('copyHtml', function(){
	gulp.src('src/*.html')
		.pipe(gulp.dest('dist'))
});

//Optimize images
gulp.task('imageMin', function(){
	gulp.src('src/images/*')
		.pipe(imagemin())
		.pipe(gulp.dest('dist/images'))
});

//Minify JS
gulp.task('minify', function(){
	gulp.src('src/js/*.js')
			.pipe(uglify())
			.pipe(gulp.dest('dist/js'))
});

//Compile Sass files
gulp.task('sass', function(){
	gulp.src('src/sass/*.sass')
			.pipe(sass().on('error', sass.logError))
			.pipe(gulp.dest('dist/css'));
});

//Scripts
gulp.task('scripts', function(){
	gulp.src(['src/js/*.js', '!src/js/libs/*.js'])
			.pipe(concat('main.js'))
			.pipe(babel({
				presets: ['es2015']
			}))
			.pipe(uglify())
			.pipe(gulp.dest('dist/js'));
});

gulp.task('libs', function(){
	gulp.src('src/js/libs/*.js')
			.pipe(concat('libs.js'))
			.pipe(uglify())
			.pipe(gulp.dest('dist/js/libs'));
});

gulp.task('default', ['message', 'copyHtml', 'imageMin', 'sass', 'scripts', 'libs']);

gulp.task('watch', function(){
	gulp.watch('src/js/*.js', ['scripts']);
	gulp.watch('src/images/*', ['imageMin']);
	gulp.watch('src/sass/*.sass', ['sass']);
	gulp.watch('src/*.html', ['copyHtml']);
});
