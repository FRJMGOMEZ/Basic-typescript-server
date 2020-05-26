"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const server_1 = __importDefault(require("../classes/server"));
const users_list_1 = require("../classes/users-list");
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
exports.router.get('/users', (req, res) => {
    let userList = users_list_1.UsersList.instance;
    res.status(200).json({ users: userList.getUserList() });
});
exports.default = exports.router;
