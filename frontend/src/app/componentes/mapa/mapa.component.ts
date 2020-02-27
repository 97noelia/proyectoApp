import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {
  private map: any;
  constructor() { }

  ngOnInit() {

  }

  ngAfterViewInit(): void {
    this.geolocalizar();



  }

  private initMap(latitud, longitud): void {
    this.map = L.map('map', {
      center: [latitud, longitud],
      zoom: 16
    });
  }

  private geolocalizar() {
    // Comprobamos si hay un objeto geolocation:
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const latitud = position.coords.latitude;
        const longitud = position.coords.longitude;
        // Inicializo el mapa
        this.initMap(latitud, longitud);
        // Se pinta
        const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
          attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        });

        tiles.addTo(this.map);
        this.marcaPosicion(latitud, longitud);
      });
    } else {
      alert('La geolocalización no está disponible');
    }
  }

  private marcaPosicion(latitud: any, longitud: any) {
    L.marker([latitud, longitud]).addTo(this.map);
  }

}
