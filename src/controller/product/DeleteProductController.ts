import { Request, Response } from "express";
import { DeleteProductService } from "../../services/product/DeleteProductService";

export class DeleteProductController {
  async handle(request: Request, response: Response) {
    const deleteProductService = new DeleteProductService();

    const { id } = request.params;

    const { name, sector, code, description, amount } = request.body;

    await deleteProductService.execute({
      id,
      name,
      sector,
      code,
      description,
      amount,
    });

    return response.status(204).json();
  }
}
