import { Request, Response } from 'express';
import conexion from '../conexion';
import { Observable } from 'rxjs';
const fileUpload = require('express-fileupload');
var request = require("request");

class ImagenesController {
    index(req: Request, res: Response) {
        res.json({ 'message': 'Estás en usuarios' });
    }

    public async guardarImagen(req: Request, res: Response) {
        console.log(req.body);
        try {
            if(!request.files) {
                res.send({
                    status: false,
                    message: 'No file uploaded'
                });
            } else {
                console.log(request.files);
                return;
                //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
                let imagen = request.files.avatar;
                
                //Use the mv() method to place the file in upload directory (i.e. "uploads")
                imagen.mv('./imagenes/' + imagen.name);
    
                //send response
                res.send({
                    status: true,
                    message: 'File is uploaded',
                    data: {
                        name: request.name,
                        mimetype: request.mimetype,
                        size: request.size
                    }
                });
            }
        } catch (err) {
            res.status(500).send(err);
        }
    }
}

export const imagenesController = new ImagenesController;