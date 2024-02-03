export const userInformation = {
  isUserLoggedIn: () => {
    let isLoggedIn = sessionStorage.getItem("isLoggedIn");
    if (isLoggedIn) return true;
    return false;
  },
  getUserId: () => {
    let userId = sessionStorage.getItem("isLoggedIn");
    return userId;
  },
  userLogOut: () => {
    let userId = sessionStorage.getItem("isLoggedIn");
    if (userId) sessionStorage.removeItem("isLoggedIn");
  },
};
