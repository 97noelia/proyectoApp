import { Component, OnInit } from '@angular/core';
import { UsuarioServicioService } from 'src/app/Servicios/usuario-servicio.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioModelo } from 'src/app/modelos/usuario';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent implements OnInit {

  public formRegistro: FormGroup;
  public miUsuario: UsuarioModelo;
  private fotoConvertida: any;

  constructor(private formBuilder: FormBuilder, private miUsuarioService: UsuarioServicioService, private router: Router) {
    this.formRegistro = formBuilder.group({
      tipo_usuario_idtipo_usuario: [1],
      nombre: ['', [Validators.required]],
      apellidos: ['', [Validators.required]],
      dni: ['', [Validators.required, Validators.pattern(/^(\d{8})([A-Z])$/)]],
      telefono: ['', [Validators.pattern(/^(\+34|0034|34)?[6|7|8|9][0-9]{8}$/)]],
      fecha_nacimiento: ['', [Validators.required]],
      foto: [''],
      email: ['', [Validators.pattern(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.([a-zA-Z]{2,4})+$/)]],
      login: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]{8,15}$/)]],
      carnet: [''],
      coche: ['']
    });
  }

  ngOnInit() {
  }

  submit() {
    /*console.log(this.formLogin.value);*/
    this.miUsuarioService.saveUsuario(this.formRegistro.value, JSON.stringify(this.fotoConvertida)).subscribe(
      res => {
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
                localStorage.setItem('token', res);
                location.href = ('mapa');
              }
            }
          );
        }
      },
      err => {
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
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
  /*
      reader.onload = (event: ProgressEvent) => {
        this.url = (<FileReader>event.target).result;
      }*/
      const archivo = event.target.files[0];
      console.log(archivo);
      reader.readAsDataURL(archivo);

      reader.onloadend = () => {
        this.fotoConvertida = reader.result;
        console.log(this.fotoConvertida);
      }
      
    }
    
  }

}
