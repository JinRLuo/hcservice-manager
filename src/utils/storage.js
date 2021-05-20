export const setAdminInfoStorage = function (data) {
  let info = JSON.stringify(data);
  window.localStorage.setItem('adminInfo',info);
}

export const getAdminInfoFromStorage = function () {
  let adminInfo = window.localStorage.getItem('adminInfo');
  return adminInfo ? JSON.parse(adminInfo) : '';
}
