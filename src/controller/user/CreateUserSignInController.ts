import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "../../entities/User";
import { CreateUserSignInService } from "../../services/user/CreateUserSignInService";
import md5 from "crypto-js/md5";
import authConfig from "../../config/auth";
import { sign } from "jsonwebtoken";
import { AppError } from "../../error/AppError";

export class CreateUserSignInController {
  async handle(request: Request, response: Response) {
    const userRepository = getRepository(User);

    const createUserSignInService = new CreateUserSignInService();
    
    const { email, password } = request.body;

    const passwordHash = md5(password).toString();

    const existUser = await userRepository.findOne({
      where: { email, password: passwordHash },
    });

    if (!existUser) {
      throw new AppError("Usuário não encontrado", 404);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign(
      {
        name: existUser.name,
        email: existUser.email,
      },
      secret,
      {
        subject: existUser.email,
        expiresIn,
      }
    );
    delete existUser.password;

    createUserSignInService.execute({ email, password });

    return response.status(200).json({ accessToken: token });
  }
}
