import Camper from "../models/Camper.js";
import bcryptjs from "bcryptjs"

const getAllCamper = async (req,res)=>{
    const {desde,hasta} = req.query;
    const query = {estado:true};
    const [total,campers] = await Promise.all([
        Camper.countDocuments(query),
        Camper.find(query).skip(Number(desde)).limit(Number(hasta))
    ]);
    res.json({total,campers});
}

const postCamper = async (req,res)=>{
    const {password} = req.body
    const newCamper = new Camper(req.body)
    const salt = bcryptjs.genSaltSync();
    newCamper.password = bcryptjs.hashSync(password,salt)
    await newCamper.save()
    res.json(newCamper);
}

const deleteCamper = async (req,res)=>{
    const {id} = req.params
    const camper = await Camper.findByIdAndUpdate(id,{estado:false})
    res.json({message:"borrado exitosamente...",camper})
}
 
const updateCamper = async (req,res)=>{
    const {id} = req.params
    const {password, ...resto} = req.body
    if(password){
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password,salt);
    }
    const updateCamper = await Camper.findByIdAndUpdate(id,resto,{new:true});
    res.json({message:"camper Actualuzado",updateCamper});
}

export {getAllCamper, postCamper, deleteCamper, updateCamper};