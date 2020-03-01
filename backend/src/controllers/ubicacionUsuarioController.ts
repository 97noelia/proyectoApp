import {Request, Response} from 'express';
import pool from '../database';


class UsuarioUbicacionController{
    index(req:Request, res:Response){
        res.json({'message': 'Estás en usuarioUbicacion'});
    }

    public async create(req:Request, res:Response){
        console.log(req.body);
        return;
        const respuesta = await pool.query('insert into usuario-ubicacion set ?', [req.body]);
        res.json(respuesta);
    }
}

export const usuarioUbicacionController = new UsuarioUbicacionController;