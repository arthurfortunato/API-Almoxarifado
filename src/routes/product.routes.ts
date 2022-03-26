import { Router } from "express";

import { GetIdProductController } from "../controller/product/GetIdProductController";
import { CreateProductController } from "../controller/product/CreateProductController";
import { DeleteProductController } from "../controller/product/DeleteProductController";
import { GetProductController } from "../controller/product/GetProductController";
import {UpdateProductController} from '../controller/product/UpdateProductController';

import { userAuthenticated } from "../middleware/userAuthenticated";

export const productRoutes = Router();
const createProductController = new CreateProductController();
const getIdProductController = new GetIdProductController();
const getProductController = new GetProductController();
const deleteProductController = new DeleteProductController();
const updateProductController = new UpdateProductController();

productRoutes.post("/newproduct", createProductController.handle);
productRoutes.get("/product", getProductController.handle);
productRoutes.get("/productId/:id", getIdProductController.handle);
productRoutes.put("/updated/:id", updateProductController.handle);
productRoutes.delete("/delete/:id", deleteProductController.handle);
