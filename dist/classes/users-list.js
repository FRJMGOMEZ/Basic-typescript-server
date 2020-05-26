"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UsersList {
    constructor() {
        this.users = [];
    }
    static get instance() {
        return this._instance || (this._instance = new this());
    }
    addUser(user) {
        this.users.push(user);
        return user;
    }
    updateName(id, name) {
        return new Promise((resolve, reject) => {
            let user = this.users.filter((user) => { return user.id === id; })[0];
            user.name = name;
            let users = this.users.filter((user) => { return user.id != id; });
            console.log();
            resolve({ users, userIn: user });
        });
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
        return new Promise((resolve, reject) => {
            const tempUser = this.getUserById(id);
            this.users = this.users.filter((user) => { return user.id != id; });
            resolve(tempUser);
        });
    }
}
exports.UsersList = UsersList;
