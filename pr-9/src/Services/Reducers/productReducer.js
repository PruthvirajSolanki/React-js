const initialState = {
  products: JSON.parse(localStorage.getItem("products")) || [],
  loading: false,
  singleProduct: null,
};


const updateLocalStorage = (products) => {
  localStorage.setItem("products", JSON.stringify(products));
};

export const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOADING":
      return { ...state, loading: true };

    case "GET_ALL_PRODUCTS":
      return { ...state, loading: false, products: action.payload };

    case "ADD_PRODUCT": {
      const updatedProducts = [...state.products, action.payload];
      updateLocalStorage(updatedProducts);
      return { ...state, products: updatedProducts };
    }

    case "DELETE_PRODUCT": {
      const updatedProducts = state.products.filter((p) => p.id !== action.payload);
      updateLocalStorage(updatedProducts);
      return { ...state, products: updatedProducts };
    }

    case "GET_PRODUCT":
      return {
        ...state,
        singleProduct: state.products.find((p) => p.id === action.payload),
      };

    case "UPDATE_PRODUCT": {
      const updatedProducts = state.products.map((p) =>
        p.id === action.payload.id ? action.payload : p
      );
      updateLocalStorage(updatedProducts);
      return { ...state, products: updatedProducts };
    }

    default:
      return state;
  }
};
