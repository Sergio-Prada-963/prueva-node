import Centros from "../models/Centro.js";

const getCentros = async (req,res)=>{
    const {desde,hasta} = req.query;
    const query = {estado:true};
    const [total,centros] = await Promise.all([
        Centros.countDocuments(query),
        Centros.find(query).skip(Number(desde)).limit(Number(hasta))
    ]);
    res.json({total,centros});
}
const postCentro = async (req,res)=>{
    const newCentro = new Centros(req.body)
    await newCentro.save()
    res.json(newCentro);
}

const deleteCentro = async(req,res)=>{
    const {id} = req.params
    await Centros.findByIdAndDelete(id);
    res.json("Centro eliminado");
}

const putCentro = async (req,res)=>{
    const {id} = req.params
    const updateCentro = await Centros.findByIdAndUpdate(id,req.body,{new:true});
    res.json({message:"Centro actualizado",updateCentro})
} 

export {getCentros, postCentro, deleteCentro, putCentro}
