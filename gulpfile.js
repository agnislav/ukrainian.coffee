/**
 * Created by Agnislav Onufrijchuk on 31.07.2015.
 */
'use strict';

var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    del = require('del'),
    jade = require('gulp-jade'),
    htmlreplace = require('gulp-html-replace'),
    angularTemplateCache = require('gulp-angular-templatecache'),
    es = require('event-stream');
    //addStream = require('add-stream'),
    //imagemin = require('gulp-imagemin'),
    //rename = require('gulp-rename'),
    //cache = require('gulp-cache'),
    //livereload = require('gulp-livereload'),
    //lazypipe = require('lazypipe');

gulp.task('build', ['index.html', 'styles', 'scripts', 'vendor-scripts', 'images', 'templates'], function () {
  // todo: put a notification here.
});

gulp.task('scripts', ['clean'], function () {
  return gulp.src(['public/components/_global/app.js', 'public/components/**/*.js', '!public/components/**/*Spec.js'])
    // todo [#6]: implement
    //.pipe(addStream.obj(prepareTemplates()))
    .pipe(concat('app.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
});

gulp.task('vendor-scripts', ['clean'], function () {
  return gulp.src([
      'public/_vendor/angular/angular.min.js',
      'public/_vendor/angular-route/angular-route.min.js',
      'public/_vendor/angular-sanitize/angular-sanitize.min.js',
      'public/_vendor/ngmap/build/scripts/ng-map.min.js'
    ])
    .pipe(concat('vendor.min.js'))
    .pipe(gulp.dest('dist'));
});

gulp.task('styles', ['clean'], function () {
  return sass('public/components/', { style: 'expanded' })
    .pipe(autoprefixer('last 2 version'))
    .pipe(concat('styles.min.css'))
    .pipe(minifycss())
    .pipe(gulp.dest('dist'));
});

gulp.task('index.html', ['clean'], function () {
  //var YOUR_LOCALS = {};

  gulp.src('./views/index.jade')
    .pipe(jade({
      //locals: YOUR_LOCALS
      pretty: true
    }))
    .pipe(htmlreplace({
      styles: 'styles.min.css',
      scripts: 'app.min.js',
      vendorscripts: 'vendor.min.js'
    }))
    .pipe(gulp.dest('./dist/'))
});

gulp.task('images', ['clean'], function () {
  return gulp.src('public/images/**/*')
    //.pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
    .pipe(gulp.dest('dist/images'));
});

gulp.task('templates', ['clean'], function () {
  var grid = gulp.src('public/components/grid/grid.html')
    .pipe(gulp.dest('dist/components/grid'));

  var item = gulp.src('public/components/grid/item/item.html')
    .pipe(gulp.dest('dist/components/grid/item'));

  var map = gulp.src('public/components/map/map.html')
    .pipe(gulp.dest('dist/components/map'));

  return es.merge(grid, item, map);
});

gulp.task('clean', function (cb) {
  del(['dist/*'], cb)
});

/**
 HELPERS
 */
function prepareTemplates () {
  return gulp.src('public/**/*.html')
    //.pipe(minify and preprocess the template html here)
    .pipe(angularTemplateCache());
}
