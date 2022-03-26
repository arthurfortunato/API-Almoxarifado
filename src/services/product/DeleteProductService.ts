import { getRepository } from "typeorm";
import { Product } from "../../entities/Product";


interface IProduct {
  id: string;
  name: string;
  code: string;
  description: string;
  sector: string;
  amount: number;
}

export class DeleteProductService {
  async execute({ id }: IProduct) {
    const productRepository = getRepository(Product)
      .createQueryBuilder()
      .delete()
      .from(Product)
      .where("id = :id", { id })
      .execute();

    return productRepository;
  }
}
