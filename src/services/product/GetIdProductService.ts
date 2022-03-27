import { getRepository } from "typeorm";
import { Product } from "../../entities/Product";

interface IProduct {
  id: string;
}

export class GetIdProductService {
  async execute({ id }: IProduct) {
    const products = await getRepository(Product)
      .createQueryBuilder()
      .select()
      .where("product.id = :id", { id: id })
      .getOne();

    return products;
  }
}
