"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
exports.router = express_1.Router();
exports.router.get('/messages', (req, res) => {
    res.json({
        ok: true,
        message: 'Everything is ok'
    });
});
exports.router.post('/messages/:id', (req, res) => {
    const message = req.body.message;
    const user = req.body.user;
    const id = req.params.id;
    res.json({
        ok: true,
        message,
        user,
        id
    });
});
exports.default = exports.router;
