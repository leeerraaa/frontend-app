import axios from '@/plugins/axios';
import { objectToString } from '@vue/shared';
// import { SET_DOCUMENT_LIST } from '../mutation-types';

const state = () => ({
  documentList: null,
});

const getters = {};

const mutations = {};

const actions = {
  // /document/
  async documentList() {
    try {
      const { data } = await axios({
        method: 'get',
        url: '/document/',
      });

      const { result } = data;

      return result.reverse();
    } catch (e) {
      console.log(e);
    }
  },

  // /document/:id
  async documentDelete(_, document_id) {
    try {
      await axios({
        method: 'delete',
        url: `/document/${document_id}`,
      });
    } catch (e) {
      console.log(e);
    }
  },

  // /document/:id
  async documentDownload(_, document_id) {
    try {
      const { data } = await axios({
        method: 'get',
        url: `/document/${document_id}`,
      });

      const { result } = data;

      return result;
    } catch (e) {
      console.log(e);
    }
  },

  // /document/
  async documentCreate(_, object) {
    try {
      const { data } = await axios({
        method: 'post',
        url: '/document/',
        data: object,
      });

      return data;
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
