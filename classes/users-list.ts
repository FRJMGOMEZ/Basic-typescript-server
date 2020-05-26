import { User } from './user';

export class UsersList{

    public static _instance: UsersList;

    private users:User[] = [];

    constructor(

    ){}

    public static get instance() {

        return this._instance || (this._instance = new this())

    }

    addUser(user:User){
        this.users.push(user);
        return user;
    }

    updateName(id:string,name:string):Promise<{users:User[],user:User}>{
        return new Promise((resolve,reject)=>{
            let user = this.users.filter((user: User) => { return user.id === id })[0]; 
            user.name = name;
            let users = this.users.filter((user: User) => { return user.id != id && user.name != 'NO-NAME' }); 
            console.log()
            resolve({users,user});
        })
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
        return new Promise((resolve,reject)=>{
            const tempUser = this.getUserById(id);
            this.users = this.users.filter((user: User) => { return user.id != id });
            resolve(tempUser);
        })
    }
}