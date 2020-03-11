import { Request, Response } from 'express';
import pool from '../database';
import conexion from '../conexion';
import { Observable } from 'rxjs';
import FormData from "formdata-node";
const fileUpload = require('express-fileupload');

const jwtD = require('jwt-simple');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const SECRET_KEY = 'MiClaveSecreta1234';

var request = require("request");
const fs = require('fs');
var bodyParser = require('body-parser');


class UsuariosController {
    index(req: Request, res: Response) {
        res.json({ 'message': 'Estás en usuarios' });
    }

    public async create(req: Request, res: Response) {
        const usuario = req.body;
        if (req.files != null) {
            const foto = req.files.foto;
            const fecha = Math.random() * Date.now();
            const ruta = 'assets/' + fecha + foto.name;
            usuario.foto = ruta;

            fs.writeFile('../frontend/src/' + ruta, foto.data, function (err: any) {
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
        const email: String = usuario.email;
        const usuarioEncontrado = await pool.query('select * from usuario where email = ?', email);
        if (usuarioEncontrado.length == 0) {
            if (usuario.password) {
                usuario.password = bcrypt.hashSync(usuario.password);
                await pool.query('insert into usuario set ?', usuario);
                res.json({ "mensajeC": "Usuario insertado correctamente" });
            }
            else {
                console.log("he llegado");
                const insertado = await pool.query('insert into usuario set ?', usuario);
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


    }

    public async read(req: Request, res: Response) {
        const usuarios = await pool.query('select * from usuario', [req.body]);
        res.json(usuarios);
    }

    public async update(req: Request, res: Response) {
        await pool.query('update usuario set ? where id = ?', [req.params.id]);
    }

    public async delete(req: Request, res: Response) {
        await pool.query('delete from usuario where id = ?', [req.params.id]);
    }

    public async readOne(req: Request, res: Response) {
        console.log("He llegado aqui");
        console.log(req.params.usuario);
        const token = req.params.usuario;
        var decoded = jwtD.decode(token, SECRET_KEY);
        const usuario = decoded.usuario;
        const usuarioObtenido = await pool.query('select * from usuario where id = ?', usuario);
        console.log(usuarioObtenido[0].idUsuario);
        res.json(usuarioObtenido[0].idUsuario);
        console.log("voy a salir de aqui");
    }
    public async readLogin(req: Request, res: Response) {
        const usuario = req.body;
        const usuarioLogin = await pool.query('select * from usuario where login = ?', [usuario.login]);
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

    }

    public async sesionGoogle(req: Request, res: Response) {
        console.log(req.body);
        const id = req.body.id;
        const expiresIn = 24 * 60 * 60;
        console.log(id);
        const accessToken = jwt.sign({ usuario: id }, SECRET_KEY, { expiresIn: expiresIn });
        res.json(accessToken);
    }

}

export const usuariosController = new UsuariosController;