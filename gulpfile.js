var gulp = require('gulp'),
    minifyCSS = require('gulp-minify-css'),
    sourcemaps = require('gulp-sourcemaps'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    rename = require('gulp-rename'),
    livereload = require('gulp-livereload');



gulp.task('style', function() {
    return gulp.src('scss/style.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 4 versions'],
            cascade: false
        }))
        .pipe(minifyCSS())
        .pipe(rename({suffix: '.min'}))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/css'))
        .pipe(livereload());
});

gulp.task('html', function() {
    return gulp.src('html/*.html')
        .pipe(gulp.dest('dist'))
        .pipe(livereload());
});


gulp.task('default', ['style', 'html'], function() {
    livereload.listen();
    gulp.watch(['scss/*.scss', 'bower_components/inuitcss/*.scss'], ['style']);
    gulp.watch('html/*.html', ['html']);
});