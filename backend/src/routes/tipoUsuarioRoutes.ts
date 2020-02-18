import {Router} from 'express';
import {usuariosController} from '../controllers/usuariosController';

class TipoUsuariosRoutes{
    public router: Router = Router();
    constructor(){
        this.config();
    }

    config():void{
        this.router.post('/', usuariosController.create);
        this.router.delete('/:id', usuariosController.delete);
        this.router.get('/:id', usuariosController.readOne);
    }
}

const tipoUsuariosRoutes = new TipoUsuariosRoutes();
export default tipoUsuariosRoutes.router;