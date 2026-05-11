import Vue from 'vue';
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
Vue.config.productionTip = false;

Vue.use(Antd);

/* eslint-disable no-new */
new Vue({
  render: (h) => h(App),
}).$mount('#app');
