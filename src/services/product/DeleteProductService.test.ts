import { getConnection } from "typeorm";
import createConnection from "../../database";
import { DeleteProductService } from "./DeleteProductService";
import { ProductFakeData } from "../../utils/mocks/ProductFakeData/productFakeData";
import { makeMockRequest } from "../../utils/mocks/mockRequest";

describe("DeleteProductService", () => {
  beforeAll(async () => {
    await createConnection();
  });

  afterAll(async () => {
    const connection = getConnection();
    await connection.query("DELETE FROM products");
    await connection.close();
  });

  const productFakeData = new ProductFakeData();
  const request = makeMockRequest({});

  it("Deve retornar o ID do produto deletado", async () => {
    await productFakeData.createProduct();

    const deleteProductService = new DeleteProductService();

    const { id } = request.params;

    const result = await deleteProductService.execute({ id });

    expect(result).toEqual(id);
  });
});
