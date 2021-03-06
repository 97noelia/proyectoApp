"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
const usuario_servicio_service_1 = require("../../../frontend/src/app/Servicios/usuario-servicio.service");
var jwtD = require('jwt-simple');
//import * as jwt_decode from '../../node_modules/jwt-decode';
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const SECRET_KEY = 'MiClaveSecreta1234';
class UsuarioUbicacionController {
    constructor() {
        this.miUsuarioService = usuario_servicio_service_1.UsuarioServicioService;
    }
    index(req, res) {
        res.json({ 'message': 'Estás en usuarioUbicacion' });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            const token = req.body.token;
            try {
                var decoded = jwtD.decode(token, SECRET_KEY);
                const usuario = decoded.usuario;
                //Obtenemos el usuario que coincide con el del token
            }
            catch (err) {
                console.log(err);
            }
            return;
            const respuesta = yield database_1.default.query('insert into usuario-ubicacion set ?', [req.body]);
            res.json(respuesta);
        });
    }
}
exports.usuarioUbicacionController = new UsuarioUbicacionController;
