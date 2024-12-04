import express from "express";

// import do middleware
import { productValidation } from "../middleware/productValidation.js";
import { isAdm} from "../middleware/authCheck.js";

//Rotas do express
const prodRouter = express.Router();

import {
  creatProduct,
  getAllProducts,
  getById,
  upDateProduct,
  editProduct
} from "../controllers/product.controller.js";
import { deleteProduct } from "../services/product.service.js";

prodRouter.get("/home", (req,res) => {
  res.render("index",{name: req.session.name })
})

prodRouter.get("/products", getAllProducts);

prodRouter.get("/products/:pid", getById);

prodRouter.post("/products",isAdm,  creatProduct);

prodRouter.get("/products/edit/:id",isAdm,editProduct);

prodRouter.put("/products/edit/:id",isAdm,upDateProduct);

prodRouter.delete("/:id",isAdm,deleteProduct);

export default prodRouter;
