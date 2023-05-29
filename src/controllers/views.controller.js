import { productManager } from '../DAL/DAOs/productsDaos/ProductsManagerMongo.js';

export const getHome = async (req, res) => {
  try {
    const products = await productManager.findAll(100, 0, undefined, undefined, undefined, true);
    res.render('home', { products: products.docs });
  } catch (error) {
    console.log(error);
    res.status(500).json('product search error');
  }
};

export const getProducts = async (req, res) => {
  const { limit = 5, page = 0 } = req.query;
  const products = await productManager.findAll(limit, page, undefined, undefined, undefined, true);
  res.render('products', {
    products: products.docs,
    nextPage: products.nextPage,
    prevPage: products.prevPage,
    hasNextPage: products.hasNextPage,
    hasPrevPage: products.hasPrevPage,
  });
};

export const getRealTimeProducts = async (req, res) => {
  const products = await productManager.findAll(100, 0, undefined, undefined, undefined, true);
  if (req.user == undefined) {
    res.render('realTimeProducts', { products: products.docs });
  } else {
    res.render('realTimeProducts', { products: products.docs, firstName: req.user.firstName });
  }
};

export const getChat = async (req, res) => {
  res.render('chat');
};
