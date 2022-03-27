import { Request, Response } from "express";
import { UpdateProductService } from "../../services/product/UpdateProductService";

export class UpdateProductController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;

    const updateProductService = new UpdateProductService();

    const { name, code, sector, amount, description } = request.body;

    await updateProductService.execute({
      id,
      name,
      code,
      sector,
      amount,
      description,
    });
    return response.status(201).json();
  }
}
