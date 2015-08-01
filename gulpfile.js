/**
 * Created by Agnislav Onufrijchuk on 31.07.2015.
 */
'use strict';

/** INITIALIZE VARS **/
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
    sourcemaps = require('gulp-sourcemaps'),
    es = require('event-stream');
    //addStream = require('add-stream'),
    //imagemin = require('gulp-imagemin'),
    //rename = require('gulp-rename'),
    //cache = require('gulp-cache'),
    //livereload = require('gulp-livereload'),
    //lazypipe = require('lazypipe');

gulp.task('watch', function () {

});

/**
 * TASK: BUILD
 */
gulp.task('build', ['build-index.html', 'build-styles', 'build-scripts', 'build-vendor-scripts', 'build-images', 'build-templates'], function () {
  // todo: put a notification here.
});

gulp.task('build-index.html', ['clean-app'], function () {
  gulp.src('./views/index.jade')
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest('./app/'))
});

gulp.task('build-styles', ['clean-app'], function () {
  return sass('public/components/', { style: 'expanded' , sourcemap: true})
    .pipe(autoprefixer('last 2 version'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('app/components'));
});

gulp.task('build-scripts', ['clean-app'], function () {
  return gulp.src(['public/components/**/*.js', '!public/components/**/*Spec.js'])
    // todo [#6]: implement
    //.pipe(addStream.obj(prepareTemplates()))
    //.pipe(concat('app.min.js'))
    //.pipe(uglify())
    .pipe(gulp.dest('app/components'));
});

gulp.task('build-vendor-scripts', ['clean-app'], function () {
  return gulp.src([
    'public/_vendor/angular/angular.js',
    'public/_vendor/angular-route/angular-route.js',
    'public/_vendor/angular-sanitize/angular-sanitize.js',
    'public/_vendor/ngmap/build/scripts/ng-map.js'
  ])
    //.pipe(concat('vendor.min.js'))
    .pipe(gulp.dest('app/_vendor'));
});

// todo: remove this?
gulp.task('build-images', ['clean-app'], function () {
  return gulp.src('public/images/**/*')
    .pipe(gulp.dest('app/images'));
});

gulp.task('build-templates', ['clean-app'], function () {
  return gulp.src('public/components/**/*.html')
    .pipe(gulp.dest('app/components'));
});

gulp.task('clean-app', function (cb) {
  del(['app/*'], cb)
});


/**
 * TASK: DIST
 */

gulp.task('dist', ['dist-index.html', 'dist-styles', 'dist-scripts', 'dist-vendor-scripts', 'dist-images', 'dist-templates'], function () {
  // todo: put a notification here.
});

gulp.task('dist-index.html', ['clean-dist'], function () {
  gulp.src('./views/index.jade')
    .pipe(jade({
      pretty: true
    }))
    .pipe(htmlreplace({
      styles: 'styles.min.css',
      scripts: 'app.min.js',
      vendorscripts: 'vendor.min.js'
    }))
    .pipe(gulp.dest('./dist/'))
});

gulp.task('dist-styles', ['clean-dist'], function () {
  return sass('public/components/', { style: 'expanded' })
    .pipe(autoprefixer('last 2 version'))
    .pipe(concat('styles.min.css'))
    .pipe(minifycss())
    .pipe(gulp.dest('dist'));
});

gulp.task('dist-scripts', ['clean-dist'], function () {
  return gulp.src(['public/components/**/*.js', '!public/components/**/*Spec.js'])
    // todo [#6]: implement
    //.pipe(addStream.obj(prepareTemplates()))
    .pipe(concat('app.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
});

gulp.task('dist-vendor-scripts', ['clean-dist'], function () {
  return gulp.src([
      'public/_vendor/angular/angular.min.js',
      'public/_vendor/angular-route/angular-route.min.js',
      'public/_vendor/angular-sanitize/angular-sanitize.min.js',
      'public/_vendor/ngmap/build/scripts/ng-map.min.js'
    ])
    .pipe(concat('vendor.min.js'))
    .pipe(gulp.dest('dist'));
});

gulp.task('dist-images', ['clean-dist'], function () {
  return gulp.src('public/images/**/*')
    //.pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
    .pipe(gulp.dest('dist/images'));
});

// todo [#6]: migrate
gulp.task('dist-templates', ['clean-dist'], function () {
  return gulp.src('public/components/**/*.html')
    .pipe(gulp.dest('dist/components'));
});

gulp.task('clean-dist', function (cb) {
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
