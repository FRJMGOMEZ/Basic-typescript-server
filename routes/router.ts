
import {Router,Request,Response} from 'express';


export const router = Router();

router.get('/messages',(req:Request,res:Response)=>{

    res.json({
        ok:true,
        message:'Everything is ok'
    })

})

 router.post('/messages/:id', (req: Request, res: Response) => {

     const message = req.body.message;
     const user = req.body.user;
     const id = req.params.id;

    res.json({
        ok: true,
        message,
        user,
        id
    })
})
 

export default router;