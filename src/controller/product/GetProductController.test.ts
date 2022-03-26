import createConnection from "../../database";
import { getConnection } from "typeorm";
import { makeMockRequest } from "../../utils/mocks/mockRequest";
import { makeMockResponse } from "../../utils/mocks/mockResponse";
import { GetProductController } from "./GetProductController";
import { ProductFakeData } from "../../utils/mocks/ProductFakeData/productFakeData";

describe("GetAllUserController", () => {
  beforeAll(async () => {
    await createConnection();
  });

  afterAll(async () => {
    const connection = getConnection();
    await connection.query("DELETE FROM products");
    await connection.close();
  });

  const productFakeData = new ProductFakeData();

  it("Deve retornar status 200 quando pegar todos os usuários", async () => {
    await productFakeData.execute();

    const getAllUserController = new GetProductController();

    const request = makeMockRequest({});

    const response = makeMockResponse();

    await getAllUserController.handle(request, response);

    expect(response.state.status).toBe(200);
  });
});
