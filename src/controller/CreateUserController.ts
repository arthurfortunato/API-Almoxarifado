import { Request, Response } from "express";
import { CreateUserService } from "../services/CreateUserServices";

export class CreateUserController {
  async signin(request: Request, response: Response) {
    const { email, password } = request.body;
    const userService = new CreateUserService();

    const users = await userService.signin({ email, password });

    return response.status(200).json(users);
  }
}
