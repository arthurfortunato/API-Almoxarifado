import { getRepository } from "typeorm";
import { Product } from "../../entities/Product";

interface IProduct {
  id: string;
}

export class DeleteProductService {
  async execute({ id }: IProduct) {
    await getRepository(Product)
      .createQueryBuilder()
      .delete()
      .from(Product)
      .where("id = :id", { id })
      .execute();

    return id;
  }
}
