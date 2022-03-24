import { Router } from "express";
import { CreateProductController } from "../controller/CreateProductController";
import { userAuthenticated } from "../middleware/userAuthenticated";

export const productRoutes = Router();
const productController = new CreateProductController();

productRoutes.post("/newproduct", userAuthenticated, productController.createProduct);
productRoutes.get("/products", userAuthenticated, productController.getProduct);
productRoutes.get("/productsId/:id", userAuthenticated, productController.getProductId);
productRoutes.put("/updated/:id", userAuthenticated, productController.updatedProduct);
productRoutes.delete("/delete/:id", userAuthenticated, productController.destroy);
