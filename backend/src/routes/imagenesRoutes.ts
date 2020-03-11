import {Router} from 'express';
import { imagenesController } from '../controllers/imagenesController';
//const fileUpload = require('express-fileupload');

class GeolocalizacionRoutes{
    public router: Router = Router();
    constructor(){
        this.config();
    }

    config():void{
        this.router.post('/', imagenesController.guardarImagen);
    }
}

const geolocalizacionRoutes = new GeolocalizacionRoutes();
export default geolocalizacionRoutes.router;