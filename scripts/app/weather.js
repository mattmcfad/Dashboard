define(["app/apiKeys", "global/utils"], function(keys, utils) {

	weatherCtrl = {};

	weatherCtrl.getWeather = function() {

		var url = "http://api.wunderground.com/api/"
				+ keys.getKey("wunderground")
				+ "/forecast/q/Canada/Toronto.json";

		utils.ajax(url, "jsonp", weatherCtrl.printWeather);

	}

	weatherCtrl.printWeather = function(data) {
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