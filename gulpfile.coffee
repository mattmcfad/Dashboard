gulp         = require 'gulp'
clean        = require 'gulp-clean'
concat       = require 'gulp-concat'
prefix       = require 'gulp-autoprefixer'
jade         = require 'gulp-jade'
jshint       = require 'gulp-jshint'
livereload   = require 'gulp-livereload'
stylus       = require 'gulp-stylus'
uglify       = require 'gulp-uglify'
gutil        = require 'gulp-util'
watch   	   = require 'gulp-watch'

param        = require './config/parameters.coffee'

## ------------------
## ----  BUILD  -----
## ------------------

## --- JavaScript
## ------------------
gulp.task 'scripts', ->
  gulp.src param.js_folder
  .pipe jshint()


## --- Jade Templates
## ------------------
# gulp.task 'templates', () ->
#   gutil.log gutil.colors.magenta 'Compiling Jade files'
# 	gulp.src param.templates_folder + 'index.jade'
# 	  .pipe jade(pretty: true)
#     .pipe gulp.dest param.dist


## --- Stylesheets
## ------------------
gulp.task 'styles', ->
  gutil.log gutil.colors.green 'Compiling STYLUS:' + param.dist_css
  gulp.src param.stylesheets_folder
  .pipe stylus()
  .pipe prefix()
  .pipe gulp.dest param.dist_css 



## ------------------
## ----  DIST   -----
## ------------------

## --- Concat
## ------------------
# gulp.task 'concat', ->
#   gulp.src '../app/assets/.css'
#   .pipe concat 'main.min.css'
#   .pipe gulp.dest '../dist/css/'

## --- Uglify
## ------------------
# gulp.task 'uglify', ->
#   gulp.src param.js_folder
#   .pipe uglify()
#   .pipe gulp.dest param.dist + '/js/'



## --- Server
## ------------------
gulp.task 'server', ->
  livereload.listen()


## --- Mr. Clean
## ------------------
gulp.task 'clean', ->
  gutil.log gutil.colors.red 'cleaning out the closet'
  #gulp.src ['public/index.html', 'public/assets/css/*.css']
  gulp.src ['public/assets/css/*.css']
  .pipe clean 
    read : false

## --- Watch
## ------------------
gulp.task 'watch', ->

  gutil.log gutil.colors.magenta 'watching JS: ' + param.js_folder
  gulp.watch param.js_folder, ['scripts']
  
  # gutil.log gutil.colors.magenta 'watching Jade: ' + param.templates_folder + '**/*.jade'
  # gulp.watch param.templates_folder + '**/*.jade', ['templates']
  
  gutil.log gutil.colors.magenta 'watching Stylus: ' + param.stylesheets_folder
  gulp.watch './styles/*.styl', ['styles'] 


## ------------------
## ----  TASKS  -----
## ------------------
#gulp.task 'build', ['clean','scripts', 'templates', 'styles' ]

#gulp.task 'dist', ['build','concat','uglify']

#gulp.task 'default', ['build','server', 'watch']

gulp.task 'default' , ['styles', 'watch']

