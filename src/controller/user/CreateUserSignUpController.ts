import { Request, Response } from "express";
import { CreateUserSignUpService } from "../../services/user/CreateUserSignUpService";

export class CreateUserSignUpController {
  async handle(request: Request, response: Response) {
    const user = request.body;
    const userService = new CreateUserSignUpService();

    const users = await userService.execute(user);

    return response.status(201).json(users);
  }
}
