"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
class GeolocalizacionController {
    readOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("estoy en geolocalizacion");
            const latitud = req.body.latitud;
            const longitud = req.body.longitud;
            console.log(req.body.latitud);
            console.log(req.body.longitud);
            const geolocalizacion = yield database_1.default.query('select * from geolocalizacion where latitud = ? and longitud = ?', [req.body.latitud, req.body.longitud]);
            console.log(geolocalizacion);
            //res.json(geolocalizacion);
        });
    }
}
exports.geolocalizacionController = new GeolocalizacionController;
