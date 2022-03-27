import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "../../entities/User";
import { CreateUserSignUpService } from "../../services/user/CreateUserSignUpService";
import md5 from "crypto-js/md5";
import authConfig from "../../config/auth";
import { sign } from "jsonwebtoken";
import { AppError } from "../../error/AppError";

export class CreateUserSignUpController {
  async handle(request: Request, response: Response) {
    const userRepository = getRepository(User);

    const createUserSignUpService = new CreateUserSignUpService();

    const user = request.body;

    const existUser = await userRepository.findOne({
      where: { email: user.email },
    });

    if (existUser) {
      throw new AppError("Já existe um usuário com esse e-mail", 401);
    }

    const userData = {
      ...user,
      password: md5(user.password).toString(),
    };

    const userCreate = await userRepository.save(userData);
    
    const { secret, expiresIn } = authConfig.jwt;

    createUserSignUpService.execute(user);

    const token = sign(
      {
        name: user.name,
      },
      secret,
      {
        subject: userCreate.email,
        expiresIn,
      }
    );


    return response.status(201).json({ accessToken: token });
  }
}
