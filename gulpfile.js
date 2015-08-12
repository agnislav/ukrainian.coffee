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
    gulpNgConfig = require('gulp-ng-config'),
    addStream = require('add-stream'),
    angularTemplateCache = require('gulp-angular-templatecache');
    //rename = require('gulp-rename'),
    //livereload = require('gulp-livereload'),

var paths = {
  src: {
    root: 'app',
    index: 'app/index.html',
    //components: 'app/components',
    //styles: 'app/**/*.scss',
    appjs: 'app/app.js',
    js: ['app/**/*.js', '!app/**/*Spec.js', '!app/app.js'],
    vendorjs: [
      'bower_components/angular/angular.js',
      'bower_components/angular-route/angular-route.js',
      'bower_components/angular-sanitize/angular-sanitize.js',
      'bower_components/ngmap/build/scripts/ng-map.js'
    ],
    vendorminjs: [
      'bower_components/angular/angular.min.js',
      'bower_components/angular-route/angular-route.min.js',
      'bower_components/angular-sanitize/angular-sanitize.min.js',
      'bower_components/ngmap/build/scripts/ng-map.min.js'
    ],
    templates: 'app/**/*.tpl.html',
    partials: ['app/**/*.html', '!app/**/*.tpl.html', '!app/index.html'],
    images: 'app/images/**/*'
  },
  app: {
    root: 'build/app/',
    appjs: 'app.js',
    //components: 'build/app/components',
    images: 'build/app/images',
    vendor: 'build/app/_vendor'
  },
  dist: {
    root: 'build/dist/',
    //components: 'build/dist/components',
    images: 'build/dist/images'
  }
};

var isWatching = false;

/**
 * TASK: WATCH
 */
gulp.task('watch', ['build'], function () {
  isWatching = true;

  gulp.watch(paths.src.index, ['build-index']);
  gulp.watch(paths.src.js, ['build-scripts']);
  gulp.watch(paths.src.styles, ['build-styles']);
  gulp.watch(paths.src.partials, ['build-partials']);
  gulp.watch(paths.src.templates, ['build-templates']);
  gulp.watch(paths.src.images, ['build-images']);

});

/**
 * TASK: BUILD
 */
gulp.task('build', ['build-index', 'build-styles', 'build-appjs', 'build-scripts', 'build-vendor-scripts', 'build-images', 'build-templates', 'build-partials'], function () {
  // todo: put a notification here.
});

/**
 * TASK: DIST
 */

gulp.task('dist', ['dist-index.html', 'dist-styles', 'dist-scripts', 'dist-vendor-scripts', 'dist-images', 'dist-partials'], function () {
  // todo: put a notification here.
});

/**
 * TASK: GENERATE INDEX.HTML
 */
gulp.task('build-index', ['pre-build-clean'], function () {
  gulp.src(paths.src.index)
    .pipe(gulp.dest(paths.app.root))
});

gulp.task('dist-index.html', ['pre-dist-clean'], function () {
  gulp.src(paths.src.index)
    .pipe(htmlreplace({
      styles: 'styles.min.css',
      scripts: 'app.min.js',
      vendorscripts: 'vendor.min.js'
    }))
    .pipe(gulp.dest(paths.dist.root))
});

/**
 * TASK: GENERATE CSS
 */
gulp.task('build-styles', ['pre-build-clean'], function () {
  return sass(paths.src.root, { style: 'expanded' , sourcemap: true})
    .on('error', function (err) {
      console.error('Error!', err.message);
    })
    .pipe(autoprefixer('last 2 version'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.app.root));
});

gulp.task('dist-styles', ['pre-dist-clean'], function () {
  //noinspection JSUnresolvedFunction
  return sass(paths.src.root, { style: 'expanded' })
    .pipe(autoprefixer('last 2 version'))
    .pipe(concat('styles.min.css'))
    .pipe(minifycss())
    .pipe(gulp.dest(paths.dist.root));
});

/**
 * TASK: INCLUDE CONFIG TO APP.JS
 */
gulp.task('build-appjs', ['pre-build-clean'], function () {
  return gulp.src(paths.src.appjs)
    .pipe(addStream.obj(generateConfig('development')))
    .pipe(concat(paths.app.appjs))
    .pipe(gulp.dest(paths.app.root));
});


/**
 * Generate environment-depending config
 * @param {'production'|'development'} env
 * @returns ReadableStream
 */
function generateConfig (env) {
  return gulp.src('./configuration/client.json')
    .pipe(gulpNgConfig('uc', {
      environment: env,
      createModule: false
    }));
}

/**
 * TASK: PREPARE USER SCRIPTS
 */
gulp.task('build-scripts', ['pre-build-clean'], function () {
  return gulp.src(paths.src.js)
    .pipe(gulp.dest(paths.app.root));
});

gulp.task('dist-scripts', ['pre-dist-clean'], function () {
  return gulp.src(paths.src.appjs)
    .pipe(addStream.obj(generateConfig('production')))
    .pipe(addStream.obj(prepareTemplates()))
    .pipe(addStream.obj(gulp.src(paths.src.js)))
    .pipe(concat('app.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(paths.dist.root));
});

/**
 * TASK: PREPARE VENDOR SCRIPTS
 */
gulp.task('build-vendor-scripts', ['pre-build-clean'], function () {
  return gulp.src(paths.src.vendorjs)
    .pipe(gulp.dest(paths.app.vendor));
});

gulp.task('dist-vendor-scripts', ['pre-dist-clean'], function () {
  return gulp.src(paths.src.vendorminjs)
    .pipe(concat('vendor.min.js'))
    .pipe(gulp.dest(paths.dist.root));
});

/**
 * TASK: COPY IMAGES
 */
gulp.task('build-images', ['pre-build-clean'], function () {
  return gulp.src(paths.src.images)
    .pipe(gulp.dest(paths.app.images));
});

gulp.task('dist-images', ['pre-dist-clean'], function () {
  return gulp.src(paths.src.images)
    .pipe(gulp.dest(paths.dist.images));
});

/**
 * TASK: PREPARE TEMPLATES
 */
gulp.task('build-templates', ['pre-build-clean'], function () {
  return gulp.src(paths.src.templates)
    .pipe(gulp.dest(paths.app.root));
});

// e.g. dist-templates
function prepareTemplates () {
  return gulp.src(paths.src.templates)
    .pipe(angularTemplateCache());
}

/**
 * TASK: PREPARE PARTIALS
 */
gulp.task('build-partials', ['pre-build-clean'], function () {
  return gulp.src(paths.src.partials)
    .pipe(gulp.dest(paths.app.root));
});

gulp.task('dist-partials', ['pre-dist-clean'], function () {
  return gulp.src(paths.src.partials)
    .pipe(gulp.dest(paths.dist.root));
});

/**
 * TASK: CLEAN
 */
gulp.task('pre-build-clean', function (cb) {
  if (!isWatching) {
    del(['build/app/*'], cb)
  }
  else cb();
});

gulp.task('pre-dist-clean', function (cb) {
  del(['build/dist/*'], cb)
});

