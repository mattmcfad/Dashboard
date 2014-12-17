define(function() {
	"use strict";
	
	var utils = {};


	utils.ajax = function(url, type, callback) {

		$.ajax({
			url : url,
			dataType : type,
			success : function(data) {
				callback(data);
			},
			error : function(error) {
				console.error(error);
				console.log("error");
			}
		});
	}

	utils.getPredictionTime = function(epoch) {
		var date = new Date();
		date.setTime(epoch);
		var hours = date.getHours() <= 12 ? date.getHours() : date.getHours() - 12,
			minutes = date.getMinutes() < 10 ? "0"+ date.getMinutes() : date.getMinutes(),	
			time = hours + ":" + minutes;
		return time;
	}

	utils.getTime = function() {
		return Date.now().toString()
	}

	return utils;
})