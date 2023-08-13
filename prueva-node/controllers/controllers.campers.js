import Camper from "../models/Camper.js";
import Level from "../models/Level.js";
import Rol from "../models/Rol.js";
import bcryptjs from "bcryptjs"

const getAllCamper = async (req,res)=>{
    const {desde,hasta} = req.query;
    const query = {estado:true};
    const [total,campers] = await Promise.all([
        Camper.countDocuments(query),
        Camper.find(query)
        .populate({path: 'level',populate:{path:'ruta'}})
        .populate('rol','-_id')
        .skip(Number(desde)).limit(Number(hasta))
    ]);
    res.json({total,campers});
}

const postCamper = async (req,res)=>{
    const {password, level, rol} = req.body
    
    const existRol = await Rol.findOne({rol})
    const existLevel = await Level.findOne({nombre:level});
    
    if(!existLevel)
    res.json({message: `El leveState ${level} no existe`});
    
    if(!existRol)
        res.json({message:`El rol ${rol} no existe`})
    
    const newCamper = new Camper(req.body)
    newCamper.rol = existRol._id
    newCamper.level = existLevel._id

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
    const {password, rol, level, levelState, ...resto} = req.body

    const existRol = await Rol.findOne({rol})
    const existLevel = await Level.findOne({nombre:level});
    
    if(level && !existLevel)
        return res.json({message: `El leveState ${level} no existe`});
    
    if(rol && !existRol)
        return res.json({message:`El rol ${rol} no existe`})
    
    if(level){
        if(levelState == "Finalizado"){
            resto.level = existLevel._id;
        }else {return res.json({message:`El camper no puede subir de level`})}
    }

    if(rol)
        resto.rol = existRol._id

    if(password){
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password,salt);
    }
    const updateCamper = await Camper.findByIdAndUpdate(id,resto,{new:true});
    res.json({message:"camper Actualuzado",updateCamper});
}

export {getAllCamper, postCamper, deleteCamper, updateCamper};