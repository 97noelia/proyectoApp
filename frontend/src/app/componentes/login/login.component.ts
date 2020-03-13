import { Component, OnInit } from '@angular/core';
import { UsuarioServicioService } from 'src/app/Servicios/usuario-servicio.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioModelo } from 'src/app/modelos/usuario';
import { Router } from '@angular/router';
import { AuthService, GoogleLoginProvider, SocialUser } from 'angularx-social-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public formLogin: FormGroup;
  public miUsuario: UsuarioModelo;
  private user: SocialUser = null;
  private loggedIn: boolean;

  constructor(private formBuilder: FormBuilder, private miUsuarioService: UsuarioServicioService,
              private router: Router, private authService: AuthService) {
    this.formLogin = formBuilder.group({
      login: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit() {
  }

  submit() {
    this.miUsuarioService.readLogin(this.formLogin.value).subscribe(
      res => {
        /*console.log(res);*/
        if (res.mensaje) {
          document.getElementById('mensaje').innerText = res.mensaje;
        }
        else {
          localStorage.setItem('tokenGrupiCar', res);
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

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    this.authService.authState.subscribe((user) => {
      this.user = user;
      if (this.user != null) {
        const usuario = {
          nombre: this.user.firstName, apellidos: this.user.lastName,
          email: this.user.email, foto: this.user.photoUrl, tipo_usuario_idtipo_usuario: 1
        }
        this.miUsuarioService.saveUsuario(usuario).subscribe(
          res => {
            console.log(res);
            const id = res;
            this.miUsuarioService.readLoginGmail(id).subscribe(
              res2 => {
                console.log(res2);
                localStorage.setItem('tokenGrupiCar', res2);
                location.href = ('mapa');
              },
              err => {
                console.log(err);
              }
            );
          },
          err => {
            console.log(err);
          }
        );
      }
    });
  }

}
