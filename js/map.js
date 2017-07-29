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
       var featureArray = getFeatures(loc);

       

     }

     /**
      * Get a list of features from the database, based on the current location
      * @param {*} loc 
      */
     function getFeatures(loc){
      
     }
     //document.getElementById("submitbutton").onclick = function () {alert("HELLO");};

     function handleLocationError(browserHasGeolocation, map) {
        //error

        //add a marker to the centre of the map
        addMarker(map.center, map);
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
       var season = getSeasonInt();
       alert(getMarkerLatitude(pointMarker) + " " + getMarkerLongitude(pointMarker) + " " + season);
     }

     function getSeasonInt() {
       //the season slider element
       // 0 = summer
       // 1 = autumn
       // 2 = winter
       // 3 = spring

       var season = document.getElementById('season').value;
       return season;

     }

     
