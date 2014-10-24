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
		var oSerializer = new XMLSerializer();
		var sXML = oSerializer.serializeToString(xmlData);
		var xml = $(sXML)[2];
		console.log(xml)
		$(".ttc > article").text(xml.toString());

	}

	function getXml(stopId, routeId){
		$.ajax({
			url : "http://webservices.nextbus.com/service/publicXMLFeed?command=predictions&a=ttc&stopId="
			+ stopId 
			+ "&routeTag=" 
			+ routeId,
			dataType : "xml",
			success : function(data){
				//console.log($('prediction', data).eq(0).context.documentElement.innerHTML);
				parseXML(data);
				//console.log(data);
				
			}
		});
	}

	function getNextBus(stopId){

	}

	getXml(14697, 37); // 37 North 

})();