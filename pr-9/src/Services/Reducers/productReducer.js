// const initialState = {
//   products: JSON.parse(localStorage.getItem("products")) || [],
//   loading: false,
//   singleProduct: null,
// };


// const updateLocalStorage = (products) => {
//   localStorage.setItem("products", JSON.stringify(products));
// };

// export const productReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case "LOADING":6
       
//       return { ...state, loading: true };

//     case "GET_ALL_PRODUCTS":
//       return { ...state, loading: false, products: action.payload };

//     case "ADD_PRODUCT": {
//       const updatedProducts = [...state.products, action.payload];
//       updateLocalStorage(updatedProducts);
//       return { ...state, products: updatedProducts };
//     }
    

//     case "DELETE_PRODUCT": {
//       const updatedProducts = state.products.filter((p) => p.id !== action.payload);
//       updateLocalStorage(updatedProducts);
//       return { ...state, products: updatedProducts };
//     }

//     case "GET_PRODUCT":
//       return {
//         ...state,
//         singleProduct: state.products.find((p) => p.id === action.payload),
//       };

//     case "UPDATE_PRODUCT": {
//       const updatedProducts = state.products.map((p) =>
//         p.id === action.payload.id ? action.payload : p
//       );
//       updateLocalStorage(updatedProducts);
//       return { ...state, products: updatedProducts };
//     }

//     default:
//       return state;
//   }
// };



const initalState = {
    products:  [],
    product: null,
    isLoading: false,
    isError: "",
    isCreated: false,
    isUpdated: false
}


export const productReducer = (state = initalState, action) => {
    switch(action.type){
        case "LOADING": 
        return {
            ...state,
            isLoading: true
        }
        case "ADD_PRODUCT_SUC":
            return {
                ...state,
                isCreated: true
            };
        case "ADD_PRODUCT_REJ":
            return {
                ...state,
                isError: action.payload
            };
        
        case "GET_ALL_PRODUCTS_SUC": 
            return {
                ...state,
                products: action.payload,
                isLoading: false,
                isCreated: false,
                isUpdated: false,
                isError: ""
            }
        
        case "GET_ALL_PRODUCTS_REJ": 
            return {
                ...state,
                isLoading: false,
                isCreated: false,
                isUpdated: false,
                isError: action.payload
            }

        case "GET_PRODUCT":
            return {
                ...state,
                product: action.payload
            }
        
        case "UPDATE_PRODUCT":
            return {
                ...state,
                product: null,
                isUpdated: true,
            }
        default:
            return state;
    }
}

