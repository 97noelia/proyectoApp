import { Request, Response } from 'express';
import pool from '../database';
import conexion from '../conexion';
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const SECRET_KEY = 'MiClaveSecreta1234';

class UsuariosController {
    index(req: Request, res: Response) {
        res.json({ 'message': 'Estás en usuarios' });
    }

    public async create(req: Request, res: Response) {
        const usuario = req.body;
        console.log(usuario.password);
        //console.log(bcrypt.hashSync(usuario.password));
        usuario.password = bcrypt.hashSync(usuario.password);
        console.log(usuario.password);
        await pool.query('insert into usuario set ?', usuario);
        res.json({ "mensaje": "Usuario insertado correctamente" });


        /*const crypto = require('crypto');
        usuario.password = crypto.createHmac('sha1', usuario.login).update(usuario.password).digest('hex');*/


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
        const usuario = await pool.query('select * from usuario where id = ?', [req.params.id]);
        res.json(usuario);
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
                const accessToken = jwt.sign({ idUsuario: usuario.usuario }, SECRET_KEY, { expiresIn: expiresIn });
                res.json(accessToken);
            }
            else {
                res.json({ "mensaje": "Usuario o contraseña incorrectos" });
            }
            
        }

    }

}

export const usuariosController = new UsuariosController;