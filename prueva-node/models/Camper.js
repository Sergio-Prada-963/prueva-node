import {Schema,model} from "mongoose";

const camperSchema = Schema({
    nombre:{type:String,trim:true,required:[true]},
    típoIdentificacion:{type:String,trim:true,required:[true]},
    NroIdentificacion:{type:Number,trim:true,required:[true]    },
    email:{type:String,trim:true,required:[true]    },
    password:{type:String,trim:true,required:[true]},
    level:{type:Schema.Types.ObjectId,ref:'levels',required:[true]},
    levelState:{type:String,trim:true,required:[true],enum:['Finalizado','En proceso','Pendiente']}, /* hay que insertar id de level */
    estado:{type:Boolean,default:true},
    imagen:{type:String,required:[false]},
    rol:{type:Schema.Types.ObjectId,ref:'roles',required:[true]},/* hay que insertar id del rol */
    promedio:{type:String,trim:true,required:[true]},
});

const Camper = model('campers',camperSchema);

export default Camper