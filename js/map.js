var pointMarker;

function startMap() {
       map = new google.maps.Map(document.getElementById('map'), {
         center: {lat: -27.4698, lng: 153.0513},
         zoom: 18
       });

       //load geoJson info
       //map.data.loadGeoJson(*example json*);

       var pos;

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
     async function addFeatures(loc, map) {

      addVenues(map);
      //  var featureArray = getFeatures(loc);
      var featureArray = await getFeatures(loc, map);
     }

     /**
      * Get a list of features from the data, based on the current location
      * @param {*} loc 
      */
    async function getFeatures(loc, map) {


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
          "./data/AIM---PARKS---OPEN-DATA---Public-Drinking-Fountain-Taps---DATA-TO-PUBLISH---DEC-2016.csv"
          
        ];

      // For each set of data
      for (var url in urlArr) {
          getFileFromURL(urlArr[url])
            .then((res) => {
             
              let arr = res.data
              
              var objArr = [];
              var filteredObjArr = [];

              var count = 0;

              var dataType = getDataType(arr[0]);

              // Play with the data
               
              // get the key of the lat and long
              let latKey = getObjectKey(arr[0], 'Latitude');
              let lngKey = getObjectKey(arr[0], 'Longitude');
              
              // start at index 1
              var key = 1;

              

              // If lat long is within 2km, starting at the array 1
              for (key in arr) {

                var thisLat = arr[key][latKey];
                var thisLng = arr[key][lngKey];

                // If the distance between the current location and the current object is less than 1.4 km
                if (haversine(loc.lat, loc.lng, thisLat, thisLng) <= 1.4) {
                  var newObj = {
                    // type is the type gotten at this beginning of the array traversal
                    key: count,
                    type: dataType,
                    details: arr[key]
                  };


                  var iconURL = getIconURL(newObj.type);

                  count ++;

                  // the location as an object - after converting to numbers
                  var location = {
                    lat: parseFloat(thisLat),
                    lng: parseFloat(thisLng)
                  };

                  // Add the object the the array
                  filteredObjArr.push(newObj);

                  // console.log('LOCATION %o', location);
                  // Add a marker

                  addCustomMarker(location, map, newObj.key, iconURL);

                  
                  // If at the end

                } else {
                  // Next
                }
              }
              // newObj = haversine(pos.lat, pos.lng, res.data)
              // console.log(newObj);

              // Add the markers - reset filteredObjArr

              
              
              objArr.push(filteredObjArr);
              
              filteredObjArr = [];

              console.log ('DONE THIS ONE');
            });
      }
    
      console.log('return arr');
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
     function addMarker(location, map, key){

       var image = {
          url: './assets/location-pin.png',
          size: new google.maps.Size(100, 100),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(17, 34),
          scaledSize: new google.maps.Size(80, 80),

        };

       var marker = new google.maps.Marker({
         position: location,
         map: map,
         icon: image,
         id: key,
         zIndex: 100000
       });
       pointMarker = marker;
     }

     function addCustomMarker(location, map, key, url) {

      //  if(key < 10) {
      //  console.log('marker location: %o, %o', location, key);

       // The image for the marker
        // var image = {
        //   url: './assets/bus.svg',
        //   // This marker is 20 pixels wide by 32 pixels high.
        //   size: new google.maps.Size(20, 32),
        //   origin: new google.maps.Point(0, 0),
        //   anchor: new google.maps.Point(0, 32)
        // };

        if (key == 'clickable') {
          var image = {
          url: url,
          size: new google.maps.Size(100, 100),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(17, 34),
          scaledSize: new google.maps.Size(60, 60)
        };
        } else {
       var image = {
          url: url,
          size: new google.maps.Size(71, 71),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(17, 34),
          scaledSize: new google.maps.Size(30, 30)
        };
     }

       var marker = new google.maps.Marker({
         position: location,
         map: map,
        //  icon: './assets/Artboard 40.png',
         icon: image,
         id: key
       });

       if (marker.id == 'clickable') {
        marker.addListener('click', function() {
          console.log ('clicked');
          var modal = document.getElementById('myModal');
          modal.style.display = "block";
          grad.style.display = "block";
        });
       }

      //  console.log('HERE IS THE MARKER %o', marker);
      //  }
     }

     //Update the hidden coordinate boxes

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
                  // console.log('key found: ' + key);
                  return key;
                }
              } 
  }

  /**
   * Get the title of the dataset
   */
  function getDataSetTitle() {

  }

  /**
   * Get the data type from the title object
   * @param {Object} titleObj 
   */
  function getDataType(titleArr) {

    
    var title = titleArr[0];

    switch(title) {
      case 'Wifi Hotspot Name':
        return 'wifi';
      case 'HASTUS_ID':
        return 'bus';
      case 'HASTUS':
        return 'citycat';
      case 'Suburb':
        return 'citycycle';
      case 'library':
        return 'library';
      case 'Ward':
        return 'watertap';
      default:
        return 'clickable';
    }
  }

  /**
   * Get the icon url by the type of the data
   */
  function getIconURL(type) {
    var iconBase = './assets/';
    var iconFile;

    switch(type) {
      case 'citycat':
        return iconBase + 'Artboard 80.png';
      case 'citycycle':
        return iconBase + 'Artboard 20.png';
      case 'bus':
        return iconBase + 'Artboard 90.png';
      case 'watertap':
        return iconBase + 'Artboard 70.png';
      case 'wifi':
        return iconBase + 'Artboard 40.png';
      case 'clickable':
        return iconBase + 'location-pin.png';
        
    }
  }

  /**
   * A function to add in some bookable venues
   */
  function addVenues(map) {
    var venueArr = [
      {
        park: 'NEW FARM PARK',
        type: 'PICNIC BENCH/TABLE',
        description: 'Picnic table on slab',
        lat: -27.47061789,
        lng: 153.0528216
      },
      {
        park: 'NEW FARM PARK',
        type: 'PICNIC BENCH/TABLE',
        description: 'Picnic Setting - (Go for Gold)',
        lat: -27.47051454,
        lng: 153.0529955
      },
      {
        park: 'NEW FARM PARK',
        type: 'ROTUNDA/GAZEBO',
        description: 'Wedding Rotunda (Heitage Bandstand)',
        lat: -27.47021743,
        lng: 153.0525265
      },
      {
        park: 'NEW FARM PARK',
        type: 'SHADE STRUCTURE',
        description: 'Steel posts & Rainbow Z16 fabric - 10.5m x 3.5m',
        lat: -27.4711841,
        lng: 153.0518929
      },
      {
        park: 'NEW FARM PARK',
        type: 'PICNIC BENCH/TABLE',
        description: 'NUVOE',
        lat: -27.47108327,
        lng: 153.0518929
      }
    ];

    for (venue in venueArr) {
      var location = {
        lat: venueArr[venue].lat,
        lng: venueArr[venue].lng
      }; 

      addCustomMarker(location, map, 'clickable', './assets/location-pin.png');
    }
  }

  function modalPopup() {
    // Get the modal
    
    console.log('modal');

  }
