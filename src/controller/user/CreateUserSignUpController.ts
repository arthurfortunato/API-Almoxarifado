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

    if(!user.name) {
      throw new AppError("Enter the username", 404)
    }

    if(!user.email) {
      throw new AppError("Enter email", 404)
    }

    if(!user.password) {
      throw new AppError("Enter password", 404)
    }

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
    
    const { secret, expiresIn } = authConfig.jwt;

    createUserSignUpService.execute(userData);

    const token = sign(
      {
        name: user.name,
      },
      secret,
      {
        subject: user.email,
        expiresIn,
      }
    );


    return response.status(201).json({ accessToken: token });
  }
}
