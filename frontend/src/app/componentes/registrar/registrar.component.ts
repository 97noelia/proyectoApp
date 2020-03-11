import { Component, OnInit } from '@angular/core';
import { UsuarioServicioService } from 'src/app/Servicios/usuario-servicio.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioModelo } from 'src/app/modelos/usuario';
import { Router } from '@angular/router';
import { ThrowStmt } from '@angular/compiler';
import { ServicioimagenesService } from 'src/app/Servicios/servicioimagenes.service';
import { EventEmitter } from 'protractor';
import { ImageUploaderOptions, FileQueueObject } from 'ngx-image-uploader';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent implements OnInit {

  public formRegistro: FormGroup;
  public miUsuario: UsuarioModelo;
  private fotoCogida: any;

  constructor(private formBuilder: FormBuilder, private miUsuarioService: UsuarioServicioService,
    private router: Router, private servicioImagen: ServicioimagenesService) {
    //this.fotoCogida = new FormData();
    this.formRegistro = formBuilder.group({
      tipo_usuario_idtipo_usuario: [1],
      nombre: ['', [Validators.required]],
      apellidos: ['', [Validators.required]],
      dni: ['', [Validators.required, Validators.pattern(/^(\d{8})([A-Z])$/)]],
      telefono: ['', [Validators.pattern(/^(\+34|0034|34)?[6|7|8|9][0-9]{8}$/)]],
      fecha_nacimiento: ['', [Validators.required]],
      foto: [''],
      email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.([a-zA-Z]{2,4})+$/)]],
      login: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]{8,15}$/)]],
      carnet: [''],
      coche: ['']
    });
  }

  ngOnInit() {
  }

  submit() {
    const formData = new FormData();
    formData.append('nombre', this.formRegistro.get('nombre').value);
    formData.append('apellidos', this.formRegistro.get('apellidos').value);
    formData.append('tipo_usuario_idtipo_usuario', this.formRegistro.get('tipo_usuario_idtipo_usuario').value);
    formData.append('dni', this.formRegistro.get('dni').value);
    formData.append('telefono', this.formRegistro.get('telefono').value);
    formData.append('fecha_nacimiento', this.formRegistro.get('fecha_nacimiento').value);
    formData.append('foto', this.fotoCogida);
    formData.append('email', this.formRegistro.get('email').value);
    formData.append('login', this.formRegistro.get('login').value);
    formData.append('password', this.formRegistro.get('password').value);
    formData.append('carnet', this.formRegistro.get('carnet').value);
    formData.append('coche', this.formRegistro.get('coche').value);


    this.miUsuarioService.saveUsuario(formData).subscribe(
      res => {
        console.log(res);
        if (res.mensaje) {
          document.getElementById('mensaje').innerText = res.mensaje;
        }
        else {
          this.miUsuarioService.readLogin(this.formRegistro.value).subscribe(
            res => {
              if (res.mensaje) {
                document.getElementById('mensaje').innerText = res.mensaje;
              }
              else {
                localStorage.setItem('tokenGrupiCar', res);
                location.href = ('mapa');
              }
            }
          );
        }
      },
      err => {
        console.log(err);
        return;
        console.log(err);
      }
    );
  }

  get nombre() {
    return this.formRegistro.get('nombre');
  }
  get apellidos() {
    return this.formRegistro.get('apellidos');
  }
  get dni() {
    return this.formRegistro.get('dni');
  }
  get telefono() {
    return this.formRegistro.get('telefono');
  }
  get fecha_nacimiento() {
    return this.formRegistro.get('fecha_nacimiento');
  }
  get foto() {
    return this.formRegistro.get('foto');
  }
  get email() {
    return this.formRegistro.get('email');
  }
  get login() {
    return this.formRegistro.get('login');
  }
  get password() {
    return this.formRegistro.get('password');
  }
  get carnet() {
    return this.formRegistro.get('carnet');
  }
  get coche() {
    return this.formRegistro.get('coche');
  }

  private convertirFoto(event: any) {
    if (event.target.files.length > 0) {
      this.fotoCogida = event.target.files[0];
      console.log(this.fotoCogida);
    }
  }

}
