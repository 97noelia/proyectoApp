import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ServicioSeguridadService } from 'src/app/Servicios/servicio-seguridad.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GLoginUsuarioGuard implements CanActivate {
  constructor(private servicioSeg: ServicioSeguridadService, private router: Router){}
  canActivate(): boolean {
    if (this.servicioSeg.logIn()) {
      return true;
    }
    this.router.navigate(['login']);
    return false;
  }
}
