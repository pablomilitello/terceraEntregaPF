import {
  cartById,
  cartByIdPopulated,
  createOne,
  deleteAllProducts,
  deleteProduct,
  productsToCart,
  updateOne,
  updateOneProduct,
} from '../services/carts.services.js';

export const getCartByIdPopulated = async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await cartByIdPopulated(cid);
    if (!cart) {
      res.json({ message: 'Cart does not exist' });
    } else {
      res.status(200).json(cart);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json('cart search error');
  }
};

export const addCarts = async (req, res) => {
  try {
    const newCart = await createOne();
    res.status(201).json({ message: 'Cart created', cart: newCart });
  } catch (error) {
    console.log(error);
    res.status(500).json('cart search error');
  }
};

export const addProductsToCart = async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const newCart = await productsToCart(cid, pid);
    if (newCart === "Error: Cart doesn't exist") {
      res.status(404).json({ message: "Cart doesn't exist" });
    } else if (newCart === "Error: Product doesn't exist") {
      res.status(404).json({ message: "Product doesn't exist" });
    } else {
      res.status(201).json(newCart);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.toString() || 'It was not possible to add the product' });
  }
};

export const deleteProductFromCart = async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const cart = await cartById(cid);
    if (!cart) {
      res.status(400).json({ message: 'Cart does not exist' });
    }
    const newCart = await deleteProduct(cid, pid);
    res.status(200).json(newCart);
  } catch (error) {
    console.log(error);
    res.status(500).json('cart search error');
  }
};

export const deleteAllProductsFromCart = async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await cartById(cid);
    if (!cart) {
      res.status(400).json({ message: 'Cart does not exist' });
    }

    const newCart = await deleteAllProducts(cid);
    res.status(200).json(newCart);
  } catch (error) {
    console.log(error);
    res.status(500).json('cart products delete error');
  }
};

export const updateCart = async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await cartById(cid);
    if (!cart) {
      res.status(400).json({ message: 'Cart does not exist' });
    }
    const products = req.body;
    if (!Array.isArray(products)) {
      res.status(400).json({ message: 'Products must be an array' });
    }
    const newCart = await updateOne(cid, products);
    res.status(200).json(newCart);
  } catch (error) {
    console.log(error);
    res.status(500).json('cart update error');
  }
};

export const updateCartProduct = async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const cart = await cartById(cid);
    if (!cart) {
      res.status(400).json({ message: 'Cart does not exist' });
    }

    if (typeof req.body != 'object') {
      res.status(400).json({ message: 'wrong body' });
    }
    const { quantity } = req.body;
    if (!Number.isInteger(quantity)) {
      res.status(400).json({ message: 'wrong quantity' });
    }

    const newCart = await updateOneProduct(cid, pid, quantity);
    res.status(200).json(newCart);
  } catch (error) {
    console.log(error);
    res.status(500).json('cart product update error');
  }
};
