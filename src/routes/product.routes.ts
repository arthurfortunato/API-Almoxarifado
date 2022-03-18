import { Router } from "express";
import { CreateProductController } from "../controller/CreateProductController";

export const productRoutes = Router();
const productController = new CreateProductController();

productRoutes.post("/newproduct", productController.handle);
productRoutes.get("/products", productController.getProducts);
