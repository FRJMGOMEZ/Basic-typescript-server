
import {Router,Request,Response} from 'express';
import Server from '../classes/server';
import { userList } from '../sockets/socket';
import { UsersList } from '../classes/users-list';

export const router = Router();

router.get('/messages',(req:Request,res:Response)=>{
    res.json({
        ok:true,
        message:'Everything is ok'
    })
})

 router.post('/message', (req: Request, res: Response) => {

     const message = req.body.message;
     const id = req.body.id;

     const server = Server.instance;

     if(message.isPrivated){
       server.io.in(id).emit('private-message',message);
     }else{
       server.io.emit('public-message',message);
     }

    res.json({
        ok: true,
        message
    })
})

router.get('/users',(req:Request,res:Response)=>{
    let userList = UsersList.instance;
    res.status(200).json({users:userList.getUserList()})
})
 

export default router;