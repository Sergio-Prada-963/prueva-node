import Camper from "../models/Camper.js";
import { response } from "express";
import generateJWT from "../helpers/generateJWT.js"
import bcryptjs from "bcryptjs";

const login = async (req,res=response)=>{
    const {email,password} = req.body;
    try {     
        const camper = await Camper.findOne({email});
        if(!camper)
            return res.status(400).json({message:"camper incorrecto"});
        if(!camper.estado)
            return res.status(400).json({mesage: "camper desactivado"});
        const validatpassword= bcryptjs.compareSync(password, camper.password);
        if(!validatpassword)
                return res.status(400).json({mesage: "contraseña Incorrecta"});
        const token = await generateJWT(camper._id);
        res.cookie("token",token);
        res.json({camper,token})
    } catch (error) {
        console.log(error);
        return res.json({message:"Auto contactarme (Servicio tecnico)"})
    }

}
export default login;