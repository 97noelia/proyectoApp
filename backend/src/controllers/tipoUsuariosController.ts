import {Request, Response} from 'express';
import pool from '../database';

class TipoUsuarioController{
    index(req:Request, res:Response){
        res.json({'message': 'Estás en tipo de usuarios'});
    }

    public async create(req:Request, res:Response){
        const respuesta = await pool.query('insert into tipo_usuario set ?', [req.body]);
        res.json(respuesta);//Poner comprobación de respuesta
    }

    public async delete(req:Request, res:Response){
        await pool.query('delete from tipo_usuario where id = ?', [req.params.id]);
    }

    public async readOne(req:Request, res:Response){
        const tipo = await pool.query('select * from tipo_usuario where id = ?', [req.params.id]);
        res.json(tipo);
    }
}

export const tipoUsuario = new TipoUsuarioController;