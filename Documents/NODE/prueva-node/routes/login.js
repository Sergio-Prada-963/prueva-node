import { Router } from "express";
import {check} from "express-validator";
import login from "../controllers/camperLogin.js";
import validateDoc from "../middlewares/validateDoc.js";
import { existEmailLogin } from "../helpers/db.validators.js";

const router = Router();

router.post('/',[
    check('email','No es un email valido').isEmail().not().isEmpty(),
    check('email').custom(existEmailLogin),
    check('password','la contraseña no es valida').not().isEmpty(),
validateDoc],login)

export default router