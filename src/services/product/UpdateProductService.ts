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

export class UpdateProductService {
  async execute(product: IProduct) {
    await getRepository(Product)
      .createQueryBuilder()
      .update(Product)
      .set({
        name: product.name,
        code: product.code,
        sector: product.sector,
        description: product.description,
        amount: product.amount,
      })
      .where("id = :id", { id: product.id })
      .execute();

    return { product };
  }
}
