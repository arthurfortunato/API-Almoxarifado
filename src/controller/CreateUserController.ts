import { Request, Response } from "express";
import { CreateUserService } from "../services/CreateUserServices";

export class CreateUserController {
  async signin(request: Request, response: Response) {
    // @ts-ignore
    const { email, password } = request.body;
    const userService = new CreateUserService();

    const users = await userService.signin({ email, password });
    // @ts-ignore
    return response.status(200).json(users);
  }

  async signup(request: Request, response: Response) {
    const user = request.body;
    const userService = new CreateUserService();
    // @ts-ignore
    const users = await userService.signup(user);
    // @ts-ignore
    return response.status(201).json(users);
  }

  async getUser(request: Request, response: Response) {
    // @ts-ignore
    const user = request.user;
    const userService = new CreateUserService();

    const getUser = await userService.getUsers(user);
    // @ts-ignore
    return response.status(200).json(getUser);
  }
}
