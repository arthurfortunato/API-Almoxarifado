import { Router } from "express";
import { CreateProductController } from "../controller/CreateProductController";
import { userAuthenticated } from "../middleware/userAuthenticated";

export const productRoutes = Router();
const productController = new CreateProductController();

productRoutes.post("/newproduct", userAuthenticated, productController.createProduct);
productRoutes.get("/product", userAuthenticated, productController.getProduct);
productRoutes.get("/productId/:id", userAuthenticated, productController.getProductId);
productRoutes.put("/updated/:id", userAuthenticated, productController.updatedProduct);
productRoutes.delete("/delete/:id", userAuthenticated, productController.destroy);
