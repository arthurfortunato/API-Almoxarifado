import { getRepository } from "typeorm";
import { Product } from "../../entities/Product";

interface IProduct {
  id?: string;
  name?: string;
  code?: string;
  description?: string;
  sector?: string;
  amount?: number;
}

export class GetIdProductService {
  async execute(product: IProduct) {
    const products = await getRepository(Product)
      .createQueryBuilder()
      .select()
      .where("product.id = :id", { id: product.id })
      .getOne();

    return { products };
  }
}
