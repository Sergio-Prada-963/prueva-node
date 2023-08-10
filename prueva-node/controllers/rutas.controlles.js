import Rutas from "../models/Ruta.js";

const getRutas = async (req,res)=>{
    const {desde,hasta} = req.query;
    const [total,rutas] = await Promise.all([
        Rutas.countDocuments(),
        Rutas.find().skip(Number(desde)).limit(Number(hasta))
    ]);
    res.json({total,rutas});
}

const postRutas = async (req,res)=>{
    const newRutas = new Rutas(req.body)
    await newRutas.save()
    res.json(newRutas);
}

const deleteRutas = async (req,res)=>{
    const {id} = req.params
    const Rutas = await Rutas.findByIdAndDelete(id)
    res.json({message:"borrado exitosamente...",Rutas})
}

const updateRutas = async (req,res)=>{
    const {id} = req.params
    const updateRutas = await Rutas.findByIdAndUpdate(id,req.body);
    res.json({message:"Ruta Actualuzada"});
}

export {getRutas, postRutas, deleteRutas, updateRutas}; 