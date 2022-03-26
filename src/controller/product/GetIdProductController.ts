import { Request, Response } from "express";
import { GetIdProductService } from "../../services/product/GetIdProductService";

export class GetIdProductController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;

    const getProductService = new GetIdProductService();

    const getProducts = await getProductService.execute({ id });

    return response.json(getProducts);
  }
}
