import { Router } from 'express';
import { productRoutes } from './product.routes';

const routes = Router();

routes.use('/product', productRoutes);

export { routes }

