import { Router } from "express";
import { CreateProductController } from "../controller/CreateProductController";
import { userAuthenticated } from "../middleware/userAuthenticated";

export const productRoutes = Router();
const productController = new CreateProductController();

productRoutes.post("/newproduct", userAuthenticated, productController.handle);
productRoutes.get("/products", userAuthenticated, productController.getProducts);
productRoutes.get("/products/:code", userAuthenticated, productController.getProducts);
productRoutes.put("/updated/:code", userAuthenticated, productController.updatedProduct);
productRoutes.delete("/delete/:code", userAuthenticated, productController.destroy);
