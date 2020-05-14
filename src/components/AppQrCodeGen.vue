<template>
  <div>
    <qrcode-vue
      style="padding: 25px; background-color: #fff; color: #000"
      :value="value"
      :size="size"
      level="H"
    ></qrcode-vue>
  </div>
</template>
<script>
import QrcodeVue from "qrcode.vue";

export default {
  name: "QrCodeGen",
  data() {
    return {
      size: 300
    };
  },
  props: ["value"],
  components: {
    QrcodeVue
  }
};
</script>
