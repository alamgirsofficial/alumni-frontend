import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import Toast,{toastOptions} from "./plugins/toast.js";



import "./style.css";


createApp(App)

  .use(router)
  .use(Toast, toastOptions)
  .mount("#app");

