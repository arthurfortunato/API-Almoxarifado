import { getRepository } from "typeorm";
import { User } from "../entities/User";

import md5 from "crypto-js/md5";
import { AppError } from "../error/AppError";

interface IUserSignIn {
  email: string;
  password: string;
}

interface IUserSignUp {
  name: string;
  email: string;
  password: string;
}

export class CreateUserService {
  async signin(user: IUserSignIn) {
    const userRepository = getRepository(User);

    const { email, password } = user;
    const passwordHash = md5(password.toString());

    const existUser = await userRepository.findOne({
      where: { email: email, password: passwordHash },
    });

    if (existUser) {
      throw new AppError("Usuário não encontrado", 401);
    }

    return { user };
  }

  async signup(user: IUserSignUp) {
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

    return userData;
  }
}
