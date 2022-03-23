declare module 'cors';
declare namespace Express {
  export interface Request {
    user: {
      id: string;
      email: string;
    };
  }
}