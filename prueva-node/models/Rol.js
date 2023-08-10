import {Schema,model} from "mongoose";

const rolSchema = Schema({
    rol:{type:String,trim:true}
})
const Rol = model('roles',rolSchema);
export default Rol