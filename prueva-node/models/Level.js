import {Schema,model} from "mongoose";

const levelSchema = Schema({
    nombre:{type:String,trim:true,required:[true],unique:true},
    ruta:{type:Schema.Types.ObjectId,ref:'rutas',required:[true]},
    duracion:{type:String,trim:true,required:[true]}
})

const Level = model('levels',levelSchema)

export default Level;