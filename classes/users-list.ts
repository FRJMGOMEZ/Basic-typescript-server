import { User } from './user';


export class UsersList{

    private users:User[] = [];

    constructor(

    ){}

    addUser(user:User){
        this.users.push(user);
        console.log({newUser:user})
        return user;
    }

    updateName(id:string,name:string){
        this.users.filter((user:User)=>{ return user.id === id})[0].name = name;
        console.log(this.users)
    }

    getUserList(){
        return this.users;
    }

    getUserById(id:string){
        return this.users.find((user:User)=>{ return user.id === id})
    }

    getUsersByRoom(room:string){
        return this.users.filter((user:User)=>{ return user.room === room})
    }

    removeUserById(id:string){
        
        const tempUser = this.getUserById(id);

        this.users = this.users.filter((user:User)=>{ return user.id != id});

        return tempUser;

    }
}