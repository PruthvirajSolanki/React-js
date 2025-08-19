const initialState = {
  products: [],
  product: null,
  isLoading: false,
  isError: "",
  isCreated: false,
  isUpdated: false,
};

export const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOADING":
      return {
        ...state,
        isLoading: true,
        isError: "",
      };

    case "ADD_PRODUCT_SUC":
      return {
        ...state,
        isCreated: true,
        isLoading: false,
      };

    case "ADD_PRODUCT_REJ":
      return {
        ...state,
        isError: action.payload,
        isLoading: false,
      };

    case "GET_ALL_PRODUCTS_SUC":
      return {
        ...state,
        products: action.payload,
        isLoading: false,
        isCreated: false,
        isUpdated: false,
        isError: "",
      };

    case "GET_ALL_PRODUCTS_REJ":
      return {
        ...state,
        isLoading: false,
        isError: action.payload,
      };

    case "GET_PRODUCT":
      return {
        ...state,
        product: action.payload,
        isLoading: false,
      };

    case "GET_PRODUCT_REJ":
      return {
        ...state,
        isLoading: false,
        isError: action.payload,
        product: null,
      };

    case "UPDATE_PRODUCT":
      return {
        ...state,
        isUpdated: true,
        isLoading: false,
      };

    default:
      return state;
  }
};
