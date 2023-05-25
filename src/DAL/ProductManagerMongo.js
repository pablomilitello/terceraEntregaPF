import { productModel } from './models/products.model.js';
import { TRUE, FALSE } from '../utils.js';

class ProductManager {
  findAll = async (limit, page, sort, category, availability, lean = false) => {
    try {
      const options = { page, limit, lean };
      if (sort) {
        options.sort = { price: sortDir };
      }
      const query = {};
      if (category) {
        query.category = { $regex: new RegExp(`${category}`, 'i') };
      }

      if (availability === TRUE) {
        query.stock = { $gt: 0 };
      } else if (availability === FALSE) {
        query.stock = 0;
      }
      const products = await productModel.paginate(query, options);
      return products;
    } catch (error) {
      return error;
    }
  };

  findById = async (id) => {
    try {
      const product = await productModel.findOne({ _id: id });
      return product;
    } catch (error) {
      return error;
    }
  };

  createOne = async (obj) => {
    try {
      const newProduct = await productModel.create(obj);
      return newProduct;
    } catch (error) {
      return error;
    }
  };

  aggregationFun = async () => {
    try {
      const response = await productModel.aggregate();
      return response;
    } catch (error) {
      return error;
    }
  };

  updateOne = async (id, obj) => {
    try {
      const product = await productModel.findOneAndUpdate({ _id: id }, obj);
      return product;
    } catch (error) {
      return error;
    }
  };

  deleteAll = async () => {
    try {
      await productModel.deleteMany();
      return 'Products deleted';
    } catch (error) {
      return error;
    }
  };

  deleteOne = async (id) => {
    try {
      await productModel.deleteOne({ _id: id });
      return 'Product deleted';
    } catch (error) {
      return error;
    }
  };
}

export default ProductManager;
