import { Product } from '../models/product.js';
import createHttpError from 'http-errors';

// Отримати список усіх продуктів
export const getProducts = async (req, res) => {
  const products = await Product.find();
  res.status(200).json(products);
};

// Отримати одного продукт за id
export const getProductById = async (req, res, next) => {
  const { productId } = req.params;
  const product = await Product.findById(productId);

  if (!product) {
    next(createHttpError(404, 'Product not found'));
    return;
  }

  res.status(200).json(product);
};

export const createProduct = async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json(product);
};

export const deleteProduct = async (req, res, next) => {
  const { productId } = req.params;
  const product = await Product.findOneAndDelete({
    _id: productId,
  });

  if (!product) {
    next(createHttpError(404, 'Product not found'));
    return;
  }

  res.status(200).send(product);
};

export const updateProduct = async (req, res, next) => {
  const { productId } = req.params;

  const product = await Product.findOneAndUpdate(
    { _id: productId }, // Шукаємо по id
    req.body,
    { new: true }, // повертаємо оновлений документ
  );

  if (!product) {
    next(createHttpError(404, 'Product not found'));
    return;
  }

  res.status(200).json(product);
};
