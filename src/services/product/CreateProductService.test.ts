import { getConnection } from "typeorm";
import createConnection from "../../database";
import { CreateProductService } from "./CreateProductService";

describe("CreateProductService", () => {
  beforeAll(async () => {
    await createConnection();
  });

  afterAll(async () => {
    const connection = getConnection();
    await connection.query("DELETE FROM products");
    await connection.close();
  });

  it("Deve retornar o produto criado", async () => {
    const createProductService = new CreateProductService();

    const result = await createProductService.execute({
      name: "Algum usuário",
      code: "1234",
      sector: "PR",
      amount: 1234,
      description: "alguma descrição",
    });
    console.log(result);
    expect(result).toHaveProperty("product");
  });
});
