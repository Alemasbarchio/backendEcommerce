import express from "express";

import {
  getById,
  addProductCarts,
  deletedCart,
  getCartAll,
  atualizaCarrinho
} from "../controllers/cart.controller.js";

const cartRoutes = express.Router();

cartRoutes.get("/:id", getById);
cartRoutes.get("/null", getCartAll);
cartRoutes.post("/", addProductCarts);
cartRoutes.delete("/cart/:cid", deletedCart); 
cartRoutes.put("/cart/:cid", atualizaCarrinho)
cartRoutes.put("/cart/:cid/product/:pid",()=>{})

export default cartRoutes;
