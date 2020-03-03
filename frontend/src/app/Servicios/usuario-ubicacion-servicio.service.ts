import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsuarioUbicacionModelo } from '../modelos/usuarioUbicacion';

@Injectable({
  providedIn: 'root'
})
export class UsuarioUbicacionServicioService {

  constructor(private http: HttpClient) { }
  saveUbicacion(latitud: any, longitud:any, token: any): Observable<any> {
    console.log(latitud);
    console.log(longitud);
    return this.http.post('http://localhost:3000/ubicacion', {latitud, longitud, token});
  }
}
