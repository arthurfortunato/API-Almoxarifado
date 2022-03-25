import { getRepository } from "typeorm";
import { Product } from "../entities/Product";
import { AppError } from "../error/AppError";

interface IProduct {
  id: string;
  name: string;
  code: string;
  description: string;
  sector: string;
  amount: number;
}

export class CreateProductServices {
  async newProduct(product: IProduct) {
    const productRepository = getRepository(Product);

    if (!product.name) {
      throw new AppError("Enter the product name", 404);
    }
    if (!product.code) {
      throw new AppError("Incorrect Code", 404);
    }
    if (!product.sector) {
      throw new AppError("Incorrect Sector", 404);
    }
    if (!product.amount) {
      throw new AppError("Incorrect Price", 404);
    }
    if (!product.description) {
      throw new AppError("Incorrect Description", 404);
    }

    const productAlreadyExists = await productRepository.findOne({
      where: { code: product.code },
    });

    if (productAlreadyExists) {
      throw new AppError("Existing product");
    }

    await productRepository.save(product);

    return { product };
  }

  async getProduct() {
    const productRepository = getRepository(Product);

    const currentProduct = await productRepository.find();

    if (!currentProduct) {
      throw new AppError("Product not found", 404);
    }

    return currentProduct;
  }
}
