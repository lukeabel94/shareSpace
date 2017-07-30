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

       pos = {
           lat: -27.4698, 
           lng: 153.0513
         };
       // Add in the wifi and other logos
       addFeatures(pos, map);

     }

     /**
      * Add the feature markers to the map
      */
     function addFeatures(loc, map) {
      //  var featureArray = getFeatures(loc);
      var featureArray = getFeatures(loc);

      console.log(featureArray);
        // .then((res) => {
        //   var featureArray = res;
        //   console.log('features %o', featureArray);
        // })
     }

     /**
      * Get a list of features from the data, based on the current location
      * @param {*} loc 
      */
    function getFeatures(loc) {

      console.log(loc); 
      //TODO Make an object/array of urls of the data sets to parse, then iterate
    
      var url = "./data/WiFi-dataset-Open-data.csv";
      var objArr = [];

      // The urls of the data sets to use
      var urlArr = 
        ["./data/WiFi-dataset-Open-data.csv",
          "./data/Bus-Stop-locations.csv",
          "./data/FERRYTERMINAL20170713.csv",
          "./data/community-halls-information-and-locationf.csv",
          "./data/CBD-bike-racks.csv",
          // "./data/Open-Data---AM---datasetparkfacilties.csv",
          // "./data/AIM---PARKS---OPEN-DATA---Public-Drinking-Fountain-Taps---DATA-TO-PUBLISH---DEC-2016.csv"
          
        ];

      // For each set of data
      for (var url in urlArr) {
          getFileFromURL(urlArr[url])
            .then((res) => {
              console.log('done %o',res);
              
              let arr = res.data

              let filteredObj = {};

              // Play with the data
               
              // get the key of the lat and long
              let latKey = getObjectKey(arr[0], 'Latitude');
              let lngKey = getObjectKey(arr[0], 'Longitude');
              
              // start at index 1
              var key = 1;

              // If lat long is within 2km, starting at the array 1
              for (key in arr) {
                // If the distance between the current location and the current object
                if (haversine(loc.lat, loc.lng, arr[key][latKey], arr[key][lngKey]) <= 2) {
                  console.log('Haver Found: %o', arr[key]);
                } else {
                }
              }
              console.log('done');


              if (res.data[url][6] = "THE GABBA") {
                
                //TODO make function that traverses array
                
                console.log(res.data[url]);
              }
              // newObj = haversine(pos.lat, pos.lng, res.data)
              // console.log(newObj);
              objArr.push(res.data);
            });
      }
    
      return objArr;
      // return getFileFromURL(url)
      //   .then((res) => {
      //     console.log('done %o',res);
      //     return res;
      //   });
        
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
     async function getFileFromURL(url) {

      // Get the file reference from the URL
      var data = await getFile(url);

      // Return the parsed Papa data
        return Papa.parse(data, {
          complete: function(results) {
            return results;
          }
      });

     }

     /**
      * Use ajax to get a file reference based on a url
      * @param {*} url 
      */
     async function getFile(url) {
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

     /**
      * Haversine forumla - calculates the distance between two lat and long points
      */
     function haversine() {
       var radians = Array.prototype.map.call(arguments, function(deg) { return deg/180.0 * Math.PI; });
       var lat1 = radians[0], lon1 = radians[1], lat2 = radians[2], lon2 = radians[3];
       var R = 6372.8; // km
       var dLat = lat2 - lat1;
       var dLon = lon2 - lon1;
       var a = Math.sin(dLat / 2) * Math.sin(dLat /2) + Math.sin(dLon / 2) * Math.sin(dLon /2) * Math.cos(lat1) * Math.cos(lat2);
       var c = 2 * Math.asin(Math.sqrt(a));
       return R * c;
}

  /**
   * get the key of an object where the property is the property input
   * @param {Object} object 
   * @param {String} property 
   */
  function getObjectKey(object, property) {
              // Get the key of the lat and long
              
              // For each key in the object
              for (var key in object) {
                if (object[key].toUpperCase() == property.toUpperCase()) {
                  console.log('key found: ' + key);
                  return key;
                }
              } 
  }
