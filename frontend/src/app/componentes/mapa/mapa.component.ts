import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { BusquedaServicioService } from 'src/app/Servicios/busqueda-servicio.service';
import { UsuarioServicioService } from 'src/app/Servicios/usuario-servicio.service';
import { UsuarioUbicacionServicioService } from 'src/app/Servicios/usuario-ubicacion-servicio.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BusquedaModelo } from 'src/app/modelos/busquedas';
import { ServicioSeguridadService } from 'src/app/Servicios/servicio-seguridad.service';
import { GeolocalizacionServicioService } from 'src/app/Servicios/geolocalizacion-servicio.service';
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
  private latitud: any;
  private longitud: any;
  private token: any;
  constructor(private formBuilder: FormBuilder, private ubicacionService: UsuarioUbicacionServicioService,
              private busquedaService: BusquedaServicioService, private router: Router,
              private servicioUsuario: UsuarioServicioService, private serSeg: ServicioSeguridadService,
              private servicioGeolocalizacion: GeolocalizacionServicioService) {
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

  private initMap(): void {
    this.map = L.map('map', {
      center: [this.latitud, this.longitud],
      zoom: 16
    });
  }

  private geolocalizar() {
    // Comprobamos si hay un objeto geolocation:
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitud = position.coords.latitude;
        this.longitud = position.coords.longitude;
        console.log("llego");
        console.log(this.cogerToken());
        const usuario = this.cogerToken();
        console.log("llego2");
        /*this.servicioGeolocalizacion.getBusquedaGeo(this.latitud, this.longitud).subscribe(
          res => {
            console.log(res);
            return res;
          },
          err => {
            console.log(err);
            
          }
        );*/
        //console.log(geolocalización);
        this.ubicacionService.saveUbicacion(this.latitud, this.longitud, this.cogerToken(), 'geolocalizacion').subscribe(
          res => {
            console.log(res);
          },
          err => {
            console.log(err);
          }
        );
        // Inicializo el mapa
        this.initMap();
        // Se pinta
        const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
          attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        });

        tiles.addTo(this.map);
        this.marcaPosicion(this.latitud, this.longitud);
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
    console.log("estoy aqui");
    return;
    this.token = localStorage.getItem('tokenGrupiCar');
    console.log(this.token);
    this.servicioUsuario.getUsuario(this.token).subscribe(
      res => {
        console.log(res);
        return res;
      },
      err => {
        console.log(err);
        alert('ha ocurrido un error');
      }
    );
  }

  submit() {
    this.busquedaService.saveBusqueda(this.formMapa.value, this.token, this.latitud + this.longitud).subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log(err);
      }
    );
  }

}
