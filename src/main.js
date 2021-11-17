import { createApp } from "vue";
import App from "./App.vue";
import netSuiteApi from "../plugins/netsuite-api";
import "virtual:windi.css";

createApp(App).use(netSuiteApi).mount("#app");
