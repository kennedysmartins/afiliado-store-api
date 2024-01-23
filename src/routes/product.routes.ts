import express from "express";
import * as productController from '../controllers/product.controller';

const router = express.Router();

//CRUD
router.post('/', productController.createProduct)
router.get('/', productController.getAllProducts)
router.get('/search/:name', productController.getProductsByName)
router.put('/:id', productController.editProduct)
router.delete('/:id', productController.deleteProductById)

export default router;