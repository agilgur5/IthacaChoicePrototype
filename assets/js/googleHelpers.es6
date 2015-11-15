const centroid = [42.4386350, -76.49897790] // Downtown
const mapOptions = {
  center: new google.maps.LatLng(centroid[0], centroid[1]),
  zoom: 14,
  mapTypeId: google.maps.MapTypeId.ROADMAP
}

let map = new google.maps.Map(document.getElementById('ithaca_choice_map_canvas'), mapOptions)
let GeoCoder = new google.maps.Geocoder()
let infoWindow = new google.maps.InfoWindow()
let bounds = new google.maps.LatLngBounds()

function geocodeAddress (address, callback) {
  console.log(address)
  GeoCoder.geocode({ address: address }, function (results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      callback(results[0].geometry.location)
    } else {
      console.error('Google Maps error')
      console.error(status)
      callback(null)
    }
  })
}
function createMarker (latLng, description, summary, index) {
  let marker = new google.maps.Marker({
    position: new google.maps.LatLng(latLng.lat(), latLng.lng()),
    map: map,
    title: summary
  })

  let contentString = '<div style=\'overflow-x: hidden;overflow-y:auto;\'>'
  let braceArr = description.split('{')
  console.log(braceArr)
  if (braceArr.length > 1) {
    let urls = JSON.parse('{' + braceArr[braceArr.length - 1]) // take last element
    if (urls.imageURL) {
      contentString += '<img src=\'' + urls.imageURL + '\' height=\'200\' />'
      contentString += '<br />'
    }
    contentString += braceArr[0].split('\n').join('<br />')
    if (urls.videoURL) {
      contentString += '<video src=\'' + urls.videoURL + '\' height=\'200\' autoplay></video>'
      contentString += '<br />'
    }
  } else {
    contentString += braceArr[0].split('\n').join('<br />')
  }
  contentString += '</div>'

  google.maps.event.addListener(marker, 'click', function() {
    infoWindow.setContent(contentString); 
    infoWindow.open(map, marker);
  })

  // edit calendar
  //document.getElementsByClassName('event-description')[index].innerHTML = contentString

  bounds.extend(marker.position)
  map.fitBounds(bounds)
}


export default function (events) {
  events.forEach(function(event, index) {
    geocodeAddress(event.location, (latLng) => {
      if (latLng == null) { 
        console.error('latLng was falsey')
        return
      } 
      createMarker(latLng, event.description, event.summary, index)
    })
  })
}
