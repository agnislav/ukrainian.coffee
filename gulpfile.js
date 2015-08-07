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
    sourcemaps = require('gulp-sourcemaps'),
    changed = require('gulp-changed'),
    es = require('event-stream');
//angularTemplateCache = require('gulp-angular-templatecache'),
    //addStream = require('add-stream'),
    //imagemin = require('gulp-imagemin'),
    //rename = require('gulp-rename'),
    //cache = require('gulp-cache'),
    //livereload = require('gulp-livereload'),
    //lazypipe = require('lazypipe'),

var paths = {
  src: {
    views: 'views/*',
    index: 'views/index.jade',
    components: 'public/components',
    styles: 'public/components/**/*.scss',
    js: ['public/components/**/*.js', '!public/components/**/*Spec.js'],
    templates: 'public/components/**/*.html',
    images: 'public/images/**/*'
  },
  app: {
    root: 'app/',
    components: 'app/components',
    images: 'app/images',
    vendor: 'app/_vendor'
  },
  dist: {}
};

var isWatching = false;

/**
 * TASK: WATCH
 */
gulp.task('watch', ['build'], function () {
  isWatching = true;

  gulp.watch(paths.src.views, ['build-index']);
  gulp.watch(paths.src.js, ['build-scripts']);
  gulp.watch(paths.src.styles, ['build-styles']);
  gulp.watch(paths.src.templates, ['build-templates']);
  gulp.watch(paths.src.images, ['build-images']);

});

/**
 * TASK: BUILD
 */
gulp.task('build', ['build-index', 'build-styles', 'build-scripts', 'build-vendor-scripts', 'build-images', 'build-templates'], function () {
  // todo: put a notification here.
});

gulp.task('build-index', ['clean-app'], function () {
  gulp.src(paths.src.index)
    .pipe(jade({ pretty: true}))
    .pipe(gulp.dest(paths.app.root))
});

gulp.task('build-styles', ['clean-app'], function () {
  //noinspection JSUnresolvedFunction
  return sass(paths.src.components, { style: 'expanded' , sourcemap: true})
    .pipe(autoprefixer('last 2 version'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.app.components));
});

gulp.task('build-scripts', ['clean-app'], function () {
  return gulp.src(paths.src.js)
    .pipe(gulp.dest(paths.app.components));
});

gulp.task('build-vendor-scripts', ['clean-app'], function () {
  return gulp.src([
    'public/_vendor/angular/angular.js',
    'public/_vendor/angular-route/angular-route.js',
    'public/_vendor/angular-sanitize/angular-sanitize.js',
    'public/_vendor/ngmap/build/scripts/ng-map.js'
  ])
    //.pipe(concat('vendor.min.js'))
    .pipe(gulp.dest(paths.app.vendor));
});

gulp.task('build-images', ['clean-app'], function () {
  return gulp.src(paths.src.images)
    .pipe(gulp.dest(paths.app.images));
});

gulp.task('build-templates', ['clean-app'], function () {
  return gulp.src(paths.src.templates)
    .pipe(gulp.dest(paths.app.components));
});

gulp.task('clean-app', function (cb) {
  if (!isWatching) {
    del(['app/*'], cb)
  }
  else cb();
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
  //noinspection JSUnresolvedFunction
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
/*function prepareTemplates () {
  return gulp.src('public/!**!/!*.html')
    //.pipe(minify and preprocess the template html here)
    .pipe(angularTemplateCache());
}*/
