import express, {Application} from 'express';
const fileUpload = require('express-fileupload');
import indexRoutes from './routes/indexRoutes';
import usuariosRoutes from './routes/usuariosRoutes';
import tipoUsuarioRoutes from './routes/tipoUsuarioRoutes';
import busquedasRoutes from './routes/busquedasRoutes';
import usuarioUbicacionRoutes from './routes/usuarioUbicacionRoutes';
import geolocalizacionRoutes from './routes/geolocalizacionRoutes';
import morgan from 'morgan';
import cors from 'cors';

class Server{
    public app: Application;
    constructor(){
        this.app = express();
        this.app.use(fileUpload());
        this.config();
        this.routes();
    }

    config():void{
        this.app.set('port', process.env.PORT || 3000);
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(express.json());
    }

    routes(){
        this.app.use(indexRoutes);
        this.app.use('/usuarios', usuariosRoutes);
        this.app.use('/tipoUsuario', tipoUsuarioRoutes);
        this.app.use('/busquedas', busquedasRoutes);
        this.app.use('/ubicacion', usuarioUbicacionRoutes);
        this.app.use('/geolocalizacion', geolocalizacionRoutes);
        this.app.use('/geolocalizacion', geolocalizacionRoutes);
    }

    start(){
        this.app.listen(this.app.get('port'),()=>
            console.log('El servidor está escuchando en el puerto', this.app.get('port'))
        );
    }

}

const server = new Server();
server.start();