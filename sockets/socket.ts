import { Socket } from "socket.io";
import socketIO from 'socket.io';
import { UsersList } from '../classes/users-list';
import { User } from '../classes/user';


export const userList = new UsersList();

export const connectClient = (client:Socket)=>{
    const newUser = new User(client.id);
    userList.addUser(newUser);
}

export const disconnect = (client:Socket)=>{
    client.on('disconnect',()=>{
        userList.removeUserById(client.id)
    })
}
export const message = (client:Socket, io:socketIO.Server)=>{
    client.on('message',(payload)=>{
        io.emit('new-message',payload)
    })
}

export const configUser = (client:Socket)=>{
     client.on('config-user',(payload:{name:string},callback:Function)=>{
         userList.updateName(client.id,payload.name)
        callback({
            ok:true,
            user:payload.name,
            message:`User ${payload.name} configurado`
        })
     }) 
}


