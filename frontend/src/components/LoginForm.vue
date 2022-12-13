<template>
    <div class="mx-auto" style="width: 30%">
      <p class="fs-3">Login</p>
      <form class="needs-validation" id="login">
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">Email address</label>
          <input type="email" class="form-control needs-validation" id="exampleInputEmail1" aria-describedby="emailHelp">
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">Password</label>
          <input type="password" class="form-control needs-validation" id="exampleInputPassword1">
        </div>

        <div class="row align-items-center">
          <div class="col">
            <button type="submit" class="btn btn-secondary" v-on:click="loginUser">Login</button>
          </div>
          <div class="col">
            <button type="button" class="btn btn-outline-secondary" v-on:click="toSignup">Sign up</button>
          </div>
        </div>
      </form>
    </div>
  
  </template>
  
  <script setup>

  import router from "../router";

  const loginUser = async () => {

    const res = await fetch('http://localhost:8000/auth/signup/', {
      method:'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    await router.push('/');}

  const toSignup = async () => {
    await router.push('/signup');
  }

  </script>
  
  <style scoped>
  
  </style>