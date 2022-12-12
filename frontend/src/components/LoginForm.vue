<template>
    <div class="container-sm w-25 mt-5">
      <form class="needs-validation">
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">Email address</label>
          <input type="email" class="form-control needs-validation" id="exampleInputEmail1" aria-describedby="emailHelp">
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">Password</label>
          <input type="password" class="form-control needs-validation" id="exampleInputPassword1">
        </div>
      </form>
      <div class="container text-center">
        <div class="row">
          <div class="col">
            <button type="submit" class="btn btn-secondary">Log in</button>
          </div>
          <div class="col">
            <button type="button" class="btn btn-outline-secondary">Sign up</button>
          </div>
        </div>
      </div>
    </div>
  
  </template>
  
  <script>
  export default {
    name: "Login"
  }
  </script>
  
  <style scoped>
  
  </style>