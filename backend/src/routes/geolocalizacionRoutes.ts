import {Router} from 'express';
import { geolocalizacionController } from '../controllers/geolocalizacionController';

class GeolocalizacionRoutes{
    public router: Router = Router();
    constructor(){
        this.config();
    }

    config():void{
        this.router.post('/', geolocalizacionController.readOne);
    }
}

const geolocalizacionRoutes = new GeolocalizacionRoutes();
export default geolocalizacionRoutes.router;