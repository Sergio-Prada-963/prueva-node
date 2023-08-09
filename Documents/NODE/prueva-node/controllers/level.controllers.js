import Level from "../models/Level.js";

const getLevel = async (req,res)=>{
    const {desde,hasta} = req.query;
    const [total,levels] = await Promise.all([
        Level.countDocuments(),
        Level.find().skip(Number(desde)).limit(Number(hasta))
    ]);
    res.json({total,levels});
}

const postLevel = async (req,res)=>{
    const newLevel = new Level(req.body)
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
    const updateLevel = await Level.findByIdAndUpdate(id,req.body,{new:true});
    res.json({message:"usuario Actualuzado",updateLevel});
}

export {getLevel, postLevel, deleteLevel, updateLevel};