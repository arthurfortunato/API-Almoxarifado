import { Router } from "express";
import { CreateUserController } from "../controller/CreateUserController";
import { userAuthenticated } from "../middleware/userAuthenticated";

export const userRoutes = Router();
const userController = new CreateUserController();

userRoutes.post("/signin", userController.signin);
userRoutes.post("/signup", userController.signup);
userRoutes.get("/me", userAuthenticated, userController.getUser);
