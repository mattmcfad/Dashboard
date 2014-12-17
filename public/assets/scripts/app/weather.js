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
		$("canvas").remove();
		var graphContainer = $(".graph-container").append('<canvas id="canvas-graph" width="'+ (($(".wrapper").width() / 2) - 50) + '"></canvas>');
		utils.removeLoader(graphContainer);
		var ctx = $("#canvas-graph").get(0).getContext("2d");
		
		var temperatureData = [],
			feelsLikeData = [],
			hourOfDayData = [],
			j = 0;

		for (var i = 0; i < hourlyForecast.length; i+=3){
			var time = ("" + hourlyForecast[i].time.est).split(":00")
			temperatureData[j] = hourlyForecast[i].temp*1;
			feelsLikeData[j] = hourlyForecast[i].feel*1;
			hourOfDayData[j] = time[0] + "" + time[1];
			j++;
		}

		var data = {
			labels: hourOfDayData,
			datasets: [
				{
					label: "Temp",
					fillColor: "rgba(220,220,220,0.2)",
					strokeColor: "rgba(220,220,220,1)",
					pointColor: "rgba(220,220,220,1)",
					pointStrokeColor: "#fff",
					pointHighlightFill: "#fff",
					pointHighlightStroke: "rgba(220,220,220,1)",
					data: temperatureData
				},
				{
					label: "Feels like",
					fillColor: "rgba(151,187,205,0.2)",
					strokeColor: "rgba(151,187,205,1)",
					pointColor: "rgba(151,187,205,1)",
					pointStrokeColor: "#fff",
					pointHighlightFill: "#fff",
					pointHighlightStroke: "rgba(151,187,205,1)",
					data: feelsLikeData
				}
			]
		};
	
		new Chart(ctx).Line(data, {
			scaleShowGridLines : true,
			scaleGridLineColor : "rgba(0,0,0,.05)",
			responsive : true
		});
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