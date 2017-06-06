var gulp = require('gulp');
var clean = require('gulp-clean');
var autoprefixer = require('gulp-autoprefixer');
var sass = require('gulp-ruby-sass');
var livereload = require('gulp-livereload');
var rev = require('gulp-rev');
var inject = require('gulp-inject');
var fs = require('fs');
var jsonCss;
var jsonJs;


gulp.task('default', ['autoprefixer', 'delete', 'livereload']);


gulp.task('autoprefixer', function() {
  gulp.src('css/**/*.css')
      .pipe(autoprefixer({
        browsers: ['last 2 versions'],
      }))
      .pipe(gulp.dest('css/'));
});

gulp.task('sass', function() {
  return sass('scss/**/*.scss')
         .on('error', sass.logError)
         .pipe(gulp.dest('css/'))
         .pipe(livereload());
});

gulp.task('livereload', function() {
  gulp.src('index.html')
  .pipe(livereload());

});

gulp.task('jsHash', function() {
  return gulp.src('./js/script.js')
    .pipe(gulp.dest('./js/dist'))
    .pipe(rev())
    .pipe(gulp.dest('./js/dist'))
    .pipe(rev.manifest())
    .pipe(gulp.dest('./js/dist/'));

});

gulp.task('assemble', ['sass'], function() {
  return gulp.src('./css/styles.css')
    .pipe(gulp.dest('./css/dist'))
    .pipe(rev())
    .pipe(gulp.dest('./css/dist'))
    .pipe(rev.manifest())
    .pipe(gulp.dest('./css/dist/'));

});

gulp.task('index', ['assemble', 'jsHash'], function() {
  jsonCss = JSON.parse(fs.readFileSync('./css/dist/rev-manifest.json'));
  jsonJs = JSON.parse(fs.readFileSync('./js/dist/rev-manifest.json'));
  var target = gulp.src('./index.html');
  var source = gulp.src(['./js/dist/' + jsonJs['script.js'], './css/dist/' + jsonCss['styles.css']], {read: false});
  return target.pipe(inject(source, {relative: true}))
    .pipe(gulp.dest(''));
});

gulp.task('delete', ['index'], function () {
  return gulp.src([ 'css/dist/*.css', 'js/dist/*.js', '!css/dist/' + jsonCss['styles.css'], '!js/dist/' + jsonJs['script.js'] ])
    .pipe(clean());
});

gulp.task('watch', function() {
  livereload.listen();
  gulp.watch('scss/**/*.scss', ['delete']);
  gulp.watch('js/script.js', ['delete']);
  gulp.watch('index.html', ['livereload']);
});
