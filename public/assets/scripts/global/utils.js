define(function() {
	"use strict"
	
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

	return utils;
})