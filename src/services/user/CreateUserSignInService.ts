import { getRepository } from "typeorm";
import { User } from "../../entities/User";
import { AppError } from "../../error/AppError";

import { sign } from "jsonwebtoken";
import md5 from "crypto-js/md5";
import authConfig from "../../config/auth";

interface IUserSignIn {
  email: string;
  password: string;
}

export class CreateUserSignInService {
  async execute(user: IUserSignIn) {
    const userRepository = getRepository(User);

    const { email, password } = user;
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

    return { accessToken: token };
  }
}