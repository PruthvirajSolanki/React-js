import axios from "axios";

// API URL for JSON Server (make sure db.json has "users" array)
const API_URL = "http://localhost:3000/users";

// =================== Actions ===================
const loading = () => ({ type: "LOADING" });

const errorMsg = (msg) => ({
  type: "ERROR",
  payload: msg,
});

const loginSuc = (user) => ({
  type: "LOGIN_SUC",
  payload: user,
});

const logOut = () => ({
  type: "LOGOUT_SUC",
});

const registerSuc = () => ({
  type: "REGISTER",
});

// =================== Async Actions ===================

// register new user
export const registerAsync = (data) => {
  return async (dispatch) => {
    dispatch(loading());
    try {
      // check if email already exists
      let res = await axios.get(`${API_URL}?email=${data.email}`);
      if (res.data.length > 0) {
        return dispatch(errorMsg("Email already registered!"));
      }

      // create new user
      await axios.post(API_URL, data);

      dispatch(registerSuc());
    } catch (error) {
      console.error(error);
      dispatch(errorMsg(error.message));
    }
  };
};

// login user
export const signInAsync = (data) => {
  return async (dispatch) => {
    dispatch(loading());
    try {
      let res = await axios.get(
        `${API_URL}?email=${data.email}&password=${data.password}`
      );

      if (res.data.length === 0) {
        return dispatch(errorMsg("Invalid Email or Password!"));
      }

      let user = res.data[0];
      dispatch(loginSuc(user));
    } catch (error) {
      console.error(error);
      dispatch(errorMsg(error.message));
    }
  };
};

// fake google login (just pick first user with provider=google)
export const signInWithGoogleAsync = () => {
  return async (dispatch) => {
    dispatch(loading());
    try {
      let res = await axios.get(`${API_URL}?provider=google`);
      if (res.data.length === 0) {
        return dispatch(errorMsg("No Google account linked!"));
      }

      dispatch(loginSuc(res.data[0]));
    } catch (error) {
      console.error(error);
      dispatch(errorMsg(error.message));
    }
  };
};

// logout
export const logOutAsync = () => {
  return (dispatch) => {
    try {
      sessionStorage.removeItem("user"); // ✅ remove from storage
      dispatch({ type: "LOGOUT_SUC" });  // ✅ clear redux
    } catch (error) {
      console.error(error);
      dispatch({ type: "ERROR", payload: error.message });
    }
  };
};


