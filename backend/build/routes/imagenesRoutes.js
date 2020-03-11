"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const imagenesController_1 = require("../controllers/imagenesController");
//const fileUpload = require('express-fileupload');
class GeolocalizacionRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.post('/', imagenesController_1.imagenesController.guardarImagen);
    }
}
const geolocalizacionRoutes = new GeolocalizacionRoutes();
exports.default = geolocalizacionRoutes.router;
