import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServicioSeguridadService {

  constructor(private http: HttpClient) { }

  logIn() {
    /* !! significa devuelveme si es true o false*/
    return !!localStorage.getItem('token');
  }

  logOut() {
    localStorage.removeItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }
}
