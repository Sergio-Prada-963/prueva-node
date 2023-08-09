import {Schema,model} from "mongoose";

const rutaSchema = Schema({
    nombre:{type:String,trim:true,required:[true]},
    centro:{type:String,trim:true,required:[true]}
})

const Rutas = model('rutas',rutaSchema);
export default Rutas;