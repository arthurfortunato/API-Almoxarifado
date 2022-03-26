import { Request, Response } from "express";
import { GetProductService } from "../../services/product/GetProductService";

export class GetProductController {
  async handle(request: Request, response: Response) {
        
    const getProductService = new GetProductService();

    const getProducts = await getProductService.execute();

    return response.status(200).json(getProducts);
  }
}
