"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const busquedasController_1 = require("../controllers/busquedasController");
class BusquedasRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.post('/', busquedasController_1.busquedasController.create);
    }
}
const busquedasRoutes = new BusquedasRoutes();
exports.default = busquedasRoutes.router;
