import { Router } from "express";

import {getRutas, postRutas, deleteRutas, updateRutas} from "../controllers/rutas.controlles.js"

const router = Router();

router.get('/',getRutas)

router.post('/',postRutas)

router.delete('/:id',deleteRutas)

router.patch('/:id',updateRutas)

export default router;