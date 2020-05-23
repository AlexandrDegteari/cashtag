<template>
  <div>
    <div class="contact">
      <h2>If you forget the password please contact Cashtag to take new one</h2>
      <form
        style="background-color: #fff"
        class="contact-form"
        @submit.prevent="sendEmail"
      >
        <label>Name</label>
        <input type="text" name="user_name" />
        <label>Email</label>
        <input type="email" name="user_email" />
        <label>Message</label>
        <textarea class="w-100" name="message"></textarea>
        <button class="btn" @click="success" type="submit">Send message</button>
        <p class="text-success" v-if="successMessage">{{ successMessage }}</p>
      </form>
    </div>
  </div>
</template>

<script>
import emailjs from "emailjs-com";

export default {
  data() {
    return {
      successMessage: null
    };
  },
  methods: {
    success() {
      this.successMessage = "Success";
    },
    sendEmail: e => {
      emailjs
        .sendForm(
          "gmail",
          "template_xYlNIgCm",
          e.target,
          "user_7qCEB0QtIVK0wg4IBEKZh"
        )
        .then(
          result => {
            console.log("SUCCESS!", result.status, result.text);
          },
          error => {
            console.log("FAILED...", error);
          }
        );
    }
  }
};
</script>
<style scoped>
.contact-form {
}
.contact {
  background-color: #fff;
  padding: 30px;
}
</style>
