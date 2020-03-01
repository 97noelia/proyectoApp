import {Request, Response} from 'express';
import pool from '../database';


class BusquedasController{
    index(req:Request, res:Response){
        res.json({'message': 'Estás en búsquedas'});
    }

    public async create(req:Request, res:Response){
        console.log(req.body);
        return;
        const respuesta = await pool.query('insert into búsquedas set ?', [req.body]);
        res.json(respuesta);
    }
}

export const busquedasController = new BusquedasController;