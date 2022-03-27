import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "../../entities/User";
import { AppError } from "../../error/AppError";
import { GetUserService } from "../../services/user/GetUserService";

export class GetUserController {
  async handle(request: Request, response: Response) {
    const userRepository = getRepository(User);

    const user = request.user;

    const currentUser = await userRepository.findOne({
      where: { email: user.email },
    });

    if (!currentUser) {
      throw new AppError("User not found", 401);
    }

    delete currentUser.password;

    const userService = new GetUserService();

    await userService.execute(user);

    return response.status(200).json(currentUser);
  }
}
