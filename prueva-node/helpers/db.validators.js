import Camper from "../models/Camper.js";

const existEmail = async (email='')=>{
    const exist = await Camper.findOne({email})
    if(exist) 
        throw new Error(`No se aceptan emails duplicados`)
}

const idExiste = async(id='')=>{
    const existe = await Camper.findById(id);
    if(!existe)
        throw new Error(`El id ${id} no existe en la base de datos`)
}

const existNombre = async (nombre='')=>{
    const existe = await Camper.findOne({nombre})
    if(existe)
        throw new Error(`El nombre ${nombre} ya esta registrado`)
}

export {existEmail, idExiste, existNombre}

const existEmailLogin = async (email='')=>{
    const exist = await Camper.find({email})
    if(!exist)
        throw new Error(`Email no registrado`)
}

export {existEmailLogin}