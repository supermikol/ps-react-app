"use strict";

var gulp = require('gulp');
var connect = require('gulp-connect'); //Runs a local dev server
var open = require('gulp-open'); //opens url in web browser

var browserify = require('browserify'); // Bundles JS
var reactify = require('reactify'); // Transforms React JSX to JS
var source = require('vinyl-source-stream'); // Use conventional text streams with Gulp

var concat = require('gulp-concat'); //concatenates files

var eslint = require('gulp-eslint');

var config = {
  port: 9005,
  devBaseUrl: 'http://localhost',
  paths: {
    html: './src/*.html',
    js: './src/**/*.js',
    images: './src/images/*',
    css: [
      'node_modules/bootstrap/dist/css/bootstrap.min.css',
      'node_modules/bootstrap/dist/css/bootstrap-theme.min.css',
      'node_modules/toastr/toastr.css'
    ],
    eslintConfig: './eslint.config.json',
    dist: './dist',
    mainJs: './src/main.js'
  }
}

//Start a local dev server;
gulp.task('connect', function(){
  connect.server({
    root: ['dist'],
    port: config.port,
    base: config.devBaseUrl,
    livereload: true //everytime something changes, reload
  })
});

gulp.task('open', ['connect'], function() {
  // gulp.src('dist/index.html')
  gulp.src('') //this works fine
    .pipe(open({ uri: config.devBaseUrl + ':' + config.port + '/'}))
});

gulp.task('html', function(){
  gulp.src(config.paths.html)
    .pipe(gulp.dest(config.paths.dist)) //processes everything in src folder and pipe it to dist folder, which is what gets rendered
    .pipe(connect.reload()); //connect method to run the files
})

gulp.task('js', function(){
  browserify(config.paths.mainJs)
    .transform(reactify)
    .bundle()
    .on('error', console.error.bind(console)) //display errors on console if they are there
    .pipe(source('bundle.js'))
    .pipe(gulp.dest(config.paths.dist + '/scripts'))
    .pipe(connect.reload())
})

gulp.task('css', function(){
  gulp.src(config.paths.css)
    .pipe(concat('bundle.css'))
    .pipe(gulp.dest(config.paths.dist + '/css'));
})

gulp.task('images', function(){
  gulp.src(config.paths.images)
    .pipe(gulp.dest(config.paths.dist + '/images'))
    .pipe(connect.reload());
})

gulp.task('lint', function(){
  return gulp.src(config.paths.js)
    .pipe(eslint({config: 'eslint.config.json'}))
    .pipe(eslint.format());
})

gulp.task('watch', function() {
  gulp.watch(config.paths.html, ['html', 'lint']); //everytime something changes, run the html task
  gulp.watch(config.paths.js, ['js', 'lint']); //everytime something changes, run the js task
  gulp.watch(config.paths.images, ['images', 'lint']); //everytime something changes, run the images task
})

gulp.task('default', ['html', 'js', 'css', 'images', 'lint', 'open', 'watch']);