import axios, { setAuthHeaders } from '@/plugins/axios';
import { SET_USER_LOGIN, SET_USER_INFO } from '../mutation-types';
import { useCookies } from 'vue3-cookies';

const { cookies } = useCookies();

const state = () => ({
  isLogged: false,
  userInfo: null,
});

const getters = {
  getUserLogged(state) {
    return state.isLogged;
  },

  getUserInfo(state) {
    return state.userInfo;
  },
};

const mutations = {
  [SET_USER_LOGIN](state, payload) {
    state.isLogged = payload;
  },

  [SET_USER_INFO](state, payload) {
    state.userInfo = payload;
  },
};

const actions = {
  setUserToken(_, { token }) {
    cookies.set('access_token', token, undefined, undefined, undefined, true);
    setAuthHeaders();
  },

  async setUserLogin({ commit, dispatch }) {
    if (cookies.isKey('access_token')) {
      commit(SET_USER_LOGIN, true);

      // await dispatch('userGetInfo');
    }
  },

  setUserUnlogin({ commit }) {
    cookies.remove('access_token');
    commit(SET_USER_LOGIN, false);
    setAuthHeaders();
  },

  // /user
  async userGetInfo({ commit }) {
    try {
      const { data } = await axios({
        method: 'get',
        url: '/user',
      });

      const { result } = data;
      commit(SET_USER_INFO, result);

      return result;
    } catch (e) {
      console.log(e);
    }
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
