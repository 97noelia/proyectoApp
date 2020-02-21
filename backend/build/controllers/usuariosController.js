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
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const SECRET_KEY = 'MiClaveSecreta1234';
class UsuariosController {
    index(req, res) {
        res.json({ 'message': 'Estás en usuarios' });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuario = req.body;
            const usuarioEncontrado = yield database_1.default.query('select * from usuario where login = ?', [usuario.login]);
            if (usuarioEncontrado.length == 0) {
                usuario.password = bcrypt.hashSync(usuario.password);
                yield database_1.default.query('insert into usuario set ?', usuario);
                res.json({ "mensajeC": "Usuario insertado correctamente" });
            }
            else {
                res.json({ "mensaje": "Ya hay un registro con ese usuario, intente con otro" });
            }
        });
    }
    read(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuarios = yield database_1.default.query('select * from usuario', [req.body]);
            res.json(usuarios);
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('update usuario set ? where id = ?', [req.params.id]);
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('delete from usuario where id = ?', [req.params.id]);
        });
    }
    readOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuario = yield database_1.default.query('select * from usuario where id = ?', [req.params.id]);
            res.json(usuario);
        });
    }
    readLogin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuario = req.body;
            const usuarioLogin = yield database_1.default.query('select * from usuario where login = ?', [usuario.login]);
            if (usuarioLogin.length == 0) {
                res.json({ "mensaje": "Usuario o contraseña incorrectos" });
            }
            else {
                if (bcrypt.compareSync(usuario.password, usuarioLogin[0].password)) {
                    const expiresIn = 24 * 60 * 60;
                    const accessToken = jwt.sign({ idUsuario: usuario.usuario }, SECRET_KEY, { expiresIn: expiresIn });
                    res.json(accessToken);
                }
                else {
                    res.json({ "mensaje": "Usuario o contraseña incorrectos" });
                }
            }
        });
    }
}
exports.usuariosController = new UsuariosController;
