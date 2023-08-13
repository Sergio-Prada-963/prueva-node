import Level from "../models/Level.js";
import Rutas from "../models/Ruta.js";

const getLevel = async (req,res)=>{
    const {desde,hasta} = req.query;
    const [total,levels] = await Promise.all([
        Level.countDocuments(),
        Level.find()
        .populate('ruta','-_id')
        .skip(Number(desde)).limit(Number(hasta))
    ]);
    res.json({total,levels});
}

const postLevel = async (req,res)=>{
    const {ruta} = req.body
    const existRuta = await Rutas.findOne({nombre:ruta})

    if(!existRuta)
        return res.json({message:`La ruta ${ruta} no existe`})

    const newLevel = new Level(req.body)
    newLevel.ruta = existRuta._id
    await newLevel.save()
    res.json(newLevel);
}

const deleteLevel = async (req,res)=>{
    const {id} = req.params
    const level = await Level.findByIdAndDelete(id)
    res.json({message:"borrado exitosamente...",level})
}

const updateLevel = async (req,res)=>{
    const {id} = req.params
    const {ruta, ...resto} = req.body

    const existRuta = await Rutas.findOne({nombre:ruta})

    if(ruta && !existRuta)
        res.json({message:`La ruta ${ruta} no existe`})

    if(ruta)
        resto.ruta = existRuta._id
    
    const updateLevel = await Level.findByIdAndUpdate(id,resto,{new:true});
    res.json({message:"usuario Actualuzado",updateLevel});
}

export {getLevel, postLevel, deleteLevel, updateLevel};