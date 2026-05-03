// client/src/auth.js - Updated
export const isAuth = () => {
  return localStorage.getItem("user") !== null;
};

export const logout = () => {
  localStorage.removeItem("user");
};

export const getUserId = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user).id : null;
};

export const getUserName = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user).name : "Student";
};