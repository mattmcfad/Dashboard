define(["global/utils", "app/apiKeys"], function(utils, keys) {
	"use strict";
	
	var weatherCtrl = {};
	
	var baseUrl = "http://api.wunderground.com/api/",
		endUrl  = "/q/Canada/Toronto.json";

	weatherCtrl.getWeather = function() {
		var url = baseUrl
				+ keys.getKey("wunderground")
				+ "/forecast" + endUrl;

		utils.ajax(url, "jsonp", weatherCtrl.printWeather);
	}

	weatherCtrl.printWeather = function(data) {
		var list = $("#weather-details").html("");
		$.each(data.forecast.txt_forecast.forecastday, function(index, obj) {
			list.append("<li><h4>"+ obj.title+ "</h4><p>" + obj.fcttext_metric + "</p></li>");
		});
		utils.removeLoader(list);
	}

	weatherCtrl.getHourly = function() {
		//http://api.wunderground.com/api/6dd99ff6fbbdb718/hourly/q/CA/San_Francisco.json
		var url = baseUrl + keys.getKey("wunderground")
				+ "/hourly" + endUrl;

		utils.ajax(url, "jsonp", function(data) {
			var hourlyForecast = [];
			for (var i = 0; i < data.hourly_forecast.length; i++){
				var obj = data.hourly_forecast[i];
				hourlyForecast[i] = {
					temp : obj.temp.metric,
					feel: obj.feelslike.metric,
					condition : obj.icon_url,
					time: {
						est: obj.FCTTIME.civil,
						day: obj.FCTTIME.weekday_name_abbrev
					}
				}
			}
			graphLinePlot(hourlyForecast);

		});

	}

	function graphLinePlot(hourlyForecast){
	
		utils.removeLoader($("#weather-graph"));

		var temperatureData = [],
				feelsLikeData = [],
				hourOfDayData = [],
				j = 0;

		for (var i = 0; i < hourlyForecast.length; i+=3){
				var time = ("" + hourlyForecast[i].time.est).split(":00");
				temperatureData[j] = hourlyForecast[i].temp * 1;
				feelsLikeData[j] = hourlyForecast[i].feel * 1;
				hourOfDayData[j] = time[0] + "" + time[1];
				j++;
		}
		console.log(temperatureData, feelsLikeData, hourOfDayData);

		var data = {
			labels: hourOfDayData,
			series: [
				{
					name: 'Bruh, this ish feels like:',
					data: feelsLikeData
				},
				{
					name: 'Temperature:',
					data: temperatureData
				}
			]
		};

		var max  = Math.max.apply(Math, feelsLikeData.concat(temperatureData));
		var min   = Math.min.apply(Math, feelsLikeData.concat(temperatureData));
		var options = {
			high: max, //limit to Max Min of data
			low: min,
			axisX: {
				labelInterpolationFnc: function(value, index) {
					// determines how many x-axis labels displayed
					return index % 0.5 === 0 ? value : null;
				}
			},
			fullWidth: true,
			centerBars: true
		};

		new Chartist.Bar('.ct-chart', data, options);
	}


	weatherCtrl.init = function() {

		$("#get-weather").on("click", function(e) {
			e.preventDefault();
			weatherCtrl.getWeather();
			utils.startLoading($(this));
		});

		$("#get-hourly").on("click", function(e) {
			e.preventDefault();
			weatherCtrl.getHourly();
			utils.startLoading($(this));
		});
	}

	return weatherCtrl;
});