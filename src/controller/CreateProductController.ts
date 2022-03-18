import { Request, Response } from "express";
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
}
