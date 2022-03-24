import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Product } from "../entities/Product";
import { CreateProductServices } from "../services/CreateProductServices";

export class CreateProductController {
  async createProduct(request: Request, response: Response) {
    const product = request.body;

    const createProductService = new CreateProductServices();

    const products = await createProductService.newProduct(product);

    return response.json(products);
  }

  async getProduct(request: Request, response: Response) {
    const productService = new CreateProductServices();

    const getProducts = await productService.getProduct();

    return response.json(getProducts);
  }

  async getProductId(request: Request, response: Response) {
    const productRepository = getRepository(Product);
    const { id } = request.params;

    const currentProduct = await productRepository.findOneOrFail(id);

    return response.json(currentProduct);
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

    const { id } = request.params;

    const product = await productRepository.delete(id);

    return response.send(product);

  }
}
