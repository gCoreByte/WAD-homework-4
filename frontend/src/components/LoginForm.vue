<template>
  <div class="mx-auto" style="width: 30%">
    <div class="mb-3">
      <label for="email" class="form-label">Email address</label>
      <input type="email" class="form-control needs-validation" id="email" required v-model="email">
    </div>
    <div class="mb-3">
      <label for="password" class="form-label">Password</label>
      <input type="password" class="form-control needs-validation" id="password" required v-model="password">
    </div>
    <div class="row">
      <div class="col">
        <button type="submit" @click=LogIn class="btn btn-secondary">Login</button>
      </div>
      <div class="col">
        <button type="button" @click='this.$router.push("/signup")' class="btn btn-outline-secondary">Sign up</button>
      </div>
    </div>
  </div>

</template>
  
<script>
export default {
  name: "Login",
  data: function () {
    return {
      email: '',
      password: '',
    }
  },
  methods: {
    LogIn() {
      var data = {
        email: this.email,
        password: this.password
      };
      // using Fetch - post method - send an HTTP post request to the specified URI with the defined body
      fetch("http://localhost:8000/auth/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include', //  Don't forget to specify this if you need cookies
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          //this.$router.push("/");
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