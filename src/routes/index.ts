import { Router } from "express";
import { productRoutes } from "./product.routes";
import { userRoutes } from "./user.routes";

const routes = Router();

routes.use("/product", productRoutes);
routes.use("/user", userRoutes);

export { routes };
