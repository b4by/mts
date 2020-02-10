const gulp = require('gulp');
const { series, parallel } = require('gulp');
const del = require('delete');
const sass = require('gulp-sass');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();


let styleFiles = [
	'./node_modules/normalize.css/normalize.css',
	'./src/css/libs/**/*.css',
	'./src/scss/style.scss'
]

// compile scss, concat css files, autoprefix, minimize

function style() {
	return gulp.src(styleFiles)
	.pipe(sass().on('error', sass.logError))
	.pipe(concat('all.css'))
	.pipe(autoprefixer({
		cascade: false
	}))
	.pipe(cleanCSS({
		level: 2
	}))
	.pipe(gulp.dest('./build/css'))
	.pipe(browserSync.stream());
}

// transpile and minimize js

function script() {
	return gulp.src('./src/js/**/*.js')
		.pipe(concat('bundle.js'))
		.pipe(babel({
			presets: ['@babel/env']
		}))
		.pipe(uglify())
		.pipe(gulp.dest('./build/js'))
		.pipe(browserSync.stream());
}

function clean() {
	return del(['./build']);
}

function watch() {
	browserSync.init({
		server: {
			baseDir: './'
		}
	});

	gulp.watch('./src/scss/**/*.scss', style);
	gulp.watch('./src/js/**/*.js', script)
	gulp.watch('./*.html').on('change', browserSync.reload);
	gulp.watch('./src/js/**/*.js').on('change', browserSync.reload);
}

exports.clean = clean;
exports.style = style;
exports.script = script;
exports.watch = watch;
exports.build = parallel(style, script)