(function(){

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


	function parseXML(xmlData){
		var oSerializer = new XMLSerializer(),
		    sXML = oSerializer.serializeToString(xmlData),
		    xml = $(sXML)[2],
		    article = $(".ttc > article");

		$(xml).find("prediction").each(function(){
			var that = $(this),
				text = ("Branch: " + that.attr("branch")
				      + " minutes: " + that.attr("minutes")
				      + " seconds: " + that.attr("seconds"));

			article.append("<p>" + text + "</p>");
			console.log(text);
		});
		

	}

	function getXml(stopId, routeId){
		$.ajax({
			url : "http://webservices.nextbus.com/service/publicXMLFeed?command=predictions&a=ttc&stopId="
			+ stopId 
			+ "&routeTag=" 
			+ routeId,
			dataType : "xml",
			success : function(data){
				parseXML(data);				
			}
		});
	}

	getXml(14697, 37); // 37 North 

})();