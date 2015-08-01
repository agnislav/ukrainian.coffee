/**
 * Created by Agnislav Onufrijchuk on 31.07.2015.
 */
'use strict';

var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    //rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    //cache = require('gulp-cache'),
    //livereload = require('gulp-livereload'),
    del = require('del'),
    jade = require('gulp-jade'),
    htmlreplace = require('gulp-html-replace'),
    angularTemplateCache = require('gulp-angular-templatecache'),
    addStream = require('add-stream');

gulp.task('default', ['clean'], function () {
  gulp.start('index.html', 'styles', 'vendor-styles', 'scripts', 'vendor-scripts', 'images', 'templates')
    .pipe(notify({ message: 'Build complete' }));
});

gulp.task('scripts', function () {
  return gulp.src(['public/app.js', 'public/components/**/*.js', '!public/components/**/*Spec.js'])
    //.pipe(addStream.obj(prepareTemplates()))
    .pipe(concat('app.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
});

gulp.task('vendor-scripts', function () {
  return gulp.src([
      'public/__vendor/angular.min.js',
      'public/__vendor/angular-route.min.js',
      'public/__vendor/angular-sanitize.min.js',
      'public/__vendor/ng-map.min.js'
    ])
    .pipe(concat('vendor.min.js'))
    .pipe(gulp.dest('dist'));
});

gulp.task('styles', function () {
  return sass('public/', { style: 'expanded' })
    .pipe(autoprefixer('last 2 version'))
    .pipe(concat('styles.min.css'))
    .pipe(minifycss())
    .pipe(gulp.dest('dist'));
});

gulp.task('vendor-styles', function () {
  return gulp.src('public/__vendor/normalize.css')
    .pipe(minifycss())
    .pipe(addStream.obj(gulp.src('public/__vendor/foundation.min.css')))
    .pipe(concat('vendor_styles.min.css'))
    .pipe(gulp.dest('dist'));
});

gulp.task('index.html', function () {
  //var YOUR_LOCALS = {};

  gulp.src('./views/index.jade')
    .pipe(jade({
      //locals: YOUR_LOCALS
      pretty: true
    }))
    .pipe(htmlreplace({
      styles: 'styles.min.css',
      vendorstyles: 'vendor_styles.min.css',
      scripts: 'app.min.js',
      vendorscripts: 'vendor.min.js'
    }))
    .pipe(gulp.dest('./dist/'))
});

gulp.task('images', function () {
  return gulp.src('public/images/**/*')
    .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
    .pipe(gulp.dest('dist/images'));
});

gulp.task('templates', function () {
  gulp.src('public/components/grid/grid.html')
    .pipe(gulp.dest('dist/components/grid'));

  gulp.src('public/components/grid//item/item.html')
    .pipe(gulp.dest('dist/components/grid/item'));

  gulp.src('public/components/map/map.html')
    .pipe(gulp.dest('dist/components/map'));
});

gulp.task('clean', function (cb) {
  del(['dist/assets', 'dist/*'], cb)
});

/**
 HELPERS
 */
function prepareTemplates () {
  return gulp.src('public/**/*.html')
    //.pipe(minify and preprocess the template html here)
    .pipe(angularTemplateCache());
}
