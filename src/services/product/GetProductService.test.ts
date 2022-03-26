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
    await productFakeData.execute();

    const getProductService = new GetProductService();

    const result = await getProductService.execute();
    console.log(result);
    expect(result).toHaveProperty("products");
  });
});
