import { createStore, applyMiddleware, combineReducers } from "redux";
import { thunk } from "redux-thunk";
import { rootReducer } from "./Services/Reducers";


export const store = createStore(rootReducer, applyMiddleware(thunk));
// export default store; 

