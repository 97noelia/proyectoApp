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
Object.defineProperty(exports, "__esModule", { value: true });
const fileUpload = require('express-fileupload');
var request = require("request");
class ImagenesController {
    index(req, res) {
        res.json({ 'message': 'Estás en usuarios' });
    }
    guardarImagen(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            try {
                if (!request.files) {
                    res.send({
                        status: false,
                        message: 'No file uploaded'
                    });
                }
                else {
                    console.log(request.files);
                    return;
                    //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
                    let imagen = request.files.avatar;
                    //Use the mv() method to place the file in upload directory (i.e. "uploads")
                    imagen.mv('./imagenes/' + imagen.name);
                    //send response
                    res.send({
                        status: true,
                        message: 'File is uploaded',
                        data: {
                            name: request.name,
                            mimetype: request.mimetype,
                            size: request.size
                        }
                    });
                }
            }
            catch (err) {
                res.status(500).send(err);
            }
        });
    }
}
exports.imagenesController = new ImagenesController;
