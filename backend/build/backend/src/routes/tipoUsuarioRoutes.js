"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuariosController_1 = require("../controllers/usuariosController");
class TipoUsuariosRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.post('/', usuariosController_1.usuariosController.create);
        this.router.delete('/:id', usuariosController_1.usuariosController.delete);
        this.router.get('/:id', usuariosController_1.usuariosController.readOne);
    }
}
const tipoUsuariosRoutes = new TipoUsuariosRoutes();
exports.default = tipoUsuariosRoutes.router;
