import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BusquedaModelo } from '../modelos/busquedas';

@Injectable({
  providedIn: 'root'
})
export class BusquedaServicioService {

  constructor(private http: HttpClient) { }

  saveBusqueda(busqueda: BusquedaModelo, token: any, lugarSalida: any): Observable<any> {
    console.log(busqueda);
    return this.http.post('http://localhost:3000/geolocalizacion', {busqueda, token, lugarSalida});
  }



}
