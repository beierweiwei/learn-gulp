// var gulp        = require('gulp');
// var browserSync = require('browser-sync').create();

// // 静态服务器
// gulp.task('browser-sync', function() {
//     browserSync.init({
//         server: {
//             baseDir: "./"
//         }
//     });
// });

// // 代理

// gulp.task('browser-sync', function() {
//     browserSync.init({
//         proxy: "你的域名或IP"
//     });
// });

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    coffee = require('gulp-coffee'),
    jade = require('gulp-jade');
    autoprefixer = require("gulp-autoprefixer"),
    minifycss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    del = require('del');

 var browserSync = require('browser-sync');
 var reload = browserSync.reload;



gulp.task('styles',function(){
  gulp.src('./src/sass/*.scss')
    .pipe(sass())
    // .pipe(autoprefixer('last 2 version'))
    .pipe(concat('main.css'))
    .pipe(gulp.dest('./dist/css'))
    .pipe(reload({ stream:true }))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('./dist/css'))
    
    //.pipe(notify('Style task complete'))
    

})

gulp.task('scripts',function(){
  gulp.src('./src/coffee/*.coffee')
    .pipe(coffee({bare: true}))
    .pipe(concat('main.js'))
    .pipe(gulp.dest('./dist/js'))
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./dist/js'))
    .pipe(reload({ stream:true }));
    //.pipe(notify('Scripts task complete'))
    
})

gulp.task('templates', function() {
  var YOUR_LOCALS = {};
 
  gulp.src('./views/**/*.jade')
    .pipe(jade({
      locals: YOUR_LOCALS
    }))
    .pipe(gulp.dest('./'))
    .pipe(reload({ stream:true }));
    //.pipe(notify("Templates task complete"))
    
});
gulp.task('clean',function(cb){
  del(['./dist'],cb)
})


gulp.task('default',['clean'],function(){
  gulp.start('styles','scripts','templates');
})

gulp.task('watch',function(){
  gulp.watch('./src/sass/*.scss',['styles']);
  gulp.watch('./src/coffee/*.coffee',['scripts']);
  gulp.watch('./views/*.jade',['templates']);
})

 //监视文件改动并重新载入
 gulp.task('server',['styles','templates'], function () {
 	browserSync({
 		server: {
 			baseDir: './'
 		}
 	});
 	  gulp.watch('./src/sass/*.scss',['styles']);
  	gulp.watch('./src/coffee/*.coffee',['scripts']);
  	gulp.watch('./views/*.jade',['templates']);
 })

