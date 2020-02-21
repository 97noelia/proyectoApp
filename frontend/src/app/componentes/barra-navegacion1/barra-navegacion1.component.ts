import { Component, OnInit } from '@angular/core';
import {ServicioSeguridadService} from 'src/app/Servicios/servicio-seguridad.service';

@Component({
  selector: 'app-barra-navegacion1',
  templateUrl: './barra-navegacion1.component.html',
  styleUrls: ['./barra-navegacion1.component.css']
})
export class BarraNavegacion1Component implements OnInit {

  constructor(public servicioSeg: ServicioSeguridadService) { }

  ngOnInit() {
  }

}
