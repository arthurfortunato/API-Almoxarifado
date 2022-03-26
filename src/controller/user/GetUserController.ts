import { Request, Response } from "express";
import { GetUserService } from "../../services/user/GetUserService";

export class GetUserController {
  async handle(request: Request, response: Response) {
    const user = request.user;
    const userService = new GetUserService();

    const getUser = await userService.execute(user);

    return response.status(200).json(getUser);
  }
}
