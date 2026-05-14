import Vue from 'vue';
import Vuex from 'vuex';
import Antd from 'ant-design-vue';
// @ts-ignore
import 'ant-design-vue/dist/antd.css';
// @ts-ignore
import "@fontsource/inter";
// @ts-ignore
import '@fontsource/inter/300.css';
// @ts-ignore
import '@fontsource/inter/400.css';
// @ts-ignore
import '@fontsource/inter/500.css';
// @ts-ignore
import '@fontsource/inter/600.css';
// @ts-ignore
import '@fontsource/inter/700.css';
// @ts-ignore
import '@fontsource/inter/800.css';

import App from './App.vue';
import todos from './store/modules/todos.module';
Vue.config.productionTip = false;

Vue.use(Antd);
Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    todos,
  },
});

new Vue({
  store,
  render: (h) => h(App),
}).$mount('#app');
