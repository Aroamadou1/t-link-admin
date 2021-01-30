import { Injectable } from '@angular/core';

declare var google;

@Injectable({
  providedIn: 'root'
})
export class GoogleMapService {

  constructor() { }

  async direction(depart, destination, directionsRenderer, callback) {
    depart = new google.maps.LatLng(depart.latitude, depart.longitude);
    destination = new google.maps.LatLng(destination.latitude, destination.longitude);
    const route = {
      origin: depart,
      destination: destination,
      // unitSystem: google.maps.UnitSystem.METRIC,
      travelMode: 'DRIVING'

    }

    let   directionsService = new google.maps.DirectionsService();

    directionsService.route(route,
      (response, status) => { // anonymous function to capture directions
        if (status !== 'OK') {
          window.alert('Directions request failed due to ' + status);
          return;
        } else {
         directionsRenderer.setDirections(response); // Add route to the map
          var directionsData = response.routes[0].legs[0]; // Get data about the mapped route
          if (!directionsData) {
            window.alert('Directions request failed');
            return;
          }
          else {
            callback(directionsData);
            // document.getElementById('msg').innerHTML += " Driving distance is " + directionsData.distance.text + " (" + directionsData.duration.text + ").";
          }
        }
      });
  }

  async haversine_distance(mk1, mk2) {
    var R = 6371.0710; // Radius of the Earth in kilometerss
    var rlat1 = mk1.position.lat() * (Math.PI / 180); // Convert degrees to radians
    var rlat2 = mk2.position.lat() * (Math.PI / 180); // Convert degrees to radians
    var difflat = rlat2 - rlat1; // Radian difference (latitudes)
    var difflon = (mk2.position.lng() - mk1.position.lng()) * (Math.PI / 180); // Radian difference (longitudes)

    var d = 2 * R * Math.asin(Math.sqrt(Math.sin(difflat / 2) * Math.sin(difflat / 2) + Math.cos(rlat1) * Math.cos(rlat2) * Math.sin(difflon / 2) * Math.sin(difflon / 2)));
    return d;
  }


  async geocode(address, callback) {
    let geocoder: any = new google.maps.Geocoder();
    if (address) {
      geocoder.geocode({ 'address': address, language: 'fr' }, (results, status) => {
        if (status == 'OK') {
          var position = results[0].geometry.location
          callback({ latitude: position.lat(), longitude: position.lng() });
        } else {
          alert('Geocode was not successful for the following reason: ' + status);
        }
      });
    }
  }

  async reverseGeocode(lat, lng, callback) {
    let geocoder: any = new google.maps.Geocoder();
    let latlng = { lat: parseFloat(lat), lng: parseFloat(lng) };
    geocoder.geocode({ 'location': latlng }, (results, status) => {
      if (status === 'OK') {
        if (results[0]) {
          // let locationName = results[0].formatted_address;
          callback(results[0].formatted_address);

        } else {
          window.alert('No results found');
        }
      } else {
        // window.alert('Geocoder failed due to: ' + status);
      }
    });
  }
}
