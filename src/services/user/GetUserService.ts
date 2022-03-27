import { getRepository } from "typeorm";
import { User } from "../../entities/User";

export class GetUserService {
  async execute(user: Partial<User>) {
    await getRepository(User)
      .createQueryBuilder()
      .where({
        email: user.email,
      })
      .getOne();

    return { user };
  }
}
