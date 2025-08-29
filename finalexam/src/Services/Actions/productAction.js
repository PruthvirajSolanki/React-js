import axios from "axios";

// Base API URL (db.json via json-server runs on http://localhost:3000 by default)
const API_URL = "http://localhost:3000/products";

// =================== Actions ===================
export const loading = () => ({ type: "LOADING" });

export const addProductSUC = () => ({ type: "ADD_PRODUCT_SUC" });

export const addProductRej = (err) => ({
  type: "ADD_PRODUCT_REJ",
  payload: err,
});

export const getAllProducts = (data) => ({
  type: "GET_ALL_PRODUCTS_SUC",
  payload: data,
});

export const getProductsRej = (err) => ({
  type: "GET_ALL_PRODUCTS_REJ",
  payload: err,
});

export const getProduct = (data) => ({
  type: "GET_PRODUCT",
  payload: data,
});

export const updateProduct = () => ({ type: "UPDATE_PRODUCT" });

// =================== Async Actions ===================

// get all products
export const getAllProductAsync = () => {
  return async (dispatch) => {
    dispatch(loading());
    try {
      let res = await axios.get(API_URL);
      dispatch(getAllProducts(res.data));
    } catch (error) {
      console.error(error);
      dispatch(getProductsRej(error.message));
    }
  };
};

// add new product
export const addProductAsync = (data) => {
  return async (dispatch) => {
    dispatch(loading());
    try {
      await axios.post(API_URL, data);
      dispatch(addProductSUC());
    } catch (error) {
      console.error(error);
      dispatch(addProductRej(error.message));
    }
  };
};

// delete product
export const deleteProductAsync = (id) => {
  return async (dispatch) => {
    dispatch(loading());
    try {
      await axios.delete(`${API_URL}/${id}`);
      dispatch(getAllProductAsync());
    } catch (error) {
      console.error(error);
      dispatch(addProductRej(error.message));
    }
  };
};

// get single product
export const getProductAsync = (id) => {
  return async (dispatch) => {
    dispatch(loading());
    try {
      let res = await axios.get(`${API_URL}/${id}`);
      dispatch(getProduct(res.data));
    } catch (error) {
      console.error(error);
      dispatch(addProductRej(error.message));
    }
  };
};

// update product
export const updateProductAsync = (data) => {
  return async (dispatch) => {
    dispatch(loading());
    try {
      await axios.put(`${API_URL}/${data.id}`, data);
      dispatch(updateProduct());
      dispatch(getAllProductAsync()); // refresh list
    } catch (error) {
      console.error(error);
      dispatch(addProductRej(error.message));
    }
  };
};
