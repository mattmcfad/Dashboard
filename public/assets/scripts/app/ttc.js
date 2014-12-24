//	
	// Route List
	// http://webservices.nextbus.com/service/publicXMLFeed?command=routeList&a=ttc

	// 48 Rathburn
	// http://webservices.nextbus.com/service/publicXMLFeed?command=routeConfig&a=ttc&r=48
	
		// 1470 East - CEDARLAND
		// http://webservices.nextbus.com/service/publicXMLFeed?command=predictions&a=ttc&stopId=1470&routeTag=48

		// 14752 West - ROYAL YORK STATION
		// http://webservices.nextbus.com/service/publicXMLFeed?command=predictions&a=ttc&stopId=14752&routeTag=48

	// 37 Islington
	// http://webservices.nextbus.com/service/publicXMLFeed?command=routeConfig&a=ttc&r=37

		// 3828 South - ISLINGTON & RATHBURN
		// http://webservices.nextbus.com/service/publicXMLFeed?command=predictions&a=ttc&stopId=3828&routeTag=37

		// 14697 North - ISLINGTON STATION
		// http://webservices.nextbus.com/service/publicXMLFeed?command=predictions&a=ttc&stopId=14697&routeTag=37
define(["global/utils", "global/cookieMonster"], function(utils, cookieMonster) {
	"use strict";

	var ttcCtrl = {};

	// cookieMonster.createCookie("test", "devtest", 1500);

	ttcCtrl.getXml = function (stopId, routeId) {

		var url = "http://webservices.nextbus.com/service/publicXMLFeed?command=predictions&a=ttc&stopId="
				+ stopId 
				+ "&routeTag=" 
				+ routeId;

		utils.ajax(url, "xml", ttcCtrl.parseXml);
	}

	ttcCtrl.parseXml = function (xmlData) {
		
		var obj = {};

		$(xmlData).find("predictions").each(function() {

			var that = $(this),
				routeTitle = that.attr("routeTitle"),
				stopTitle = that.attr("stopTitle");

			obj.stop = stopTitle;
			obj.route = routeTitle;
		    obj.predictions = [];

			that.find("prediction").each(function() {
				var that = $(this),
					time = convertTime(that.attr("seconds")),
					prediction = {
						arrivalTime: utils.getPredictionTime(that.attr("epochTime")),
						minutes: time.minutes,
						seconds: time.seconds
					};

				obj.predictions.push(prediction);
			});
		});

		displayTime(obj);
		utils.removeLoader($(".ttc h2"));
	}


	function displayTime(obj) {

		var article;

		if (!ttcCtrl.full) {
			article = $("#prediction-1");
			ttcCtrl.full = true;
		}
		else {
			article = $("#prediction-2");
		}

		article.html("<h3>" + obj.stop + "</h3>")
			   .append("<h4>" + obj.route + "</h4>");


		sortTimes(obj.predictions, function(array) {

			for (var i = 0; i < array.length; i++) {
				article.append(
					"<p><span class='arrival-time'>"
					+ array[i].arrivalTime 
					+ "</span> - "
					+ "<span class='minutes'>" + array[i].minutes + "</span> min "
					+ "<span class='seconds'>" + array[i].seconds + "</span> s"
	 				+ "</p>");

			}
			startCountdownTimer(array, article);
		});
	}

	function startCountdownTimer(obj, jqueryContainer) {
		
		var minTag =  jqueryContainer.find(".minutes");
		var secTag =  jqueryContainer.find(".seconds");

		setInterval(function() {

			for (var i = 0; i < obj.length; i++){
				var minutes = obj[i].minutes,
					seconds = obj[i].seconds;

				if (seconds === 0 && minutes !== 0){
					seconds = 59;
					minutes--;
				}
				else if (seconds !== 0){
					seconds--;
				}

				obj[i].minutes = minutes;
				obj[i].seconds = seconds;

				minTag.eq(i).html(minutes);
				secTag.eq(i).html(seconds);

			}

		}, 1000);
	}

	function storeRoute(obj) {

	}

	function getStoredRoutes() {

	}

	function convertTime(totSeconds){
		var minutes = ~~(totSeconds / 60),
			seconds = totSeconds - (minutes * 60);

		return { minutes: minutes, seconds: seconds};
	}

	function sortTimes (arr, callback) {
		arr = arr.sort(function(a,b) {
			return a.minutes - b.minutes;
		});

		callback(arr);
	}

	ttcCtrl.init = function (){

		$(".buttons > button").on("click", function(e) {
			e.preventDefault();
			ttcCtrl.full = false;

			var id = [], 
				route = [37, 48];

			if (this.id === "work") {
				id = [3828, 1470];
			} else if (this.id === "home") {
				id = [14697, 14752];
			}

			utils.startLoading($(this));
			for (var i = 0; i < id.length; i++){
				ttcCtrl.getXml(id[i], route[i]);
			}

		})
	}

	return ttcCtrl;
});