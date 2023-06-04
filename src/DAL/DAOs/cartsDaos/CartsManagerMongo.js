import mongoose from 'mongoose';
import { cartsModel } from '../../mongoDB/models/carts.model.js';
import { productManager } from '../productsDaos/ProductsManagerMongo.js';
import BasicManager from '../basicDaos/BasicManager.js';
export default class CartManager extends BasicManager {
  constructor(model) {
    super(model);
  }

  findOneByIdPopulated = async (id) => {
    try {
      const cart = await cartsModel.findOne({ _id: id }).populate('products.product');
      return cart;
    } catch (error) {
      throw error;
    }
  };

  async createOne() {
    try {
      const newCarts = await cartsModel.create({ products: [] });
      return newCarts;
    } catch (error) {
      throw error;
    }
  }

  addProductsToCart = async (cid, pid) => {
    try {
      const cart = await cartsModel.findById(cid);
      if (!cart) {
        return "Error: Cart doesn't exist";
      } else {
        const prod = await productManager.findOneById(pid);
        if (!prod) {
          return "Error: Product doesn't exist";
        }
        const productItem = cart.products.find((p) => p.product.equals(pid));
        if (!productItem) {
          cart.products.push({
            product: new mongoose.Types.ObjectId(pid),
            quantity: 1,
          });
        } else {
          productItem.quantity++;
        }
        await cartsModel.findOneAndUpdate({ _id: cid }, cart);
        return cart;
      }
    } catch (error) {
      throw error;
    }
  };

  deleteProductFromCart = async (cid, pid) => {
    try {
      const cart = await cartsModel.findById(cid);

      if (!cart) {
        throw new Error("Error: Cart doesn't exist");
      }
      cart.products = cart.products.filter(({ product }) => !product.equals(pid));
      await cart.save();
      return cart;
    } catch (error) {
      throw error;
    }
  };

  updateCartProduct = async (id, pid, quantity) => {
    try {
      const cart = await cartsModel.findOne({ _id: id });
      const product = cart.products.find(({ product }) => product.equals(pid));
      if (product) {
        product.quantity = quantity;
        await cart.save();
      }
      return cart;
    } catch (error) {
      throw error;
    }
  };

  deleteAllProductsFromCart = async (id) => {
    try {
      const cart = await cartsModel.findById(id);
      if (!cart) {
        throw new Error("Error: Cart doesn't exist");
      }
      cart.products = [];
      await cart.save();
      return cart;
    } catch (error) {
      throw error;
    }
  };
}

export const cartManager = new CartManager(cartsModel);
