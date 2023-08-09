import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser";
import conectarMdb from "./config/conexion.js";

import routerCentros from "./routes/centros.routes.js";
import routerLevel from "./routes/levels.routes.js";
import routerRutas from "./routes/rutas.routes.js";
import routerCamper from "./routes/campers.routes.js"
import routerLogin from "./routes/login.js"

class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.app.use(cookieParser());
        this.path = {
            campers: "/api/campers",
            levels: "/api/levels",
            rutas: "/api/rutas",
            centros: "/api/centros",
            login: "/camper/login"
        }
        this.middlewares();
        this.routes()
        this.conexion();
    }
    middlewares(){
        this.app.use(cors()); 
        this.app.use(express.json());
    }
    routes(){
        this.app.use(this.path.centros,routerCentros);
        this.app.use(this.path.levels,routerLevel);
        this.app.use(this.path.rutas,routerRutas);
        this.app.use(this.path.campers,routerCamper);
        this.app.use(this.path.login,routerLogin);
    }
    async conexion(){
        await conectarMdb()
    }
    listen(){
        this.app.listen(this.port,()=>{
            console.log(`Servidor onlinne </> ${this.port} ....`);
        })
    }
}
export default Server




