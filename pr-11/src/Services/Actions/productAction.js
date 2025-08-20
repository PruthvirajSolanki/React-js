// import axios from "axios";
import { collection, deleteDoc, doc, getDoc, getDocs, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

// const API_URL = "http://localhost:3000/products";

// ------------------ Basic Action Creators ------------------ //
export const loading = () => ({ 
  type: "LOADING",
});

export const addProductSUC = () => ({
  type: "ADD_PRODUCT_SUC",
});

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

export const updateProduct = () => ({
  type: "UPDATE_PRODUCT",
});

// ------------------ Async Action Creators ------------------ //

// Get all products
export const getAllProductAsync = () => {
  return async (dispatch) => {
    dispatch(loading());
        try { 
            let result = [];
            let resRef = await getDocs(collection(db, 'products'));
            resRef.forEach((doc) => {
                result.push({...doc.data(), id: doc.id});
            });

            dispatch(getAllProducts(result));
        } catch (error) {
            console.log(error);
            dispatch(getProductsRej(error.message))
        }
        
    }
}

// Add new product
export const addProductAsync = (data) => {
  return async (dispatch) => {
    dispatch(loading());
        try {
            // let res = await addDoc(collection(db, "products"), data);    
            let res = await setDoc(doc(db, "products", data.id), data);     
            // console.log(res);
            dispatch(addProductSUC());
        } catch (error) {
            console.log(error);
            dispatch(addProductRej(error.message))
        }
    }
}

// Delete product
export const deleteProductAsync = (id) => {
  return async (dispatch) => {
    dispatch(loading());
        try {
            await deleteDoc(doc(db, "products", id));
            dispatch(getAllProductAsync());
        } catch (error) {
            console.log(error);
            dispatch(addProductRej(error.message))
        }
    }
}

// Get single product by ID
export const getProductAsync = (id) => {
  return async (dispatch) => {
    dispatch(loading());
        try {
            let res = await getDoc(doc(db, "products", id));
            console.log(res);
            dispatch(getProduct({...res.data(), id: res.id}));
        } catch (error) {
            console.log(error);
            dispatch(addProductRej(error.message))
        }
    }
}

// Update product
export const updateProductAsync = (data) => {
  return async (dispatch) => {
    dispatch(loading());
        try {
            await updateDoc(doc(db, "products", data.id), data)
            // console.log(res);
            dispatch(updateProduct());
        } catch (error) {
            console.log(error);
            dispatch(addProductRej(error.message))
        }
    }
}
