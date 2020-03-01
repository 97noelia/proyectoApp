import {Router} from 'express';
import {busquedasController} from '../controllers/busquedasController';

class BusquedasRoutes{
    public router: Router = Router();
    constructor(){
        this.config();
    }

    config():void{
        this.router.post('/', busquedasController.create);
    }
}

const busquedasRoutes = new BusquedasRoutes();
export default busquedasRoutes.router;