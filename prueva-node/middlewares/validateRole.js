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

    console.log(String(gerente._id)," ---- ");
    console.log(String(trainer._id)," ---- ");
    console.log(String(req.usuario.rol)," ---- ");

    if((JSON.stringify(req.usuario.rol)) !== (JSON.stringify(gerente._id) && (JSON.stringify(req.usuario.rol) !== (JSON.stringify(trainer._id)))))
        return res.status(550).json({message:`${req.usuario.nombre} No es Gerente ni Trainer - no tiene permiso`});
    
    next()
}
export {role, gerenteTrainer};