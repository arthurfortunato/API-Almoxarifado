import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Product } from "../entities/Product";
import { CreateProductServices } from "../services/CreateProductServices";

export class CreateProductController {
  async handle(request: Request, response: Response) {
    const product = request.body;
    
    const createProductService = new CreateProductServices();
    
    // @ts-ignore
    const products = await createProductService.newProduct(product);
    
    // @ts-ignore
    return response.json(products);
  }
  
  async getProducts(request: Request, response: Response) {
    const productService = new CreateProductServices();
    
    const getProducts = await productService.getProducts();
    
    // @ts-ignore
    return response.json(getProducts);
  }
  
  async updatedProduct(request: Request, response: Response) {
    const productRepository = getRepository(Product);
    // @ts-ignore
    const { id } = request.params;
    
    // @ts-ignore
    const { name, code, sector, description, amount } = request.body;
    
    const currentProduct = await productRepository.findOneOrFail(id);

    currentProduct.name = name;
    currentProduct.code = code;
    currentProduct.sector = sector;
    currentProduct.description = description;
    currentProduct.amount = amount;
    
    await productRepository.save(currentProduct);
    
    // @ts-ignore
    return response.send(currentProduct);
  }

  async destroy(request: Request, response: Response) {
    const productRepository = getRepository(Product);
    
    // @ts-ignore
    const product = await productRepository.delete(request.params.code);
    
    // @ts-ignore
    return response.send(product);
  }
}
