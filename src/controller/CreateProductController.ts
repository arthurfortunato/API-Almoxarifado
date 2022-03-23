import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Product } from "../entities/Product";
import { CreateProductServices } from "../services/CreateProductServices";

export class CreateProductController {
  async handle(request: Request, response: Response) {
    const product = request.body;

    const createProductService = new CreateProductServices();

    const products = await createProductService.newProduct(product);

    return response.json(products);
  }

  async getProducts(request: Request, response: Response) {
    const productService = new CreateProductServices();

    const getProducts = await productService.getProducts();

    return response.json(getProducts);
  }

  async updatedProduct(request: Request, response: Response) {
    const productRepository = getRepository(Product);
    const { id } = request.params;

    const { name, code, sector, description, amount } = request.body;

    const currentProduct = await productRepository.findOneOrFail(id);

    currentProduct.name = name;
    currentProduct.code = code;
    currentProduct.sector = sector;
    currentProduct.description = description;
    currentProduct.amount = amount;

    await productRepository.save(currentProduct);

    return response.send(currentProduct);
  }

  async destroy(request: Request, response: Response) {
    const productRepository = getRepository(Product);

    const product = await productRepository.delete(request.params.code);

    return response.send(product);
  }
}
