
import express from 'express';
import { SERVER_PORT } from '../global/environment';
import socketIO from 'socket.io';
import http from 'http';
import { disconnect } from '../sockets/socket';
import * as socket from '../sockets/socket'

export default class Server {

    public static _instance:Server;

    public app: express.Application;

    public port: number;

    public io:socketIO.Server

    private httpServer:http.Server

    /* CON EL CONSTRUCTOR PRIVADO Y LA LÓGICA DEL GETTER INSTANCE CONSEGUIMOS RESTRINGIR EL INSTACIAMIENTO DE LA CLASE A UNA INSTANCIA, PARA NO ABRIR MÁS DE UN FLUJO DE SOCKETS */
    private constructor(){
        
        this.app = express();
        this.port = SERVER_PORT;

        this.httpServer = new http.Server(this.app);

        this.io = socketIO(this.httpServer);

        this.listenningSockets();
        
    }


    public static get instance(){

        return this._instance || (this._instance = new this())

    }

    private listenningSockets(){
        this.io.on('connection',client=>{


            socket.connectClient(client)

            socket.configUser(client);
            socket.disconnect(client);
            socket.message(client,this.io);
        }) 
    }

    start(  callback:any ){
        this.httpServer.listen(this.port,callback);
    }
 
}