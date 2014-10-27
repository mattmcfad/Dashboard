(function(){

	function eventListeners(){

		// Weather
		$("#get-weather").on("click", function(e){
			e.preventDefault();
			weather.getWeather();
		});


		// TTC
		$(".buttons > button").on("click", function(e){
			e.preventDefault();
			var id = this.id.split("-"),
				stopId = id[0],
				routeId = id[1];
				
			ttc.getXml(stopId, routeId);
		});
	}

	function init(){
		eventListeners();
	}

	init();

})();