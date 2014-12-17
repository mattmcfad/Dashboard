define(["app/weather", "app/ttc"], function(weather, ttc){
	"use strict";

	var app = {};

	app.eventListeners = function(){
		ttc.init();
		weather.init();
	};

	app.init = function(){
		app.eventListeners();
	};

	app.init();

	return app;

});