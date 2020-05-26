import { Socket } from "socket.io";
import socketIO from 'socket.io';
import { UsersList } from '../classes/users-list';
import { User } from '../classes/user';


export const userList = UsersList.instance;

export const connectClient = (client:Socket)=>{
    const newUser = new User(client.id);
    userList.addUser(newUser);
}

export const disconnect = (client:Socket)=>{
    client.on('disconnect',()=>{
        userList.removeUserById(client.id).then((user)=>{
            client.broadcast.emit('user-out',user)
        })
    })
}
export const message = (client:Socket, io:socketIO.Server)=>{
    client.on('message',(payload)=>{
        io.emit('new-message',payload)
    })
}

export const configUser = (client:Socket)=>{
     client.on('config-user',(payload:{name:string},callback:Function)=>{
         console.log({payload})
         userList.updateName(client.id,payload.name).then(({users,user})=>{
             callback({
                 ok: true,
                 user,
                 users
             })
             client.broadcast.emit('new-user',user)
         })
     }) 
}


export const userOut = (client:Socket)=>{
    client.on('logout',(payload:{user:User},callback:Function)=>{
        userList.updateName(client.id,'NO-NAME').then(({users,user})=>{
            client.broadcast.emit('user-out', user)
            callback();
        })
    })
}


