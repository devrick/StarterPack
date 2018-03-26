const gulp = require('gulp');
const imageMin = require('gulp-imagemin');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();

// Ready HTML for build
gulp.task('copyHtml', function() {
  gulp.src('src/*.html')
    .pipe(gulp.dest('build'))
    .pipe(browserSync.stream());
});

// Optimize image file size
gulp.task('imageMin', function() {
  gulp.src('src/img/*')
    .pipe(imageMin())
    .pipe(gulp.dest('build/img'))
    .pipe(browserSync.stream());
});

// Sass
gulp.task('sass', function() {
  gulp.src(['src/scss/*.scss', 'node_modules/bootstrap/scss/bootstrap.scss'])
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('build/css'))
    .pipe(browserSync.stream());
});

// Move js
gulp.task('js', function() {
  gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js', 'node_modules/jquery/dist/jquery.min.js'])
    .pipe(gulp.dest('build/js'))
    .pipe(browserSync.stream());
});

// Static server && watching files
gulp.task('serve', ['sass'], function() {
  browserSync.init({
    server: "./build"
  });

  gulp.watch('src/scss/*.scss', ['sass']);
  gulp.watch('src/*.html', ['copyHtml']).on('change', browserSync.reload);
});

// Default
gulp.task('default', ['copyHtml', 'imageMin', 'js', 'serve']);