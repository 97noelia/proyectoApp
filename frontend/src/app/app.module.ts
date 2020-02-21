import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HomeComponent } from './componentes/home/home.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegistrarComponent } from './componentes/registrar/registrar.component';
import { BarraNavegacion1Component } from './componentes/barra-navegacion1/barra-navegacion1.component';
import { MapaComponent } from './componentes/mapa/mapa.component';
import { ViajesComponent } from './componentes/viajes/viajes.component';
import { MensajesComponent } from './componentes/mensajes/mensajes.component';
import { MiPerfilComponent } from './componentes/mi-perfil/mi-perfil.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegistrarComponent,
    BarraNavegacion1Component,
    MapaComponent,
    ViajesComponent,
    MensajesComponent,
    MiPerfilComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
