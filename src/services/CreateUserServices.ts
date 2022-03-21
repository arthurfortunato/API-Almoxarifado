import { getRepository } from "typeorm";
import { User } from "../entities/User";
import { AppError } from "../error/AppError";

import { sign } from "jsonwebtoken";
import md5 from "crypto-js/md5";
import authConfig from "../config/auth";

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
    const passwordHash = md5(password).toString();

    const existUser = await userRepository.findOne({
      where: { email, password: passwordHash },
    });

    if (!existUser) {
      throw new AppError("Usuário não encontrado", 401);
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
    // @ts-expect-error ignora
    delete existUser.password;

    return { accessToken: token };
  }

  async signup(user: IUserSignUp) {
    const userRepository = getRepository(User);

    const existUser = await userRepository.findOne({ where: { email: user.email } })

    if (existUser) {
      throw new AppError('Já existe um usuário com esse e-mail', 401)
    }

    const userData = {
      ...user,
      password: md5(user.password).toString()
    }

    const userCreate = await userRepository.save(userData);

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({
      name: user.name,
    }, secret, {
      subject: userCreate.email,
      expiresIn,
    })

    return { token }
  }

  async getUsers() {
    const productRepository = getRepository(User);

    const currentUser = await productRepository.find()

    if (!currentUser) {
      throw new AppError('User not found', 401);
    }

    return currentUser;
  }
}
