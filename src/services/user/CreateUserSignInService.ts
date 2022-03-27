import { getRepository } from "typeorm";
import { User } from "../../entities/User";

interface IUserSignIn {
  email: string;
  password: string;
}

export class CreateUserSignInService {
  async execute(user: IUserSignIn) {
    await getRepository(User)
      .createQueryBuilder()
      .where({
        email: user.email,
        password: user.password,
      })
      .getOne();

    return { user };
  }
}
