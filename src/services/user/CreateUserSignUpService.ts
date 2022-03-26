import { getRepository } from "typeorm";
import { User } from "../../entities/User";
import { AppError } from "../../error/AppError";

import { sign } from "jsonwebtoken";
import md5 from "crypto-js/md5";
import authConfig from "../../config/auth";

interface IUserSignUp {
  name: string;
  email: string;
  password: string;
}

export class CreateUserSignUpService {
  async execute(user: IUserSignUp) {
    const userRepository = getRepository(User);

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

    return { accessToken: token };
  }
}
