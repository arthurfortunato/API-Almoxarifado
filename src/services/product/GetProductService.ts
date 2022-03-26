import { getRepository } from "typeorm";
import { Product } from "../../entities/Product";

export class GetProductService {
  async execute() {
    const products = await getRepository(Product)
      .createQueryBuilder()
      .select()
      .getMany();

    return { products };
  }
}
