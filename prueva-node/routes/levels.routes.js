import { Router } from "express";
import validJWT from "../middlewares/validateJWT.js";
import {getLevel, postLevel, deleteLevel, updateLevel} from "../controllers/level.controllers.js"
import validateDoc from "../middlewares/validateDoc.js";
import { check, param } from "express-validator";
import { camperTrainer, trainer } from "../middlewares/validateRole.js";
import { existLevel } from "../helpers/db.validators.js";

const router = Router();

router.get('/',[
    validJWT,
validateDoc],getLevel)

router.post('/',[
    validJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
validateDoc],postLevel)

router.delete('/:id',[
    validJWT,
    trainer,
    existLevel,
    param('id','No es un Id de mongo').isMongoId(),
validateDoc],deleteLevel)

router.patch('/:id',[
    validJWT,
    param('id','no es un Id de Mongo').isMongoId(),
    existLevel,
    camperTrainer,
validateDoc],updateLevel)

export default router;