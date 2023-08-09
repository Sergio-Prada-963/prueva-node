import { check } from "express-validator";
import { Router } from "express";
import {getCentros, postCentro, deleteCentro, putCentro} from "../controllers/centro.controllers.js"

const router = Router();

router.get('/',getCentros)

router.post('/',postCentro)

router.delete('/:id',deleteCentro)

router.patch('/:id',putCentro)

export default router;




