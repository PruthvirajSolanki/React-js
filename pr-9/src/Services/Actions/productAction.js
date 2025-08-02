export const loading = () => {
  return {
    type: "LOADING",
  };
};

export const addProduct = (data) => {
  return {
    type: "ADD_PRODUCT",
    payload: data,
  };
};

export const deleteProduct = (id) => {
  return {
    type: "DELETE_PRODUCT",
    payload: id,
  };
};

export const getProduct = (id) => {
  return {
    type: "GET_PRODUCT",
    payload: id,
  };
};

export const updateProduct = (data) => {
  return {
    type: "UPDATE_PRODUCT",
    payload: data,
  };
};


export const getAllProductAsync = () => {
  return (dispatch) => {
    dispatch(loading());

    setTimeout(() => {
      const data = JSON.parse(localStorage.getItem("products")) || [];
      dispatch({
        type: "GET_ALL_PRODUCTS",
        payload: data,
      });
    }, 1000);
  };
};

