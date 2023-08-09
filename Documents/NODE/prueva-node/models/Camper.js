import {Schema,model} from "mongoose";

const camperSchema = Schema({
    nombre:{type:String,trim:true,required:[true]},
    típoIdentificacion:{type:String,trim:true,required:[true]},
    NroIdentificacion:{type:Number,trim:true,required:[true]},
    email:{type:String,trim:true,required:[true]},
    password:{type:String,trim:true,required:[true]},
    level:{type:String,trim:true,required:[true]},
    levelState:{type:String,trim:true,required:[true]}, /* trae datos de level */
    estado:{type:Boolean,default:true},
    imagen:{type:String,trim:true},
    rol:{type:String,trim:true,required:[true]},
    promedio:{type:String,trim:true,required:[true]},
});

const Camper = model('campers',camperSchema);

export default Camper