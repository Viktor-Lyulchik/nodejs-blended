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
  const products = await getProductsService(req);
  res.status(200).json(products);
};

// Отримати одного продукт за id
export const getProductById = async (req, res, next) => {
  const product = await getProductByIdService(req);

  if (!product) {
    throw createHttpError(404, 'Product not found');
  }

  res.status(200).json(product);
};

export const createProduct = async (req, res) => {
  const product = await createProductService(req);
  res.status(201).json(product);
};

export const deleteProduct = async (req, res, next) => {
  const product = await deleteProductByIdService(req);

  if (!product) {
    throw createHttpError(404, 'Product not found');
  }

  res.status(200).send(product);
};

export const updateProduct = async (req, res, next) => {
  const product = await updateProductByIdService(req);

  if (!product) {
    throw createHttpError(404, 'Product not found');
  }

  res.status(200).json(product);
};
