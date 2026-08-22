import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import Toast,{toastOptions} from "./plugins/toast.js";

import { loadAuthUser } from "@/constants/auth.js"; // load auth user from local storage

loadAuthUser();



import "./style.css";


createApp(App)

  .use(router)
  .use(Toast, toastOptions)
  .mount("#app");

