define(["app/apiKeys"], function(keys) {

	weatherCtrl = {};

	weatherCtrl.getWeather = function() {

		
		$.ajax({
			url : "http://api.wunderground.com/api/"
				+ keys.getKey("wunderground")
				+ "/forecast/q/Canada/Toronto.json",
			dataType : "jsonp",
			success : function(data) {
				printWeather(data);
			}
		});
	}

	function printWeather(data) {
		var list = $("#weather-details")
		console.log(data);
		$.each(data.forecast.txt_forecast.forecastday, function(index, obj) {
			list.append("<li><h4>"+ obj.title+ "</h4>" + obj.fcttext_metric + "</li>");
		});
	}

	weatherCtrl.init = function() {
		$("#get-weather").on("click", function(e) {
			e.preventDefault();
			weatherCtrl.getWeather();
		});
	}

	return weatherCtrl;
});