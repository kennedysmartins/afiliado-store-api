import express from "express";
import * as userController from '../controllers/user.controller';

const router = express.Router();

//CRUD
router.post('/', userController.createUser)
router.get('/', userController.getUsers)
router.put('/:id', userController.editUser)
router.delete('/:id', userController.deleteUser)

export default router;