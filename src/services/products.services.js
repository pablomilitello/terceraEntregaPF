import { productManager } from '../DAL/DAOs/productsDaos/ProductsManagerMongo.js';

export const findAllProducts = async (limit, page, sort, category, availability) => {
  try {
    const products = await productManager.findAll(limit, page, sort, category, availability);
    return products;
  } catch (error) {
    throw error;
  }
};

export const findProductById = async (id) => {
  try {
    const product = await productManager.findOneById(id);
    return product;
  } catch (error) {
    throw error;
  }
};

export const createOneProduct = async (obj) => {
  try {
    const newProduct = await productManager.createOne(obj);
    return newProduct;
  } catch (error) {
    throw error;
  }
};

export const updateOneProduct = async (pid, obj) => {
  try {
    const product = await productManager.updateOne(pid, obj);
    return product;
  } catch (error) {
    throw error;
  }
};

export const deleteAllProducts = async () => {
  try {
    const product = await productManager.deleteAll();
    return product;
  } catch (error) {
    throw error;
  }
};

export const deleteOneProduct = async (pid) => {
  try {
    const product = await productManager.deleteOne(pid);
    return product;
  } catch (error) {
    throw error;
  }
};
