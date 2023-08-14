import Rol from "../models/Rol.js";
const role = async (req,res,next)=>{
    if(!req.usuario)
        return res.status(400).json({message:"Se quiere validar el rango sin el token"});
        
    const gerente = await Rol.findOne({rol:"gerenteRol"});

    if((JSON.stringify(req.usuario.rol)) !== (JSON.stringify(gerente._id)))
        return res.status(550).json({message:`${req.usuario.nombre} No es Gerente - no tiene permiso`});
    
    next()
}

const gerenteTrainer = async (req,res,next)=>{
    if(!req.usuario)
        return res.status(400).json({message:"Debe tener un token para realizar esta accion..."});
    
    const gerente = await Rol.findOne({rol:"gerenteRol"});
    const trainer = await Rol.findOne({rol: "trainerRol"});

    if((String(req.usuario.rol)) !== (String(gerente._id)) && (String(req.usuario.rol)) !== (String(trainer._id)))
        return res.status(550).json({message:`${req.usuario.nombre} No es Gerente ni Trainer - no tiene permiso`});
    
    next()
}

const trainer = async (req,res,next)=>{
    if(!req.usuario)
        return res.status(400).json({message:"Debe tener un token para realizar esta accion..."});

    const trainer = await Rol.findOne({rol:"trainerRol"});

    if(String(req.usuario.rol) !== String(trainer._id))
    return res.status(550).json({message:`${req.usuario.nombre}, No es trainer no puede realizar esta accion...`});

    next();
}

const camperTrainer = async (req,res,next)=>{
    if(!req.usuario)
    return res.status(400).json({message:"Debe tener un token para realizar esta accion..."});

    const trainer = await Rol.findOne({rol:"trainerRol"});
    const camper = await Rol.findOne({rol:"camperRol"});

    if(String(req.usuario.rol) !== String(trainer._id) && String(req.usuario.rol) !== String(camper._id))
    return res.status(550).json({message:`${req.usuario.nombre}, No es Trainer ni camper...`});

    next();
}
export {role, gerenteTrainer, trainer, camperTrainer};