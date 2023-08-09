import Camper from "../models/Camper.js";


const TIdoc = (típoIdentificacion='')=>{
    if(!típoIdentificacion == "T.I" && !típoIdentificacion == "C.C")
        throw new Error(`Solo se permiten tipo de identificación T.I y C.C`);
}

const existEmail = async (email='')=>{
    const exist = await Camper.find(email)
    if(exist)
        throw new Error(`No se aceptan emails duplicados`)
}

const idexiste = async(id)=>{
    const existe = await Camper.findById(id)
    if(!existe)
        throw new Error(`El id ${id} no existe en la base de datos`)
}

export {TIdoc, existEmail, idexiste}

const existEmailLogin = async (email='')=>{
    const exist = await Camper.find({email})
    if(!exist)
        throw new Error(`Email no registrado`)
}

export {existEmailLogin}