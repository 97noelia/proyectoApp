"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const geolocalizacionController_1 = require("../controllers/geolocalizacionController");
class GeolocalizacionRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.post('/', geolocalizacionController_1.geolocalizacionController.readOne);
    }
}
const geolocalizacionRoutes = new GeolocalizacionRoutes();
exports.default = geolocalizacionRoutes.router;
