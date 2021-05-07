export const setUserInfoIntoStorage = function(data) {
  let info = JSON.stringify(data);
  window.localStorage.setItem('userInfo',info);
}

export const getUserInfoFromStorage = function() {
  let userInfo = window.localStorage.getItem('userInfo');
  return userInfo ? JSON.parse(userInfo) : '';
}

export const setTokenIntoStorage = function(data) {
  window.localStorage.setItem('token',data);
}

export const getTokenFromStorage = function () {
  let token = window.localStorage.getItem('token');
  return token ? token : '';
}
