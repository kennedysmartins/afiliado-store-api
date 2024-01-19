import { Request, Response } from 'express';
import Product from '../models/product.model';
import mongoose from 'mongoose';

export const getAllProducts = async (req: Request, res: Response) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
        
    } catch (error) {
        res.status(500).json(error);
    }
}

export const getProductsByName = async (req: Request, res: Response) => {    
    try {
        const products = await Product.find({'title': { $regex: new RegExp('.*' + req.params.name + '.*', "i") } });
    
        console.log(products)
        res.status(200).json(products);
        
    } catch (error) {
        res.status(500).json(error);
    }
}

export const deleteProductById = async (req: Request, res: Response) => {    
    try {
        console.log(req.params.id)

        const idToDelete = new mongoose.Types.ObjectId(req.params.id);

        console.log(idToDelete)

        const deleted = await Product.findOneAndDelete(idToDelete);

        console.log(deleted)
        res.status(200).json(deleted);
        
    } catch (error) {

        console.error(error)
        res.status(500).json(error);
    }
}