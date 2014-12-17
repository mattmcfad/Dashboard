define(function() {
	"use strict";

	var cookieMonster = {};

	cookieMonster.createCookie = function(name, value, minutes) {
		var expires = "";
		if (minutes) {
			var date = new Date();
			date.setTime(date.getTime() + (minutes * 60));
			expires = "; expires=" + date.toGMTString();
		}
		document.cookie = name + "=" + value + expires + "; path=/";
		console.log("made cookie");
	}

	cookieMonster.readCookie = function(name) {
		var nameEQ = name + "=",
			ca = document.cookie.split(";");
			
		for (var i = 0, len = ca.length; i < len; i++){
			var c = ca[i];

			while (c.charAt(0) == ' ') {
				c.substring(1, len);
			}

			if (c.indexOf(nameEQ) == 0) {
				return c.substring(nameEQ.length, c.length);
			}
		}

		return null;
	}


	return cookieMonster;
})