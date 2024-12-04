import { json } from "express";
import mongoose from "mongoose";
const cartCollection = "cart";

const cartSchema = new mongoose.Schema({

  productsCart: [],

  
});

export const cartModel = mongoose.model(cartCollection, cartSchema);
