import Vue from "vue";
import VueGtag from "vue-gtag";

const gtag = Vue.use(VueGtag, {
  config: { id: "UA-1234567-1" }
});

export default ({ app }) => {
  // Set i18n instance on app
  app.gtag = gtag;
};

export { gtag };
