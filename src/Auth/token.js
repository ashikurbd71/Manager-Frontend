export const setTokenToLocalStorage = (token) => {
    localStorage.setItem('managertoken', token);
  };
  
  export const getTokenFromLocalStorage = () => {
    return localStorage.getItem('managertoken');
  };
  
  export const removeTokenFromLocalStorage = () => {
    localStorage.removeItem('managertoken');
  };
  