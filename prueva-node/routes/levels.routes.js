import { Router } from "express";
import validJWT from "../middlewares/validateJWT.js";
import {getLevel, postLevel, deleteLevel, updateLevel} from "../controllers/level.controllers.js"
import validateDoc from "../middlewares/validateDoc.js";
import { check } from "express-validator";

const router = Router();

router.get('/',[
    validJWT,
validateDoc],getLevel)

router.post('/',[
    validJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
validateDoc],postLevel)

router.delete('/:id',deleteLevel)

router.patch('/:id',updateLevel)

export default router;