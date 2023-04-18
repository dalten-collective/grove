import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import './index.css';

import { store } from "./store/store";

import vSelect from "vue-select";

const app = createApp(App);
app.component("v-select", vSelect);

app.use(store);
app.use(router);
app.mount("#app");
