define(["app/weather", "app/ttc"], function(weather, ttc){
	"use strict";

	var obj = {};

	function eventListeners(){
		ttc.init();
		weather.init();
	}

	function init(){
		eventListeners();
	}

	init();

});