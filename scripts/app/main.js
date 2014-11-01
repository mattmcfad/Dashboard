define(["app/weather", "app/ttc"], function(weather, ttc){
	console.log("app dep loaded");
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