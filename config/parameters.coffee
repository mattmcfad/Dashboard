app_path = "./public"
assets_path = app_path + "/assets"


config =

  assets: assets_path
  dist: app_path
  dist_css: assets_path + "/css/"

  templates_folder: "./templates"
  stylesheets_folder: "./styles/main.styl"
  js_folder: [ assets_path + "/scripts/global/*.js", assets_path + "/scripts/app/*.js", assets_path + "common.js"] 

module.exports = config