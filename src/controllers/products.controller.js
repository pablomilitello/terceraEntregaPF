import {
  createOneProduct,
  deleteAllProducts,
  deleteOneProduct,
  findAllProducts,
  findProductById,
  updateOneProduct,
} from '../services/products.services.js';
import { validateBoolean, validateInteger, validateSort } from '../utils.js';

export const getProducts = async (req, res) => {
  try {
    const { limit = 10, page = 1, category, availability } = req.query;

    if (!validateInteger(limit, 1, 200)) {
      res.status(400).json('wrong limit');
      return;
    }
    if (!validateInteger(page, 1, 10000)) {
      res.status(400).json('wrong page');
      return;
    }

    if (availability && !validateBoolean(availability)) {
      res.status(400).json('wrong availability');
      return;
    }

    let { sort } = req.query;
    sort = sort?.toLowerCase();
    if (sort && !validateSort(sort)) {
      res.status(400).json('wrong sort');
      return;
    }

    const { docs, totalPages, hasPrevPage, hasNextPage, prevPage, nextPage } = await findAllProducts(
      parseInt(limit),
      parseInt(page),
      sort,
      category,
      availability
    );

    let prevLink = null;
    if (hasPrevPage) {
      prevLink = `/api/products?limit=${limit}&page=${prevPage}&`;
      if (availability) {
        prevLink += `availability=${availability}&`;
      }
      if (category) {
        prevLink += `category=${category}&`;
      }
      if (sort) {
        prevLink += `sort=${sort}`;
      }
    }

    let nextLink = null;
    if (hasNextPage) {
      nextLink = `/api/products?limit=${limit}&page=${nextPage}&`;
      if (availability) {
        prevLink += `availability=${availability}&`;
      }
      if (category) {
        nextLink += `category=${category}&`;
      }
      if (sort) {
        nextLink += `sort=${sort}`;
      }
    }

    const response = {
      status: 'success',
      payload: docs,
      totalPages,
      prevPage,
      nextPage,
      page,
      hasPrevPage,
      hasNextPage,
      prevLink,
      nextLink,
    };
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 'error', message: 'product search error' });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { pid } = req.params;
    const product = await findProductById(pid);
    if (!product) {
      res.json({ message: 'Product does not exist' });
    } else {
      res.json(product);
    }
  } catch (error) {
    console.error(err);
    res.status(500).json({ error: 'Product search error' });
  }
};

export const addProducts = async (req, res) => {
  try {
    const obj = req.body;
    const newProduct = await createOneProduct(obj);
    res.status(201).json({ message: 'Product created', product: newProduct });
  } catch (error) {
    console.error(err);
    res.status(400).json({ error: 'It was not possible to add the product' });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { pid } = req.params;
    const obj = req.body;
    const product = await updateOneProduct(pid, obj);
    res.status(201).json({ product });
  } catch (error) {
    console.error(err);
    res.status(500).json({ error: 'Error updating the product' });
  }
};

export const deleteProducts = async (req, res) => {
  try {
    const response = await deleteAllProducts();
    res.status(201).json({ response });
  } catch (error) {
    console.error(err);
    res.status(500).json({ error: 'It was not possible to delete the products' });
  }
};

export const deleteProductsById = async (req, res) => {
  try {
    const { pid } = req.params;
    const products = await deleteOneProduct(pid);
    res.status(201).json({ products });
  } catch (error) {
    console.error(err);
    res.status(500).json({ error: 'It was not possible to delete the product' });
  }
};
