import { NextFunction, Request, Response } from "express";
import { AppError } from '../error/AppError';

import authConfig from '../config/auth';
import { verify } from "jsonwebtoken";

interface ITokenPayload {
  email: string;
  iat: number;
  exp: number;
  sub: string;
}

export function userAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError('Não foi enviado o JWT', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, authConfig.jwt.secret);

    const { sub, email } = decoded as ITokenPayload;

    req.user = {
      id: sub,
      email
    };

    return next()

  } catch (error) {
    throw new AppError('token JWT inválido', 401);
  }
}