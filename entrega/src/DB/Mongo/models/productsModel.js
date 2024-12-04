import mongoose, { Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productColection = "products";

const productSchema = new Schema({
  name: String,
  description: String,
  price: Number,
  qtdStock: Number,
  code: {
    type: String,
    unique: true,
  },
  imgProduct: String,
});
productSchema.plugin(mongoosePaginate);

export const productModel = mongoose.model(productColection, productSchema);
