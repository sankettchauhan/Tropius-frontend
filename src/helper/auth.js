require("dotenv").config();

export const addAuthorisedTokenToStorage = (token) => {
  localStorage.setItem(process.env.REACT_APP_LOCALSTORAGE_KEY, token);
};

export const removeAuthorisedTokenFromStorage = () => {
  localStorage.removeItem(process.env.REACT_APP_LOCALSTORAGE_KEY);
};

export const isAuthenticated = () => {
  return Boolean(localStorage.getItem(process.env.REACT_APP_LOCALSTORAGE_KEY));
};

export const getAuthorisedToken = () => {
  return isAuthenticated()
    ? localStorage.getItem(process.env.REACT_APP_LOCALSTORAGE_KEY)
    : null;
};

// export const updateAuthenticatedUser = (prop, value) => {
//   let user = getAuthenticatedUser();
//   if (!isAuthenticated()) return;
//   user[prop] = value;
//   localStorage.setItem("user", JSON.stringify(user));
// };
