import { Request, Response } from 'express';
import pool from '../database';

class GeolocalizacionController {
    public async readOne(req: Request, res: Response) {
        console.log("estoy en geolocalizacion");
        const latitud = req.body.latitud;
        const longitud = req.body.longitud;
        console.log(req.body.latitud);
        console.log(req.body.longitud);
        const geolocalizacion = await pool.query('select * from geolocalizacion where latitud = ? and longitud = ?', 
        [req.body.latitud, req.body.longitud]);
        console.log(geolocalizacion);
        //res.json(geolocalizacion);
    }
}

export const geolocalizacionController = new GeolocalizacionController;