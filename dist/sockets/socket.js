"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const users_list_1 = require("../classes/users-list");
const user_1 = require("../classes/user");
exports.userList = users_list_1.UsersList.instance;
exports.connectClient = (client) => {
    const newUser = new user_1.User(client.id);
    exports.userList.addUser(newUser);
};
exports.disconnect = (client) => {
    client.on('disconnect', () => {
        exports.userList.removeUserById(client.id).then((user) => {
            client.broadcast.emit('user-out', user);
        });
    });
};
exports.message = (client, io) => {
    client.on('message', (payload) => {
        io.emit('new-message', payload);
    });
};
exports.configUser = (client) => {
    client.on('config-user', (payload, callback) => {
        console.log({ payload });
        exports.userList.updateName(client.id, payload.name).then(({ users, userIn }) => {
            callback({
                ok: true,
                userIn,
                users
            });
            client.broadcast.emit('new-user', userIn);
        });
    });
};
