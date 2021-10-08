require("dotenv").config();

export const addAuthorisedTokenToStorage = (token) => {
  localStorage.setItem(process.env.REACT_APP_LOCALSTORAGE_KEY, token);
};

export const removeAuthorisedTokenFromStorage = () => {
  localStorage.removeItem(process.env.REACT_APP_LOCALSTORAGE_KEY);
};
