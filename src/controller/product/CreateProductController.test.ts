import { getConnection } from "typeorm";
import createConnection from "../../database";
import { CreateProductController } from "./CreateProductController";
import { Request } from "express";
import { makeMockResponse } from "../../utils/mocks/mockResponse";
import { AppError } from "../../error/AppError";

describe("CreateProductController", () => {
  beforeAll(async () => {
    const connection = await createConnection();
    await connection.query('DELETE FROM products')
  });

  afterAll(async () => {
    const connection = getConnection();
    await connection.query("DELETE FROM products");
    await connection.close();
  });

  const createProductController = new CreateProductController();

  const response = makeMockResponse();
  it("Deve retornar status 201 quando o usuário for criado", async () => {
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
