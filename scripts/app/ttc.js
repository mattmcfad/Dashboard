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


define( function() {

	var ttcCtrl = {};	

	 ttcCtrl.parseXml = function (xmlData) {

		var article = $(".ttc > article"),
		 	obj = {};

		$(xmlData).find("predictions").each(function() {

			var that = $(this),
				routeTitle = that.attr("routeTitle"),
				stopTitle = that.attr("stopTitle");

			obj.stop = stopTitle;
			obj.route = routeTitle;
		    obj.predictions = [];

			that.find("prediction").each(function() {
				var that = $(this),
					prediction = {
						minutes: that.attr("minutes"),
						seconds: that.attr("seconds")
					};

				obj.predictions.push(prediction);
			});
		});

		article.html("<h3>" + obj.stop + "</h3>")
			   .append("<h4>" + obj.route + "</h4>");


		sortTimes(obj.predictions, function(array) {
			for (index in array) {
				article.append("<p>"
							 + array[index].minutes + " mins "
							 + array[index].seconds + " seconds"
							 + "</p>");
			}
		});

	}

	function sortTimes (arr, callback) {
		arr = arr.sort(function(a,b) {
			return a.minutes - b.minutes;
		});

		callback(arr);
	}

	ttcCtrl.getXml = function (stopId, routeId) {

		var url = "http://webservices.nextbus.com/service/publicXMLFeed?command=predictions&a=ttc&stopId="
				+ stopId 
				+ "&routeTag=" 
				+ routeId;

		utils.ajax(url, "xml", ttcCtrl.parseXml);
	}

	ttcCtrl.init = function (){
		$(".buttons > button").on("click", function(e){
			e.preventDefault();
			var id = this.id.split("-"),
				stopId = id[0],
				routeId = id[1];

			ttcCtrl.getXml(stopId, routeId);
		});
	}

	return ttcCtrl;
});