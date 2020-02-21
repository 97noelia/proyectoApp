import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './componentes/home/home.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegistrarComponent } from './componentes/registrar/registrar.component';
import { MapaComponent } from './componentes/mapa/mapa.component';
import { MensajesComponent } from './componentes/mensajes/mensajes.component';
import { MiPerfilComponent } from './componentes/mi-perfil/mi-perfil.component';
import { ViajesComponent } from './componentes/viajes/viajes.component';
import { GLoginUsuarioGuard } from 'src/app/Servicios/g-login-usuario.guard';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'registrar',
    component: RegistrarComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'mapa',
    component: MapaComponent,
    canActivate: [GLoginUsuarioGuard]
  },
  {
    path: 'mensajes',
    component: MensajesComponent,
    canActivate: [GLoginUsuarioGuard]
  },
  {
    path: 'miPerfil',
    component: MiPerfilComponent,
    canActivate: [GLoginUsuarioGuard]
  },
  {
    path: 'viajes',
    component: ViajesComponent,
    canActivate: [GLoginUsuarioGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }



