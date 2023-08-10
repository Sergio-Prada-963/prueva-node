import {Schema,model} from "mongoose";

const centroSchema = Schema({
    nombre:{type:String,trim:true,required:[true]},
    descripcion:{type:String,trim:true,required:[true]},
    estado:{type:Boolean,default:true},
    ciudad:{type:String,trim:true,required:[true]},
})
const Centros = model('centros',centroSchema,'centros');
export default Centros;