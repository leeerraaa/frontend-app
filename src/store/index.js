import { createStore } from 'vuex';

import auth from './modules/auth';
import document from './modules/document';

export default createStore({
  modules: {
    auth,
    document,
  },
});
