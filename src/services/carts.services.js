import { cartManager } from '../DAL/DAOs/cartsDaos/CartsManagerMongo.js';
import { ticketManager } from '../DAL/DAOs/ticketDaos/TicketsManagerMongo.js';

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

export const purchaseCart = async (cart, user) => {
  let amount = 0;
  const productsWithoutStock = [];
  for (const cartItem of cart.products) {
    if (cartItem.quantity <= cartItem.product.stock) {
      cartItem.product.stock -= cartItem.quantity;
      await cartItem.product.save();
      amount += cartItem.product.price * cartItem.quantity;
    } else {
      productsWithoutStock.push(cartItem.product.id.toString());
    }
  }

  cart.products = cart.products.filter((cartItem) => productsWithoutStock.includes(cartItem.product.id.toString()));
  await cart.save();

  const ticket = { amount, purchaser: user.email };
  const ticketResponse = await ticketManager.createOne(ticket);
  return { ticket: ticketResponse, productsWithoutStock };
};
