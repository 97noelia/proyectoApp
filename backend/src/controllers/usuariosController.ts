import {Request, Response} from 'express';
import pool from '../database';
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const SECRET_KEY = 'MiClaveSecreta1234';

class UsuariosController{
    index(req:Request, res:Response){
        res.json({'message': 'Estás en usuarios'});
    }

    public async create(req:Request, res:Response){
        const usuario = req.body;
        const crypto = require('crypto');
        usuario.password = crypto.createHmac('sha1', usuario.login).update(usuario.password).digest('hex');
        
        const respuesta = await pool.query('insert into usuario set ?', usuario);
        res.json({"mensaje": "Usuario insertado correctamente"});//Poner comprobación de respuesta
    }

    public async read(req:Request, res:Response){
        const usuarios = await pool.query('select * from usuario', [req.body]);
        res.json(usuarios);
    }

    public async update(req:Request, res:Response){
        await pool.query('update usuario set ? where id = ?', [req.params.id]);
    }

    public async delete(req:Request, res:Response){
        await pool.query('delete from usuario where id = ?', [req.params.id]);
    }

    public async readOne(req:Request, res:Response){
        const usuario = await pool.query('select * from usuario where id = ?', [req.params.id]);
        res.json(usuario);
    }
    public async readLogin(req:Request, res:Response){
        const usuario = req.body;
        const crypto = require('crypto');
        usuario.password = crypto.createHmac('sha1', usuario.login).update(usuario.password).digest('hex');
        const usuarioLogin = await pool.query('select * from usuario where login = ? and password = ?', [usuario.login, usuario.password]);
        if(usuarioLogin.length == 0){
            res.json({"mensaje": "Usuario o contraseña incorrectos"});
        }
        else{
            const expiresIn = 24*60*60;
            const accessToken = jwt.sign({idUsuario: usuario.usuario}, SECRET_KEY, {expiresIn: expiresIn});
            console.log(accessToken);
            res.json(accessToken);
        }
        
    }

}

export const usuariosController = new UsuariosController;