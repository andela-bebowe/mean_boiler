var gulp = require('gulp'),
    nodemon = require('gulp-nodemon'),
    jshint = require('gulp-jshint'),
    mocha = require('gulp-mocha');

gulp.task('lint', function() {
  gulp.src(['!./node_modules/**', '/**/*/.js'])
    .pipe(jshint())
})

gulp.task('default', function() {
  nodemon({
    script: 'server.js',
    ext: '/**/*/.js',
    ignore: ['./node_modules/**'],
    task: ['lint']
  })
  .on('crash', function() {
    this.emit('restart', 10);
  })
});

gulp.task('test', function() {
  gulp.src('tests/**/*.js')
    .pipe(mocha({ reporter: 'nyan' }))
})
