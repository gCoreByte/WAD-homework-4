<!-- eslint-disable prettier/prettier -->

<template>
  <div class="mx-auto" style="width: 30%">
    <div class="mb-3">
      <label for="email" class="form-label">Email address</label>
      <input type="email" class="form-control needs-validation" id="email" aria-describedby="emailHelp" required
        v-model="email">
      <div id="emailHelp" class="form-text">Must be a valid e-mail.</div>
    </div>
    <div class="mb-3">
      <label for="password" class="form-label">Password</label>
      <input type="password" class="form-control" id="password" required v-model="password">
    </div>
    <div class="mb-3 form-check">
      <input type="checkbox" class="form-check-input" id="checkbox" required v-model="checkbox">
      <label class="check-label" for="checkbox"> I accept the terms and conditions.</label>
    </div>
    <button @click=signUp class="btn btn-secondary">Sign up</button>
  </div>
</template>

<script>
export default {
  name: "Signup",
  data: function () {
    return {
      email: '',
      password: '',
      checkbox: this.checkbox,
    }
  },
  methods: {
    signUp() {
      var data = {
        email: this.email,
        password: this.password
      };
      fetch("http://localhost:8000/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          location.assign("/");
        })
        .catch((e) => {
          console.log(e);
          console.log("error");
        });
    },
  },
}
</script>

<style scoped>

</style>
