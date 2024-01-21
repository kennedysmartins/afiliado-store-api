import mongoose, {Document, Schema} from "mongoose";

interface ICategory extends Document {
    category_name: string;
}

const categorySchema = new Schema({
    category_name: { type: String, required: true },
});
  
const Category = mongoose.model<ICategory>('Category', categorySchema);

export default Category;
