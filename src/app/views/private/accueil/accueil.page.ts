import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DataFirestoreService } from 'src/app/services';
import { ApiSocketService } from 'src/app/services/api/api-socket.service';

declare var google;
@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.page.html',
  styleUrls: ['./accueil.page.scss'],
})
export class AccueilPage implements OnInit {

  nbreClient: number;
  nbreCoursier: number;
  nbreAdmin: number;
  coursiers: any[] = [];
  revenu: number;



  @ViewChild('map', {static: false}) mapElement: ElementRef;
  map: any;
  markers = [];

  constructor(
    private apiSocket: ApiSocketService
  ) { }

  ngOnInit() {
    DataFirestoreService.clients.subscribe(
      res => this.nbreClient = res.length
    );
    DataFirestoreService.coursiers.subscribe(
      res => {
        this.coursiers = res;
        this.nbreCoursier = res.length;
      }
    );
    DataFirestoreService.admins.subscribe(
      res => this.nbreAdmin = res.length
    );
  }

  ngAfterViewInit() {
    this.loadMap();
    this.apiSocket.get('position').subscribe(
      (res: any[]) => {
        console.log(res);
        if (res.length > 0) {
          this.updateMap(res);
        }
      }
    )
  }

  loadMap() {
    let latLng = new google.maps.LatLng(6.204044, 1.268329);

    let mapOptions = {
      center: latLng,
      zoom: 13,
      mapeTypeId: google.maps.MapTypeId.ROADMAP
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
  }

  updateMap(locations) {
    let url = "http://earth.google.com/images/kml-icons/track-directional/track-1.png";

    this.markers = [];
    for (let loc of locations) {
      let coursier = this.coursiers.find(item => item.id === loc.id);
      let latLng = new google.maps.LatLng(loc.latitude, loc.longitude);
      let marker = new google.maps.Marker({
        position: latLng,
        animation: false,
        map:this.map,
        icon: url,
        // title: coursier.data.nom+ ' '+ coursier.data.prenom
      });
      this.markers[0] = marker;
    } 
  }

}
