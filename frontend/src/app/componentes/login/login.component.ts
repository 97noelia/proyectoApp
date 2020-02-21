import { Component, OnInit } from '@angular/core';
import { UsuarioServicioService } from 'src/app/Servicios/usuario-servicio.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioModelo } from 'src/app/modelos/usuario';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public formLogin: FormGroup;
  public miUsuario: UsuarioModelo;

  constructor(private formBuilder: FormBuilder, private miUsuarioService: UsuarioServicioService, private router: Router) {
    this.formLogin = formBuilder.group({
      login: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit() {
  }

  submit() {
    /*console.log(this.formLogin.value);*/
    this.miUsuarioService.readLogin(this.formLogin.value).subscribe(
      res => {
        /*console.log(res);*/
        if (res.mensaje) {
          document.getElementById("mensaje").innerText = res.mensaje;
        }
        else {
          localStorage.setItem('token', res);
          location.href = ('mapa');
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  get login() {
    return this.formLogin.get('login');
  }
  get password() {
    return this.formLogin.get('password');
  }


}
