const gulp      = require('gulp'),
	  browserSync = require('browser-sync').create(),
	  prefix      = require('gulp-autoprefixer'),
	  babel       = require('gulp-babel'),
	  minify      = require('gulp-minify'),
	  plumber     = require('gulp-plumber'),
	  rename      = require('gulp-rename'),
	  sass        = require('gulp-sass'),
	  pug         = require('gulp-pug'),
	  wait        = require('gulp-wait'),
	  reload      = browserSync.reload


/*
 * PATH
 *******************************************************************************/
let PATH = {
	src  : {
		root    : './src/',
		views   : './src/pug/',
		styles  : './src/sass/',
		scripts : './src/scripts/',
	},
	dest : {
		root    : './www/',
		views   : './www/',
		styles  : './www/dist/styles',
		scripts : './www/dist/scripts',
	}
}


/*
 * SASS - SCSS
 *******************************************************************************/
gulp.task('sass', () => {
	return gulp.src(PATH.src.styles + '*.+(scss|sass)')
		.pipe(plumber([{ errorHandler: false }]))
		.pipe(wait(100))
		.pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
		.pipe(prefix())
		.pipe(rename({ suffix: '.min' }))
		.pipe(gulp.dest(PATH.dest.styles))
		.pipe(browserSync.stream())
})


/*
 * PUG
 *******************************************************************************/
gulp.task('pug', () => {
	return gulp.src(PATH.src.views + '*.pug')
		.pipe(pug({ outputStyle: 'expanded' }))
		.pipe(gulp.dest(PATH.dest.views))
		.on('end', reload)
})


/*
 * SCRIPT
 *******************************************************************************/ 
gulp.task('scripts', () => {
	return gulp.src(PATH.src.scripts + '**/*.js')
		.pipe(babel({ presets: ['env'] }))
		.pipe(minify({
			ext: {
				min: '.min.js'
			},
			noSource: true
		}))
		.pipe(gulp.dest(PATH.dest.scripts))
		.on('end', reload)
})


/*
 * WATCHING
 *******************************************************************************/  
gulp.task('browser-sync', function () {
	browserSync.init({
		browser: 'opera',
		notify: false,
		server: {
			baseDir: PATH.dest.root
		}
	})
	gulp.watch(PATH.src.styles + '**/*.+(scss|sass)', ['sass'])
	gulp.watch(PATH.dest.root  + '*.html', reload)
	// gulp.watch(PATH.src.views  + '**/*.pug' , ['pug'])
	// gulp.watch('**/*.js' , reload)
})


/*
 * DEFAULT TASK
 *******************************************************************************/   
gulp.task('default', ['browser-sync', /* 'pug',  */'sass'/* , 'scripts' */])