"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UsersList {
    constructor() {
        this.users = [];
    }
    addUser(user) {
        this.users.push(user);
        console.log({ newUser: user });
        return user;
    }
    updateName(id, name) {
        this.users.filter((user) => { return user.id === id; })[0].name = name;
        console.log(this.users);
    }
    getUserList() {
        return this.users;
    }
    getUserById(id) {
        return this.users.find((user) => { return user.id === id; });
    }
    getUsersByRoom(room) {
        return this.users.filter((user) => { return user.room === room; });
    }
    removeUserById(id) {
        const tempUser = this.getUserById(id);
        this.users = this.users.filter((user) => { return user.id != id; });
        return tempUser;
    }
}
exports.UsersList = UsersList;
