import { CreateProductService } from "../../../services/product/CreateProductService";

export class ProductFakeData {
  createProductService = new CreateProductService();

  async execute() {
    await this.createProductService.execute({
      name: "Algum produto",
      code: "123",
      sector: "PR",
      amount: 1234,
      description: "alguma descrição",
    });

    await this.createProductService.execute({
      name: "Outro produto",
      code: "456",
      sector: "Diretoria",
      amount: 456,
      description: "alguma descrição",
    });

    await this.createProductService.execute({
      name: "produto",
      code: "898",
      sector: "Diretoria Científica",
      amount: 123,
      description: "alguma descrição",
    });
  }

  async createProduct() {
    const product = await this.createProductService.execute({
      name: "Algum produto",
      code: "123",
      sector: "PR",
      amount: 1234,
      description: "alguma descrição",
    });

    return product;
  }
}
