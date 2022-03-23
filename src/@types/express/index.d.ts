declare module "cors";
declare module "express";
declare module "uuid";
declare module Express {
  export interface Request {
    user: {
      id: string;
      email: string;
    };
  }
}
