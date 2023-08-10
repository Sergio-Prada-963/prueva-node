import {Schema,model} from "mongoose";

const levelSchema = Schema({
    nombre:{type:String,trim:true,required:[true],unique:true},
    ruta:{type:String,trim:true,required:[true]},
    duracion:{type:String,trim:true,required:[true]}
})

const Level = model('levels',levelSchema)

export default Level;