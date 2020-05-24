"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class User {
    constructor(id, name = 'NO NAME', room = 'NO ROOM') {
        this.id = id;
        this.name = name;
        this.room = room;
    }
}
exports.User = User;
