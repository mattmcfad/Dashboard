var weather = {

	getWeather: function(){
		$.ajax({
			url : "http://api.wunderground.com/api/"
				+ keys.wunderground
				+ "/forecast/q/Canada/Toronto.json",
			dataType : "jsonp",
			success : function(data){
				weather.printWeather(data);
			}
		});
	},

	printWeather: function(data){
		var list = $("#weather-details");
		$.each(data.forecast.txt_forecast.forecastday, function(index, obj){
			list.append("<li><h4>"+ obj.title+ "</h4>" + obj.fcttext_metric + "</li>");
		});
	}
};