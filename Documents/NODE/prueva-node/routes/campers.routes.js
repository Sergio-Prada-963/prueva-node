import { Router } from "express";
import { check } from "express-validator";

import {TIdoc, existEmail, idexiste} from "../helpers/db.validators.js"
import validJWT from "../middlewares/validateJWT.js"
import validateDoc from "../middlewares/validateDoc.js";
import role from "../middlewares/validateRole.js";
import {getAllCamper, postCamper, deleteCamper, updateCamper} from "../controllers/controllers.campers.js"

const router = Router();

router.get('/',[validJWT,validateDoc],getAllCamper)

router.post('/',[
    validJWT,
    role,
    check('típoIdentificacion').custom(TIdoc),
    check('NroIdentificacion','nro de identificación debe tener exactamente 10 caracteres.').isLength(10),
    check('nombre').not().isEmpty(),
    check('password','Password mínimo de 8 caracteres').isLength(8),
    check('email','Email Invalido').isEmail().custom(existEmail),
],postCamper)

router.delete('/:id',[
    validJWT,
    role,
    check('id','NO es un id valido').isMongoId(),
    check('id').custom(idexiste),
],deleteCamper)

router.patch('/:id',updateCamper)

export default router;