import { Request, Response } from "express";
import { AppError } from "../../error/AppError";
import { UpdateProductService } from "../../services/product/UpdateProductService";

export class UpdateProductController {
  async handle(request: Request, response: Response) {

    const { id } = request.params;

    const updateProductService = new UpdateProductService();

    const { name, code, sector, amount, description } = request.body;

    if (name === "" || !name) {
      throw new AppError("Enter the product name", 404);
    }
    if (code === "" || !code) {
      throw new AppError("Enter the product code", 404);
    }
    if (sector === "" || !sector) {
      throw new AppError("Enter the product sector", 404);
    }
    if (amount === "" || !amount) {
      throw new AppError("Enter the product amount", 404);
    }
    if (description === "" || !description) {
      throw new AppError("Enter the product description", 404);
    }

    const updateProduct = await updateProductService.execute({
      id,
      name,
      code,
      sector,
      amount,
      description,
    });
    return response.status(201).json(updateProduct);
  }
}
