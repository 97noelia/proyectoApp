import { Request, Response } from 'express';
import pool from '../database';
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const SECRET_KEY = 'MiClaveSecreta1234';


class UsuarioUbicacionController {
    index(req: Request, res: Response) {
        res.json({ 'message': 'Estás en usuarioUbicacion' });
    }

    public async create(req: Request, res: Response) {
        console.log(req.body);
        const token = req.body.token;
        try {
          const decoded = jwt.decode(token, SECRET_KEY);
          console.log("decoded " + Object.values(decoded));
        } catch(err) {
            console.log(err);
        }
        return;
        const respuesta = await pool.query('insert into usuario-ubicacion set ?', [req.body]);
        res.json(respuesta);
    }
}

export const usuarioUbicacionController = new UsuarioUbicacionController;