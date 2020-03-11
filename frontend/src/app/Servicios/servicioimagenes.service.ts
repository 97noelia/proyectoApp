import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicioimagenesService {

  constructor(private http: HttpClient) { }
  guardarImagen(imagen: File): Observable<any> {
    console.log(imagen);
    return this.http.post('http://localhost:3000/imagenes', JSON.stringify(imagen));
  }
}
