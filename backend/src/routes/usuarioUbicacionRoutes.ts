import {Router} from 'express';
import {usuarioUbicacionController} from '../controllers/ubicacionUsuarioController';

class UsuarioUbicacionRoutes{
    public router: Router = Router();
    constructor(){
        this.config();
    }

    config():void{
        this.router.post('/', usuarioUbicacionController.create);
    }
}

const usuarioUbicacionRoutes = new UsuarioUbicacionRoutes();
export default usuarioUbicacionRoutes.router;