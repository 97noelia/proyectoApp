"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ubicacionUsuarioController_1 = require("../controllers/ubicacionUsuarioController");
class UsuarioUbicacionRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.post('/', ubicacionUsuarioController_1.usuarioUbicacionController.create);
    }
}
const usuarioUbicacionRoutes = new UsuarioUbicacionRoutes();
exports.default = usuarioUbicacionRoutes.router;
