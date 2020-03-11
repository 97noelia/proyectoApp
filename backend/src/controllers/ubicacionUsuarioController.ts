import { Request, Response } from 'express';
import pool from '../database';
var jwtD = require('jwt-simple');
//import * as jwt_decode from '../../node_modules/jwt-decode';
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const SECRET_KEY = 'MiClaveSecreta1234';


class UsuarioUbicacionController {
  index(req: Request, res: Response) {
    res.json({ 'message': 'Estás en usuarioUbicacion' });
  }

  public async create(req: Request, res: Response) {
    console.log(req.body);
    return;
    const respuesta = await pool.query('insert into usuario-ubicacion set ?', [req.body]);
    res.json(respuesta);
  }
}

export const usuarioUbicacionController = new UsuarioUbicacionController;