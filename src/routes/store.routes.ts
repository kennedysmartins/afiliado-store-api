import express from "express"
import * as storeController from '../controllers/store.controller';


const router = express.Router()

router.get('/', storeController.getAllConfigs)
router.put('/:id', storeController.editConfig);


export default router
