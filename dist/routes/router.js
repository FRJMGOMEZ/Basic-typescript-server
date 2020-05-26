"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const server_1 = __importDefault(require("../classes/server"));
exports.router = express_1.Router();
exports.router.get('/messages', (req, res) => {
    res.json({
        ok: true,
        message: 'Everything is ok'
    });
});
exports.router.post('/message', (req, res) => {
    const message = req.body.message;
    const id = req.body.id;
    const server = server_1.default.instance;
    if (message.isPrivated) {
        server.io.in(id).emit('private-message', message);
    }
    else {
        server.io.emit('public-message', message);
    }
    res.json({
        ok: true,
        message
    });
});
/*  */
exports.default = exports.router;
