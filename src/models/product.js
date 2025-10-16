import { Schema } from 'mongoose';
import { model } from 'mongoose';
import { CATEGORIES } from '../constants/categories.js';

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: CATEGORIES,
      default: 'other',
    },
    description: {
      type: String,
      required: false,
      default: '',
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Product = model('Product', productSchema);
