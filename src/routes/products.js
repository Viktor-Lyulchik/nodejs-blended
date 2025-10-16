import { Router } from 'express';
import {
  createProductSchema,
  getAllProductsSchema,
  productIdSchema,
  updateProductSchema,
} from '../validations/productsValidation.js';
import {
  getProducts,
  getProductById,
  createProduct,
  deleteProduct,
  updateProduct,
} from '../controllers/productsController.js';

import { celebrate } from 'celebrate';
import { authenticate } from '../middleware/authenticate.js';

const router = Router();

router.use('/products', authenticate);

router.get('/products', celebrate(getAllProductsSchema), getProducts);
router.get('/products/:productId', celebrate(productIdSchema), getProductById);
router.post('/products', celebrate(createProductSchema), createProduct);
router.delete(
  '/products/:productId',
  celebrate(productIdSchema),
  deleteProduct,
);
router.patch(
  '/products/:productId',
  celebrate(updateProductSchema),
  updateProduct,
);

export default router;
