"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
let UsuarioServicioService = class UsuarioServicioService {
    constructor(http) {
        this.http = http;
    }
    getUsuarios() {
        return this.http.get('http://localhost:3000/usuarios');
    }
    getUsuario(usuario) {
        return this.http.get('http://localhost:3000/usuarios/${usuario}');
    }
    saveUsuario(usuario, foto) {
        console.log(usuario);
        return this.http.post('http://localhost:3000/usuarios', { usuario, foto });
    }
    deleteUsuario(id) {
        return this.http.delete('http://localhost:3000/usuarios/${id}');
    }
    updateUsuario(id, usuario) {
        return this.http.put('http://localhost:3000/usuarios/${id}', usuario);
    }
    readLogin(usuario) {
        return this.http.post('http://localhost:3000/usuarios/login', usuario);
    }
};
UsuarioServicioService = __decorate([
    core_1.Injectable({
        providedIn: 'root'
    })
], UsuarioServicioService);
exports.UsuarioServicioService = UsuarioServicioService;
