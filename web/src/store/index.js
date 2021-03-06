import Vue from 'vue';
import Vuex from 'vuex';

import app from './modules/app.module';
import auth from './modules/auth.module';
import articles from './modules/articles.module';

Vue.use(Vuex);

export default new Vuex.Store({
   modules: {
      app,
      auth,
      articles   
   }
});
