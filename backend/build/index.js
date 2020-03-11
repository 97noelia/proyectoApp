"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fileUpload = require('express-fileupload');
const indexRoutes_1 = __importDefault(require("./routes/indexRoutes"));
const usuariosRoutes_1 = __importDefault(require("./routes/usuariosRoutes"));
const tipoUsuarioRoutes_1 = __importDefault(require("./routes/tipoUsuarioRoutes"));
const busquedasRoutes_1 = __importDefault(require("./routes/busquedasRoutes"));
const usuarioUbicacionRoutes_1 = __importDefault(require("./routes/usuarioUbicacionRoutes"));
const geolocalizacionRoutes_1 = __importDefault(require("./routes/geolocalizacionRoutes"));
const imagenesRoutes_1 = __importDefault(require("./routes/imagenesRoutes"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
class Server {
    constructor() {
        this.app = express_1.default();
        this.app.use(fileUpload());
        this.config();
        this.routes();
    }
    config() {
        this.app.set('port', process.env.PORT || 3000);
        this.app.use(morgan_1.default('dev'));
        this.app.use(cors_1.default());
        this.app.use(express_1.default.json());
    }
    routes() {
        this.app.use(indexRoutes_1.default);
        this.app.use('/usuarios', usuariosRoutes_1.default);
        this.app.use('/tipoUsuario', tipoUsuarioRoutes_1.default);
        this.app.use('/busquedas', busquedasRoutes_1.default);
        this.app.use('/ubicacion', usuarioUbicacionRoutes_1.default);
        this.app.use('/geolocalizacion', geolocalizacionRoutes_1.default);
        this.app.use('/geolocalizacion', geolocalizacionRoutes_1.default);
        this.app.use('/imagenes', imagenesRoutes_1.default);
    }
    start() {
        this.app.listen(this.app.get('port'), () => console.log('El servidor está escuchando en el puerto', this.app.get('port')));
    }
}
const server = new Server();
server.start();
