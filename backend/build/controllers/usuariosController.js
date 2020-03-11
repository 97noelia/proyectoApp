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
const fileUpload = require('express-fileupload');
const jwtD = require('jwt-simple');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const SECRET_KEY = 'MiClaveSecreta1234';
var request = require("request");
const fs = require('fs');
var bodyParser = require('body-parser');
class UsuariosController {
    index(req, res) {
        res.json({ 'message': 'Estás en usuarios' });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuario = req.body;
            if (req.files != null) {
                const foto = req.files.foto;
                const fecha = Math.random() * Date.now();
                const ruta = 'assets/imagenes/' + fecha + foto.name;
                usuario.foto = ruta;
                fs.writeFile('../frontend/src/' + ruta, foto.data, function (err) {
                    if (err) {
                        return console.log(err);
                    }
                    else {
                        console.log("Ha sido guardado");
                    }
                });
            }
            console.log(usuario);
            console.log(usuario.email);
            const email = usuario.email;
            const usuarioEncontrado = yield database_1.default.query('select * from usuario where email = ?', email);
            if (usuarioEncontrado.length == 0) {
                if (usuario.password) {
                    usuario.password = bcrypt.hashSync(usuario.password);
                    yield database_1.default.query('insert into usuario set ?', usuario);
                    res.json({ "mensajeC": "Usuario insertado correctamente" });
                }
                else {
                    console.log("he llegado");
                    const insertado = yield database_1.default.query('insert into usuario set ?', usuario);
                    console.log(insertado.insertId);
                    const id = insertado.insertId;
                    res.json({ id });
                }
            }
            else {
                if (!usuario.password) {
                    const id = usuarioEncontrado[0].idUsuario;
                    res.json({ id });
                }
                else {
                    res.json({ "mensaje": "Ya hay un registro con ese usuario, intente con otro" });
                }
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
            console.log("He llegado aqui");
            console.log(req.params.usuario);
            const token = req.params.usuario;
            var decoded = jwtD.decode(token, SECRET_KEY);
            const usuario = decoded.usuario;
            const usuarioObtenido = yield database_1.default.query('select * from usuario where id = ?', usuario);
            console.log(usuarioObtenido[0].idUsuario);
            res.json(usuarioObtenido[0].idUsuario);
            console.log("voy a salir de aqui");
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
                    console.log(usuarioLogin[0].login);
                    const accessToken = jwt.sign({ usuario: usuarioLogin[0].id }, SECRET_KEY, { expiresIn: expiresIn });
                    res.json(accessToken);
                }
                else {
                    res.json({ "mensaje": "Usuario o contraseña incorrectos" });
                }
            }
        });
    }
    sesionGoogle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            const id = req.body.id;
            const expiresIn = 24 * 60 * 60;
            console.log(id);
            const accessToken = jwt.sign({ usuario: id }, SECRET_KEY, { expiresIn: expiresIn });
            res.json(accessToken);
        });
    }
}
exports.usuariosController = new UsuariosController;
