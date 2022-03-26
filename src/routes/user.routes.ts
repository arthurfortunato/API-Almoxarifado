import { Router } from "express";
import { CreateUserSignInController } from "../controller/user/CreateUserSignInController";
import { CreateUserSignUpController } from "../controller/user/CreateUserSignUpController";
import { GetUserController } from "../controller/user/GetUserController";
import { userAuthenticated } from "../middleware/userAuthenticated";

export const userRoutes = Router();
const createUserSignInController = new CreateUserSignInController();
const createUserSignUpController = new CreateUserSignUpController();
const getUserController = new GetUserController();

userRoutes.post("/signin", createUserSignInController.handle);
userRoutes.post("/signup", createUserSignUpController.handle);
userRoutes.get("/me", userAuthenticated, getUserController.handle);
