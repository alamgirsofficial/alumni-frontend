import Toast, { POSITION } from "vue-toastification";
import "vue-toastification/dist/index.css";

export const toastOptions = {
  position: POSITION.TOP_RIGHT,
  timeout: 3000,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  transition: "Vue-Toastification__bounce",
};

export default Toast;