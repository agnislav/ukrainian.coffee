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
    //es = require('event-stream');
    angularTemplateCache = require('gulp-angular-templatecache');
    //rename = require('gulp-rename'),
    //livereload = require('gulp-livereload'),

var paths = {
  src: {
    views: 'views/*',
    index: 'views/index.jade',
    components: 'public/components',
    styles: 'public/components/**/*.scss',
    appjs: 'public/components/app/app.js',
    js: ['public/components/**/*.js', '!public/components/**/*Spec.js', '!public/components/app/app.js'],
    vendorjs: [
      'public/_vendor/angular/angular.js',
      'public/_vendor/angular-route/angular-route.js',
      'public/_vendor/angular-sanitize/angular-sanitize.js',
      'public/_vendor/ngmap/build/scripts/ng-map.js'
    ],
    vendorminjs: [
      'public/_vendor/angular/angular.min.js',
      'public/_vendor/angular-route/angular-route.min.js',
      'public/_vendor/angular-sanitize/angular-sanitize.min.js',
      'public/_vendor/ngmap/build/scripts/ng-map.min.js'
    ],
    templates: 'public/**/*.tpl.html',
    partials: ['public/**/*.html', '!public/**/*.tpl.html'],
    images: 'public/images/**/*'
  },
  app: {
    root: 'app/',
    appjs: 'app/app.js',
    components: 'app/components',
    images: 'app/images',
    vendor: 'app/_vendor'
  },
  dist: {
    root: 'dist/',
    components: 'dist/components',
    images: 'dist/images'
  }
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
gulp.task('build', ['build-index', 'build-styles', 'build-appjs', 'build-scripts', 'build-vendor-scripts', 'build-images', 'build-templates', 'build-partials'], function () {
  // todo: put a notification here.
});

gulp.task('build-index', ['clean-app'], function () {
  gulp.src(paths.src.index)
    .pipe(jade({ pretty: true}))
    .pipe(gulp.dest(paths.app.root))
});

gulp.task('build-styles', ['clean-app'], function () {
  return sass(paths.src.components, { style: 'expanded' , sourcemap: true})
    .on('error', function (err) {
      console.error('Error!', err.message);
    })
    .pipe(autoprefixer('last 2 version'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.app.components));
});

gulp.task('build-appjs', ['clean-app'], function () {
  return gulp.src(paths.src.appjs)
    .pipe(addStream.obj(generateConfig('development')))
    .pipe(concat(paths.app.appjs))
    .pipe(gulp.dest(paths.app.components));
});

gulp.task('build-scripts', ['clean-app'], function () {
  return gulp.src(paths.src.js)
    .pipe(gulp.dest(paths.app.components));
});

gulp.task('build-vendor-scripts', ['clean-app'], function () {
  return gulp.src(paths.src.vendorjs)
    .pipe(gulp.dest(paths.app.vendor));
});

gulp.task('build-images', ['clean-app'], function () {
  return gulp.src(paths.src.images)
    .pipe(gulp.dest(paths.app.images));
});

gulp.task('build-templates', ['clean-app'], function () {
  return gulp.src(paths.src.templates)
    .pipe(gulp.dest(paths.app.root));
});

gulp.task('build-partials', ['clean-app'], function () {
  return gulp.src(paths.src.partials)
    .pipe(gulp.dest(paths.app.root));
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

gulp.task('dist', ['dist-index.html', 'dist-styles', 'dist-scripts', 'dist-vendor-scripts', 'dist-images', 'dist-partials'], function () {
  // todo: put a notification here.
});

gulp.task('dist-index.html', ['clean-dist'], function () {
  gulp.src(paths.src.index)
    .pipe(jade({
      pretty: true
    }))
    .pipe(htmlreplace({
      styles: 'styles.min.css',
      scripts: 'app.min.js',
      vendorscripts: 'vendor.min.js'
    }))
    .pipe(gulp.dest(paths.dist.root))
});

gulp.task('dist-styles', ['clean-dist'], function () {
  //noinspection JSUnresolvedFunction
  return sass(paths.src.components, { style: 'expanded' })
    .pipe(autoprefixer('last 2 version'))
    .pipe(concat('styles.min.css'))
    .pipe(minifycss())
    .pipe(gulp.dest(paths.dist.root));
});

gulp.task('dist-scripts', ['clean-dist'], function () {
  return gulp.src(paths.src.appjs)
    .pipe(addStream.obj(generateConfig('production')))
    .pipe(addStream.obj(prepareTemplates()))
    .pipe(addStream.obj(gulp.src(paths.src.js)))
    .pipe(concat('app.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(paths.dist.root));
});

gulp.task('dist-vendor-scripts', ['clean-dist'], function () {
  return gulp.src(paths.src.vendorminjs)
    .pipe(concat('vendor.min.js'))
    .pipe(gulp.dest(paths.dist.root));
});

gulp.task('dist-images', ['clean-dist'], function () {
  return gulp.src(paths.src.images)
    .pipe(gulp.dest(paths.dist.images));
});

// todo [#6]: migrate
gulp.task('dist-partials', ['clean-dist'], function () {
  return gulp.src(paths.src.partials)
    .pipe(gulp.dest(paths.dist.components));
});

gulp.task('clean-dist', function (cb) {
  del(['dist/*'], cb)
});

/**
 HELPERS
 */
function prepareTemplates () {
  return gulp.src(paths.src.templates)
    .pipe(angularTemplateCache());
}

/**
 *
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
