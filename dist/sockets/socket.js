"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const users_list_1 = require("../classes/users-list");
const user_1 = require("../classes/user");
exports.userList = new users_list_1.UsersList();
exports.connectClient = (client) => {
    const newUser = new user_1.User(client.id);
    exports.userList.addUser(newUser);
};
exports.disconnect = (client) => {
    client.on('disconnect', () => {
        exports.userList.removeUserById(client.id);
    });
};
exports.message = (client, io) => {
    client.on('message', (payload) => {
        io.emit('new-message', payload);
    });
};
exports.configUser = (client) => {
    client.on('config-user', (payload, callback) => {
        exports.userList.updateName(client.id, payload.name);
        callback({
            ok: true,
            user: payload.name,
            message: `User ${payload.name} configurado`
        });
    });
};
