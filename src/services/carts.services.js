import { cartManager } from '../DAL/DAOs/cartsDaos/CartsManagerMongo.js';

export const cartById = async (id) => {
  try {
    const cart = await cartManager.findOneById(id);
    return cart;
  } catch (error) {
    throw error;
  }
};

export const cartByIdPopulated = async (id) => {
  try {
    const cart = await cartManager.findOneByIdPopulated(id);
    return cart;
  } catch (error) {
    throw error;
  }
};

export const createOne = async () => {
  try {
    const newCart = await cartManager.createOne();
    return newCart;
  } catch (error) {
    throw error;
  }
};

export const productsToCart = async (cid, pid) => {
  try {
    const cart = await cartManager.addProductsToCart(cid, pid);
    return cart;
  } catch (error) {
    throw error;
  }
};

export const deleteProduct = async (cid, pid) => {
  try {
    const cart = await cartManager.deleteProductFromCart(cid, pid);
    return cart;
  } catch (error) {
    throw error;
  }
};

export const updateOne = async (id, products) => {
  try {
    const cart = await cartManager.updateOne(id, products);
    return cart;
  } catch (error) {
    throw error;
  }
};

export const updateOneProduct = async (id, pid, quantity) => {
  try {
    const cart = await cartManager.updateCartProduct(id, pid, quantity);
    return cart;
  } catch (error) {
    throw error;
  }
};

export const deleteAllProducts = async (id) => {
  try {
    const cart = await cartManager.deleteAllProductsFromCart(id);
    return cart;
  } catch (error) {
    throw error;
  }
};
