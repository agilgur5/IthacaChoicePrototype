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

// reveal hidden form and scroll down to it
document.getElementById('ithaca_choice_add_event').addEventListener('click', function(ev) {
  document.getElementById('ithaca_choice_add_event_hidden_form').className = ''
  document.getElementById('ithaca_choice_add_event_form').scrollIntoView()
})

function addMarker(lat, lng, db_string, title, listing_id) {
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
}

