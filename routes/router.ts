
import {Router,Request,Response} from 'express';
import Server from '../classes/server';

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



/*  */

 

export default router;