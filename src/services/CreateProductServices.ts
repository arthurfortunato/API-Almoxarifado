import { getRepository } from "typeorm";
import { Product } from "../entities/Product";

interface IProduct {
  name: string;
  code: string;
  description: string;
  sector: string;
  amount: number;
}

export class CreateProductServices {
  async newProduct(product: IProduct) {
    const productRepository = getRepository(Product);

    const productAlreadyExists = await productRepository.findOne({
      where: { code: product.code },
    });

    
    if (productAlreadyExists) {
      throw new Error('Existing product');
    }

    await productRepository.save(product);

    return { product };
  }
}
