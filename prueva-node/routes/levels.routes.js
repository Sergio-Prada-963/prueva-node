import { Router } from "express";

import {getLevel, postLevel, deleteLevel, updateLevel} from "../controllers/level.controllers.js"

const router = Router();

router.get('/',getLevel)

router.post('/',postLevel)

router.delete('/:id',deleteLevel)

router.patch('/:id',updateLevel)

export default router;