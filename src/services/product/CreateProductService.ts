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

export class CreateProductService {
  async execute(product: IProduct) {
    await getRepository(Product)
      .createQueryBuilder()
      .insert()
      .into(Product)
      .values({
        name: product.name,
        code: product.code,
        sector: product.sector,
        amount: product.amount,
        description: product.description,
      })
      .execute();

    return { product };
  }
}
