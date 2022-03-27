import { getConnection } from "typeorm";
import createConnection from "../../database";
import { GetProductService } from "./GetProductService";
import { ProductFakeData } from "../../utils/mocks/ProductFakeData/productFakeData";

describe("GetAllUserService", () => {
  beforeAll(async () => {
    await createConnection();
  });

  afterAll(async () => {
    const connection = getConnection();
    await connection.query("DELETE FROM products");
    await connection.close();
  });

  const productFakeData = new ProductFakeData();

  it("Deve retornar todos os produtos cadastrados", async () => {
    const getProductService = new GetProductService();

    await productFakeData.execute()

    const products = [
      {
        name: "Algum produto",
        code: "123",
        sector: "PR",
        amount: 1234,
        description: "alguma descrição",
      },
      {
        name: "Outro produto",
        code: "456",
        sector: "Diretoria",
        amount: 456,
        description: "alguma descrição",
      },
      {
        name: "produto",
        code: "898",
        sector: "Diretoria Científica",
        amount: 123,
        description: "alguma descrição",
      },
    ];

    const result = await getProductService.execute();

    console.log(result);

    expect(result).toMatchObject(products);
  });
});
