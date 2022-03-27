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

  it("A edição deve ser igual  ao produto já existente", async () => {
   const product = await productFakeData.createProduct();

    const updateUserService = new UpdateProductService();

    const { id } = request.params;

    const result = await updateUserService.execute({
      id: id,
      name: "Algum produto",
      code: "123",
      sector: "PR",
      amount: 1234,
      description: "alguma descrição",
    });
    console.log(result)
    expect(result).toEqual(product);
  });

  it("O produto editado deve ser diferente do produto já existente", async () => {
   const product = await productFakeData.createProduct();

    const updateUserService = new UpdateProductService();

    const { id } = request.params;

    const result = await updateUserService.execute({
      id: id,
      name: "Outro produto",
      code: "456",
      sector: "DC",
      amount: 56,
      description: "alguma descrição",
    });
    console.log(result)
    expect(result).not.toEqual(product);
  });
});
