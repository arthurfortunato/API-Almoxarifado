import { Request, Response } from "express";
import { CreateUserSignInService } from "../../services/user/CreateUserSignInService";

export class CreateUserSignInController {
  async handle(request: Request, response: Response) {

    const { email, password } = request.body;
    const createUserSignInService = new CreateUserSignInService();

    const users = await createUserSignInService.execute({ email, password });

    return response.status(200).json(users);
  }
}


