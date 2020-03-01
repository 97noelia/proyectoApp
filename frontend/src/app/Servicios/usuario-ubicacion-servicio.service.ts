import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsuarioUbicacionModelo } from '../modelos/usuarioUbicacion';

@Injectable({
  providedIn: 'root'
})
export class UsuarioUbicacionServicioService {

  constructor(private http: HttpClient) { }
  saveUbicacion(ubicacionUsuario: any, token: any): Observable<any> {
    console.log(ubicacionUsuario);
    return this.http.post('http://localhost:3000/ubicacion', {ubicacionUsuario, token});
  }
}
