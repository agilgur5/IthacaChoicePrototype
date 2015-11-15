import Fetch from 'js/fetchHelpers.es6'
require('css/main.css')

const GAPIKey = 'AIzaSyAzNywrKiztz2tLzdCUOYh2YDJhfwpFkyM'
const GCalId = 'mo2ac36ucvgt08bu0hv2bhvr08%40group.calendar.google.com'
let isGMapsReady = false

Fetch('https://www.googleapis.com/calendar/v3/calendars/'+ GCalId +
  '/events?key=' + GAPIKey +
  '&timeMin=' + (new Date()).toISOString(), {}).then(([json, response]) => {
  let events = json.items
  waitForGMapsReady()
  function waitForGMapsReady () {
    if (!isGMapsReady) {
      setTimeout(10, waitForGMapsReady)
    } else {
      loadGoogleEvents(events)
    }
  }
})

window.initMap = function initMap () {
  isGMapsReady = true
}

function loadGoogleEvents (events) {
  console.log(events)
  // async require
  require('js/googleHelpers.es6').default(events)
}

function addMarker(lat, lng, db_string, title, listing_id) {
  var position = new google.maps.LatLng(lat, lng);
  
  var infoWindow = new google.maps.InfoWindow({
    content: contentString,
  })
  
  //For future reference, how to customize pins
  //var pinColor = 'FE7569';
  //var pinImage = new google.maps.MarkerImage('http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|' + pinColor,
  //    new google.maps.Size(21, 34),
  //    new google.maps.Point(0,0),
  //    new google.maps.Point(10, 34));
  //var pinShadow = new google.maps.MarkerImage('http://chart.apis.google.com/chart?chst=d_map_pin_shadow',
  //    new google.maps.Size(40, 37),
  //    new google.maps.Point(0, 0),
  //    new google.maps.Point(12, 35));
  
  var marker = new google.maps.Marker({
    position: position,
    //icon: pinImage,
    map: map,
    title: title
  })
  
  google.maps.event.addListener(marker, 'click', function() {
    if (current_window != null){
      current_window.close();
    }
    current_window = infoWindow;
    current_window.open(map,marker);
  })
  
  // $('#'+listing_id).click(function(){
  //   var elem = document.getElementsByClassName('current');
    
  //   if (elem[0] != null)
  //   { // if already clicked on then open the details page
  //     if (this === elem[0])
  //     { 
  //       this.href = '/listings/' + listing_id;
  //       window.location = this.href;
  //       return false;
  //     }
  //     // otherwise remove current and toggle with current
  //     else
  //     {
  //       $(elem[0]).removeClass('current');
  //     }
  //   }

  //   $(this).addClass('current');
    
  //   if (current_window != null){
  //     current_window.close();
  //   }
  //   current_window = infoWindow;
  //   current_window.open(map,marker);
  // });
}

