import { getRepository } from "typeorm";
import { User } from "../../entities/User";

interface IUserSignUp {
  name: string;
  email: string;
  password: string;
}

export class CreateUserSignUpService {
  async execute(user: IUserSignUp) {
    await getRepository(User)
      .createQueryBuilder()
      .insert()
      .into(User)
      .values({
        name: user.name,
        email: user.email,
        password: user.password,
      })
      .execute();

    return { user };
  }
}
