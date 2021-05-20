import {
  setAdminInfoStorage, getAdminInfoFromStorage
} from "../../utils/storage";

const state = {
  adminInfo: getAdminInfoFromStorage()
}
const mutations = {
  SET_ADMIN_INFO(state, adminInfo) {
    state.adminInfo = adminInfo;
    setAdminInfoStorage(adminInfo);
  },
  CLEAR_ADMIN_INFO(state) {
    state.adminInfo = '';
    localStorage.removeItem('adminInfo');
  }
}
const actions = {
  setAdminInfo({ commit }, adminInfo) {
    commit('SET_ADMIN_INFO', adminInfo);
  }

}
export default {
  state,
  mutations,
  actions
}
