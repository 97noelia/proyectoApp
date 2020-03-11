import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GeolocalizacionModelo } from '../modelos/geolocalizacion';

@Injectable({
  providedIn: 'root'
})
export class GeolocalizacionServicioService {

  constructor(private http: HttpClient) { }

  getBusquedaGeo(latitud: any, longitud: any): Observable<any> {
    return this.http.post('http://localhost:3000/geolocalizacion', {latitud, longitud});
  }

}
