const role = (req,res,next)=>{
    if(!req.usuario)
        return res.status(400).json({message:"Se quiere validar el rango sin el token"});
    if(req.usuario.rango !== "trainerRol")
        return res.status(550).json({message:`${req.usuario.nombre} No es trainer - no tiene permiso`});
    next()
}
export default role