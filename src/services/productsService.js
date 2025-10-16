import { Product } from '../models/product.js';

export const getProductsService = async (req) => {
  const { page = 1, perPage = 10, category = '', search = '' } = req.query;

  const skip = (page - 1) * perPage;

  const productsQuery = Product.find();

  if (category) {
    productsQuery.where('category').equals(category);
  }
  if (search && search.trim() !== '') {
    productsQuery.or([
      { title: { $regex: search, $options: 'i' } },
      { content: { $regex: search, $options: 'i' } },
    ]);
  }

  const [totalProducts, products] = await Promise.all([
    productsQuery.clone().countDocuments(),
    productsQuery.skip(skip).limit(perPage),
  ]);

  const totalPages = Math.ceil(totalProducts / perPage);
  return {
    page,
    perPage,
    totalProducts,
    totalPages,
    products,
  };
};

export const getProductByIdService = async (req) => {
  const { productId } = req.params;
  return await Product.findOne({
    _id: productId,
    userId: req.user._id,
  });
};

export const createProductService = async (req) => {
  const { body } = req;
  return await Product.create({ ...body, userId: req.user._id });
};

export const deleteProductByIdService = async (req) => {
  const { productId } = req.params;
  return await Product.findOneAndDelete({
    _id: productId,
    userId: req.user._id,
  });
};

export const updateProductByIdService = async (req) => {
  const { productId } = req.params;
  const { body } = req;
  return await Product.findOneAndUpdate(
    { _id: productId, userId: req.user._id }, // Шукаємо по id
    body,
    { new: true }, // повертаємо оновлений документ
  );
};
