import { Joi, Segments } from 'celebrate';
import { isValidObjectId } from 'mongoose';
import { CATEGORIES } from '../constants/categories.js';

const objectIdValidator = (value, helpers) => {
  return !isValidObjectId(value) ? helpers.message('Invalid id format') : value;
};

export const updateProductSchema = {
  [Segments.PARAMS]: Joi.object({
    productId: Joi.string().custom(objectIdValidator).required(),
  }),
  [Segments.BODY]: Joi.object({
    name: Joi.string().min(2).messages({
      'string.base': 'Name must be a string',
      'string.min': 'Name should have at least {#limit} characters',
    }),
    price: Joi.number().min(0.01).messages({
      'number.base': 'Price must be a number',
      'number.min': 'Price must be at least {#limit}',
    }),
    category: Joi.string()
      .valid(...CATEGORIES)
      .messages({
        'any.only': `Category must be one of: ${CATEGORIES.join(',')}`,
      }),
    description: Joi.string().allow('').messages({
      'string.base': 'Description must be a string',
    }),
  }).min(1),
};

export const productIdSchema = {
  [Segments.PARAMS]: Joi.object({
    productId: Joi.string().custom(objectIdValidator).required(),
  }),
};

export const createProductSchema = {
  [Segments.BODY]: Joi.object({
    name: Joi.string().min(2).required().messages({
      'string.base': 'Name must be a string',
      'string.min': 'Name should have at least {#limit} characters',
      'any.required': 'Name is required',
    }),
    price: Joi.number().min(0.01).required().messages({
      'number.base': 'Price must be a number',
      'number.min': 'Price must be at least {#limit}',
      'any.required': 'Price is required',
    }),
    category: Joi.string()
      .valid(...CATEGORIES)
      .required()
      .messages({
        'any.only': `Category must be one of: ${CATEGORIES.join(',')}`,
        'any.required': 'Category is required',
      }),
    description: Joi.string().allow('').messages({
      'string.base': 'Description must be a string',
    }),
  }),
};

export const getAllProductsSchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    perPage: Joi.number().integer().min(5).max(20).default(10),
    category: Joi.string()
      .valid(...CATEGORIES)
      .optional(),
    search: Joi.string().trim().optional().allow(''),
  }),
};
