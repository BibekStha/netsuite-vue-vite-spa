import { createApp } from "vue";
import App from "./App.vue";
import "./assets/index.css";
import netSuiteApi from "../plugins/netsuite-api";

createApp(App).use(netSuiteApi).mount("#app");
