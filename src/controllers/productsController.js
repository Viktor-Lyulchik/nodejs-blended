import { Product } from '../models/product.js';
import createHttpError from 'http-errors';
import {
  createProductService,
  deleteProductByIdService,
  getProductByIdService,
  getProductsService,
  updateProductByIdService,
} from '../services/productsService.js';

// Отримати список усіх продуктів
export const getProducts = async (req, res) => {
  const products = await getProductsService();
  res.status(200).json(products);
};

// Отримати одного продукт за id
export const getProductById = async (req, res, next) => {
  const { productId } = req.params;
  const product = await getProductByIdService(productId);

  if (!product) {
    throw createHttpError(404, 'Product not found');
    // next(createHttpError(404, 'Product not found'));
    // return;
  }

  res.status(200).json(product);
};

export const createProduct = async (req, res) => {
  const product = await createProductService(req.body);
  res.status(201).json(product);
};

export const deleteProduct = async (req, res, next) => {
  const { productId } = req.params;
  const product = await deleteProductByIdService({
    _id: productId,
  });

  if (!product) {
    throw createHttpError(404, 'Product not found');
    // next(createHttpError(404, 'Product not found'));
    // return;
  }

  res.status(200).send(product);
};

export const updateProduct = async (req, res, next) => {
  const { productId } = req.params;

  const product = await updateProductByIdService({ productId, body: req.body });

  if (!product) {
    throw createHttpError(404, 'Product not found');
    // next(createHttpError(404, 'Product not found'));
    // return;
  }

  res.status(200).json(product);
};
