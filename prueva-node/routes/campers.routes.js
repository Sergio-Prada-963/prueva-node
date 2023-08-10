import { Router } from "express";
import { check } from "express-validator";

import {existEmail, idexiste, existNombre} from "../helpers/db.validators.js"
import validJWT from "../middlewares/validateJWT.js"
import validateDoc from "../middlewares/validateDoc.js";
import role from "../middlewares/validateRole.js";
import {getAllCamper, postCamper, deleteCamper, updateCamper} from "../controllers/controllers.campers.js"

const router = Router();

router.get('/',[validJWT,validateDoc],getAllCamper)

router.post('/',[
    /* si se valida el rol para poder postear un camper como se va a postear a alguien nuevo que no existe sin loguear */
    check('típoIdentificacion','Solo se permiten tipo de identificación T.I y C.C').isIn(['T.I','C.C']),
    check('NroIdentificacion','nro de identificación debe tener exactamente 10 caracteres.').isLength(10),
    check('nombre','no es nombre valido').not().isEmpty(),
    check('nombre').custom(existNombre),
    check('password','Password mínimo de 8 caracteres').isLength(8),
    check('email','EL email no es valido').isEmail(),
    check('email').custom(existEmail),
    //check('email','Email Invalido').isEmail().custom(existEmail),
validateDoc],postCamper)

router.delete('/:id',[
    validJWT,
    role,
    check('id','NO es un id valido').isMongoId(),
    check('id').custom(idexiste),
],deleteCamper)

router.patch('/:id',updateCamper)

export default router;