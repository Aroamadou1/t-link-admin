import { Injectable } from '@angular/core';

declare var google;

@Injectable({
  providedIn: 'root'
})

export class GeocoderService {

  constructor() { }

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
