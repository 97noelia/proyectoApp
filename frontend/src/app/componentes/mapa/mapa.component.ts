import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { BusquedaServicioService } from 'src/app/Servicios/busqueda-servicio.service';
import { UsuarioUbicacionServicioService } from 'src/app/Servicios/usuario-ubicacion-servicio.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BusquedaModelo } from 'src/app/modelos/busquedas';
import { UsuarioUbicacionModelo } from 'src/app/modelos/usuarioUbicacion';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {
  private map: any;
  public formMapa: FormGroup;
  public miBusqueda: BusquedaModelo;
  private salida: any;
  private token: any;
  constructor(private formBuilder: FormBuilder, private ubicacionService: UsuarioUbicacionServicioService,
              private busquedaService: BusquedaServicioService, private router: Router) {
    this.formMapa = formBuilder.group({
      lugar_llegada: ['', [Validators.required]],
      fecha: ['', [Validators.required]],
      hora_salida: ['', [Validators.required]],
      hora_llegada: ['', [Validators.required]],
    });
  }

  ngOnInit() {

  }

  ngAfterViewInit(): void {
    this.geolocalizar();
  }

  private initMap(latitud: any, longitud: any): void {
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
        this.salida = latitud + ' ' + longitud;
        this.cogerToken();
        this.ubicacionService.saveUbicacion(this.salida, this.token).subscribe(
          res => {
            console.log(res);
          },
          err => {
            console.log(err);
          }
        );
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

  get lugar_llegada() {
    return this.formMapa.get('lugar_llegada');
  }

  get hora_salida() {
    return this.formMapa.get('hora_salida');
  }

  get hora_llegada() {
    return this.formMapa.get('hora_llegada');
  }

  cogerToken() {
    this.token = localStorage.getItem('tokenGrupiCar');
  }
  submit() {
    this.busquedaService.saveBusqueda(this.formMapa.value, this.token, this.salida).subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log(err);
      }
    );
  }

}
