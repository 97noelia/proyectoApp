import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsuarioModelo } from '../modelos/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioServicioService {

  constructor(private http: HttpClient) { }

  getUsuarios(): Observable<any> {
    return this.http.get('http://localhost:3000/usuarios');
  }

  getUsuario(id: string): Observable<any> {
    return this.http.get('http://localhost:3000/usuarios/${id}');
  }

  saveUsuario(usuario: UsuarioModelo): Observable<any> {
    console.log(usuario);
    return this.http.post('http://localhost:3000/usuarios', usuario);
  }

  deleteUsuario(id: string): Observable<any> {
    return this.http.delete('http://localhost:3000/usuarios/${id}');
  }
  updateUsuario(id: string, usuario: UsuarioModelo): Observable<any> {
    return this.http.put('http://localhost:3000/usuarios/${id}', usuario);
  }
  readLogin(usuario: UsuarioModelo): Observable <any>{
    return this.http.post('http://localhost:3000/usuarios/login', usuario);
  }


}
