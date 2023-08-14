import Camper from "../models/Camper.js";
import Level from "../models/Level.js";

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

const existEmailLogin = async (email='')=>{
    const exist = await Camper.find({email})
    if(!exist)
        throw new Error(`Email no registrado`)
}

// const levelStateValid = async (levelState='')=>{
//     if(levelState !== "Finalizado")
//         throw new Error(`El camper no puede subir de nivel`)
// }
export {existEmail, idExiste, existNombre, existEmailLogin}

const existLevel = async (id)=>{
    const existe = await Level.findById(id);
    if(!existe)
        throw new Error(`El id ${id} no existe en la base de datos`)
}

export {existLevel}