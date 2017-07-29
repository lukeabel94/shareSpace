var pointMarker;

function startMap() {
       map = new google.maps.Map(document.getElementById('map'), {
         center: {lat: -27.4698, lng: 153.0513},
         zoom: 11
       });

       //load geoJson info
       //map.data.loadGeoJson(*example json*);

       var pos;

       // Try HTML5 geolocation.
       if (navigator.geolocation) {
         navigator.geolocation.getCurrentPosition(function(position) {
           pos = {
             lat: position.coords.latitude,
             lng: position.coords.longitude
           };
           map.setCenter(pos);
           addMarker(pos,map);
         }, function() {;
           handleLocationError(true, map);
         });
       } else {
         // Browser doesn't support Geolocation
         handleLocationError(false, map);
       }

       // Add in the wifi and other logos
       addFeatures(pos, map);


     }

     /**
      * Add the feature markers to the map
      */
     function addFeatures(loc, map) {
      //  var featureArray = getFeatures(loc);
      var featureArray = getFeatures(loc);
       

     }

     /**
      * Get a list of features from the data, based on the current location
      * @param {*} loc 
      */
    function getFeatures(loc) {

      //TODO Make an object/array of urls of the data sets to parse, then iterate
    
      var url = "./data/WiFi-dataset-Open-data.csv";
      
      return getFileFromURL(url)
        .then((res) => {

          console.log('done %o',res);
          return res.data;
        });

      // var wifiData = Papa.parse(csv);
      
     

    }

     //document.getElementById("submitbutton").onclick = function () {alert("HELLO");};

     function handleLocationError(browserHasGeolocation, map) {
        //error

        //add a marker to the centre of the map
        addMarker(map.center, map);
     }

     /** 
      * Ajax request to get the a file reference from a url
      * 
      */
     function getFileFromURL(url) {

      // Get the file reference from the URL
      return getFile(url)
        // Wait to finish
        .then((data => {
          // Return the parsed Papa data
           return Papa.parse(data, {
	            complete: function(results) {
                console.log(results);
                return results;
	            }
          });
        }));
    //    $.ajax({
    //     type: "GET",
    //     url: url,
    //     dataType: "text",
    //     success: function(data) {
    //        return Papa.parse(data, {
	  //           complete: function(results) {
    //             console.log(results);
    //             // Add to map
    //             return results;
	  //           }
    //       });
    //       // console.log(obj);
    //     }
    //  });
     }

     function getFile(url) {

      return $.ajax({
        type: "GET",
        url: url,
        dataType: "text",
        success: function(data) {
          return data;
          // console.log(obj);
        }
     });
     }
     //Add a marker to the specified location and map
     function addMarker(location, map){
       var marker = new google.maps.Marker({
         position: location,
         map: map,
         draggable:true,
         id: 'plantMarker'
       });
       updateCoords(marker);
       marker.addListener('dragend', dragMarkerEvent);
       pointMarker = marker;
     }

     //Update the hidden coordinate boxes
     function updateCoords(marker) {
       var latbox = document.getElementById("latitudebox");
       var longbox = document.getElementById("longitudebox");

       //Update the two boxes
       latbox.value = getMarkerLatitude(marker);
       longbox.value = getMarkerLongitude(marker);

       //update city text box
     }

     //Get a marker's latitude
     function getMarkerLatitude(marker) {
       var latlng = marker.getPosition();
       return latlng.lat();
     }

     //Get a marker's longitude
     function getMarkerLongitude(marker) {
       var latlng = marker.getPosition();
       return latlng.lng();
     }

     ///handle when the marker is dragged
     function dragMarkerEvent(event){
       document.getElementById('latitudebox').value = event.latLng.lat();
       document.getElementById('longitudebox').value = event.latLng.lng();

       //update city text box
     }

     function updateCity (latlong) {
       //update the city based on the coordinates

       //https://developers.google.com/maps/documentation/geocoding/start
       //get the json array
       //parse the json arry - get city
       //output city in text box
     }

     //print the lat and long of the marker, as well as the season
     function printPos() {
       alert(getMarkerLatitude(pointMarker) + " " + getMarkerLongitude(pointMarker) + " " + season);
     }
