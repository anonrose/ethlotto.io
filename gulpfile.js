var gulp = require('gulp');
var minifyCSS = require('gulp-csso');
var concat = require('gulp-concat');

gulp.task('css', function(){
  return gulp.src('./frontend/stylesheets/dev/*.css')
    .pipe(minifyCSS())
    .pipe(concat('app.css'))
    .pipe(gulp.dest('./frontend/stylesheets/prod/'))
});

gulp.task('default', [ 'css' ]);
