import mongoose, { Schema, Document } from "mongoose";

interface Iproduct extends Document {
    product_title: string; 
    product_description: string;
    product_price: number;
    product_category: string;
    product_image: string;
    product_rate: number;
    product_count: number; 
}

const productSchema = new Schema({
    product_title: { type: String, required: true },
    product_description: { type: String, required: true },
    product_price: { type: Number, required: true },
    product_category: { type: String, required: true },
    product_image: { type: String, required: true },
    product_rate: { type: Number, required: true },
    product_count: { type: Number, required: true },
});

const Product = mongoose.model<Iproduct>('product', productSchema);

export default Product;