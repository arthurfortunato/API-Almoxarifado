import createConnection from "../../database";
import { getConnection } from "typeorm";
import { makeMockResponse } from "../../utils/mocks/mockResponse";
import { makeMockRequest } from "../../utils/mocks/mockRequest";
import { ProductFakeData } from "../../utils/mocks/ProductFakeData/productFakeData";
import { DeleteProductController } from "./DeleteProductController";

describe("DeleteProductController", () => {
  beforeAll(async () => {
    await createConnection();
  });

  afterAll(async () => {
    const connection = getConnection();
    connection.close();
  });

  const productFakeData = new ProductFakeData();
  const request = makeMockRequest({});
  const response = makeMockResponse();

  it("Deve retornar status 204 quando o produto for deletado", async () => {
    await productFakeData.createProduct();

    const deleteProductController = new DeleteProductController();

    const { id } = request.params;

    const requestProduct = makeMockRequest({
      params: { id },
    });

    await deleteProductController.handle(requestProduct, response);

    expect(response.state.status).toBe(204);
  });
});
