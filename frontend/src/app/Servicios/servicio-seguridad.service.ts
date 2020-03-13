import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'angularx-social-login';

@Injectable({
  providedIn: 'root'
})
export class ServicioSeguridadService {
  constructor(private http: HttpClient, private authService: AuthService) { }

  logIn() {
    /* !! significa devuelveme si es true o false*/
    return !!localStorage.getItem('tokenGrupiCar');
  }

  logOut() {
    localStorage.removeItem('tokenGrupiCar');
  }

  getToken() {
    return localStorage.getItem('tokenGrupiCar');
  }
}
