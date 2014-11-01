define(["app/weather", "app/ttc"], function(weather, ttc){
	
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