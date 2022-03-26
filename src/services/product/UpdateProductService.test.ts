import createConnection from "../../database";
import { getConnection } from "typeorm";
import { UpdateProductService } from "./UpdateProductService";
import { ProductFakeData } from "../../utils/mocks/ProductFakeData/productFakeData";
import { makeMockRequest } from "../../utils/mocks/mockRequest";

describe("UpdateUserService", () => {
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

  it("Deve editar o produto", async () => {
    await productFakeData.createProduct();

    const updateUserService = new UpdateProductService();

    const { id } = request.params;

    const result = await updateUserService.execute({
      id: id,
      sector: "teste",
      amount: 152,
      code: "0001",
      description: "teste",
      name: "teste",
    });
    console.log(result)
    expect(result);
  });
});
