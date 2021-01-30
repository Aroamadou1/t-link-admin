import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
declare var google;

@Injectable({
  providedIn: 'root'
})
export class DirectionService {
  constructor() { }

  async call(depart, destination, directionsRenderer, callback) {
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


  // addRoad(positions) {

  //   let road = new google.maps.Polyline({
  //     path: positions,
  //     // geodesic: true,
  //     strokeColor: '#FF0000',
  //     strokeOpacity: 1.0,
  //     strokeWeight: 2
  //   });

  //   road.setMap(this.map);
  // }

}