
define( [ "qlik", "jquery", "./properties" , "css!./com-evolcon-googleStreetView.css", 
	"./async!https://maps.googleapis.com/maps/api/js?key=AIzaSyDxKhjLdMmHCj0RVKNMvAYay74R8V0Uvec&callback=initMap"
],
function (qlik, $, props, cssContent, gmaps) {
"use strict";

	return {
		definition: props,
        initialProperties: {
            qHyperCubeDef: {
                qDimensions: [],
                qMeasures: [],
                qInitialDataFetch: [
                    {
                        qWidth: 2,
                        qHeight: 250
                    }
                ]
        	}
		},
		support : {
			snapshot: true,
			export: true,
			exportData : false
		},
		paint: function ($element, layout) {
					
			var id = "container_" + layout.qInfo.qId;
			var hc = layout.qHyperCube;
			
			var data = hc.qDataPages[0].qMatrix.map(function (d) {
				return {
					"Lng_Origin":eval(d[0].qText)[0],
					"Lat_Origin":eval(d[0].qText)[1],
					"Lng_Destination":eval(d[1].qText)[0],
					"Lat_Destination":eval(d[1].qText)[1]
				}
			});

			var originLabel = hc.qDimensionInfo[0].dynamicLabel;
			var destinationLabel = hc.qDimensionInfo[1].dynamicLabel;

			var errorMessage = layout.props.errorMessage;
			
			var myMedia = layout.props.myMedia;

			console.log("Data returned: ", hc);
			console.log("Data: ", data);
			console.log("Layout: ", layout)

			$element.empty();
			
			var divs = "<div class='container' id='" + id + "'>";

			if (data.length === 1) {

				divs += "<div id='left_column'>";
					divs += "<div class='desc_wrapper'><div class='desc'>" + originLabel + "</div></div>";
					divs += "<div id='pano_origin'></div>";
					divs += "<div class='desc_wrapper'><div class='desc'>" + destinationLabel + "</div></div>";
					divs += "<div id='pano_destination'></div>";
				divs += "</div>";

				divs += "<div id='right_column'>";
					divs += "<div class='desc_wrapper'><div class='desc' id='distance_time'></div></div>";
					divs += "<div id='map_route'></div>";
				divs += "</div>";

			} else {

				divs += "<div class='error_message_wrapper'><div class='error_message'>" + errorMessage + "</div></div>";

			}

			divs += "</div>";

			$element.append(divs);

			if (data.length === 1) {

				var start = {lat: data[0].Lat_Origin, lng: data[0].Lng_Origin};
				var end = {lat: data[0].Lat_Destination, lng: data[0].Lng_Destination};

				initMapRoute(start, end, "map_route", "distance_time");
				panorama(start, "pano_origin");
				panorama(end, "pano_destination");
			
			}

			//needed for export
			return qlik.Promise.resolve();
		}
	};

} );



function initMapRoute(origin, destination, mapElementId, distanceTimeElementId) {

	var directionsDisplay = new google.maps.DirectionsRenderer();
	var directionsService = new google.maps.DirectionsService();
	var service = new google.maps.DistanceMatrixService();
	
	var map_route;
	var mapOptions = {
		zoom: 10,
		center: origin
	}
	var route = {
		origin: origin,
		destination: destination,
		travelMode: 'BICYCLING'
	};

	map_route = new google.maps.Map(document.getElementById(mapElementId), mapOptions);
	directionsDisplay.setMap(map_route);

	directionsService.route(route, function(result, status) {
		if (status == 'OK') {
		directionsDisplay.setDirections(result);
		}
	});

	service.getDistanceMatrix(
		{
			origins: [origin],
			destinations: [destination],
			travelMode: 'BICYCLING'
		}, callback);

	function callback(response, status) {
		if (status == 'OK') {
			var origins = response.originAddresses;
			var destinations = response.destinationAddresses;

			for (var i = 0; i < origins.length; i++) {
				var results = response.rows[i].elements;
				console.log(results);
				for (var j = 0; j < results.length; j++) {
					var element = results[j];
					var distance = element.distance.text;
					var duration = element.duration.text;
					var from = origins[i];
					var to = destinations[j];
					var outputDiv = document.getElementById(distanceTimeElementId);
					outputDiv.innerHTML += "Distance: " + distance.replace(/,/g, '.') + " | Google's estimated time: " + duration;
				}
			}
		}
	}
}

function panorama(location, elementId) {
	var panorama_origin = new google.maps.StreetViewPanorama(
		document.getElementById(elementId), {
		position: location,
		pov: {
			heading: 34,
			pitch: 10
		}
		});
}
