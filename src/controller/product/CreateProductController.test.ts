import { getConnection } from "typeorm";
import createConnection from "../../database";
import { Request } from "express";

import { CreateProductController } from "./CreateProductController";
import { makeMockResponse } from "../../utils/mocks/mockResponse";

describe("CreateProductController", () => {
  beforeAll(async () => {
   await createConnection();
  });

  afterAll(async () => {
    const connection = getConnection();
    await connection.query("DELETE FROM products");
    await connection.close();
  });

  const createProductController = new CreateProductController();

  const response = makeMockResponse();
  it("Deve retornar status 201 quando o produto for criado", async () => {
    const request = {
      body: {
        name: "Produto",
        code: "0001",
        sector: "PR",
        amount: 100,
        description: "Produto",
      },
    } as Request;

    await createProductController.handle(request, response);

    expect(response.state.status).toBe(201);
  });
});
