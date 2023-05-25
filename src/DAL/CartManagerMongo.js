import mongoose from 'mongoose';
import { cartModel } from './models/carts.model.js';
import ProductManager from './ProductManagerMongo.js';

class CartManager {
  getCartById = async (id) => {
    try {
      const cart = await cartModel.findOne({ _id: id });
      return cart;
    } catch (error) {
      return error;
    }
  };

  getCartByIdPopulated = async (id) => {
    try {
      const cart = await cartModel.findOne({ _id: id }).populate('products.product');
      return cart;
    } catch (error) {
      return error;
    }
  };

  addCarts = async () => {
    try {
      const newCarts = await cartModel.create({ products: [] });
      return newCarts;
    } catch (error) {
      return error;
    }
  };

  addProductsToCart = async (cid, pid) => {
    try {
      const cart = await this.getCartById(cid);
      if (!cart) {
        return "Error: Cart doesn't exist";
      } else {
        const productManager = new ProductManager();
        const prod = await productManager.findById(pid);
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
        await cartModel.findOneAndUpdate({ _id: cid }, cart);
        return cart;
      }
    } catch (error) {
      return error;
    }
  };

  deleteProductFromCart = async (cid, pid) => {
    try {
      const cart = await this.getCartById(cid);
      if (!cart) {
        throw new Error("Error: Cart doesn't exist");
      }
      cart.products = cart.products.filter(({ product }) => !product.equals(pid));
      cart.save();
      return cart;
    } catch (error) {
      return error;
    }
  };

  updateCart = async (id, products) => {
    try {
      const cart = await cartModel.findOneAndUpdate(
        { _id: id },
        { products },
        { new: true } // return the updated document instead of the old one
      );
      return cart;
    } catch (error) {
      return error;
    }
  };

  updateCartProduct = async (id, pid, quantity) => {
    try {
      const cart = await cartModel.findOne({ _id: id });
      const product = cart.products.find(({ product }) => product.equals(pid));
      if (product) {
        product.quantity = quantity;
        await cart.save();
      }
      return cart;
    } catch (error) {
      return error;
    }
  };

  deleteAllProductsFromCart = async (id) => {
    try {
      const cart = await this.getCartById(id);
      if (!cart) {
        throw new Error("Error: Cart doesn't exist");
      }
      cart.products = [];
      cart.save();
      return cart;
    } catch (error) {
      return error;
    }
  };
}

export default CartManager;
