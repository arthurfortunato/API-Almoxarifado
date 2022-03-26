import { getRepository } from "typeorm";
import { User } from "../../entities/User";
import { AppError } from "../../error/AppError";

export class GetUserService {
  async execute(user: Partial<User>) {
    const userRepository = getRepository(User);
    const currentUser = await userRepository.findOne({
      where: { email: user.email },
    });

    if (!currentUser) {
      throw new AppError("User not found", 401);
    }
    delete currentUser.password;

    return currentUser;
  }
}
