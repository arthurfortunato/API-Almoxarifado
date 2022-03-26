import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Product } from "../../entities/Product";
import { AppError } from "../../error/AppError";
import { CreateProductService } from "../../services/product/CreateProductService";

export class CreateProductController {
  async handle(request: Request, response: Response) {
    const product = request.body;
    const createProductService = new CreateProductService();
    const productRepository = getRepository(Product);

    if (!product.name) {
      throw new AppError("Enter the product name", 404);
    }
    if (!product.code) {
      throw new AppError("Enter the product code", 404);
    }
    if (!product.sector) {
      throw new AppError("Enter the product sector", 404);
    }

    if (!product.amount) {
      throw new AppError("Enter the product price", 404);
    }
    if (!product.description) {
      throw new AppError("Enter the product description", 404);
    }

    const existProduct = await productRepository.findOne({
      where: { code: product.code },
    });

    if (existProduct) {
      throw new AppError("Product code already exists", 401);
    }

    const products = await createProductService.execute(product);
    return response.status(201).json(products);
  }
}
