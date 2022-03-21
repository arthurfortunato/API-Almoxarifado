import { Router } from "express";
import { CreateUserController } from "../controller/CreateUserController";

export const userRoutes = Router();
const userController = new CreateUserController();

userRoutes.post("/signin", userController.signin);
