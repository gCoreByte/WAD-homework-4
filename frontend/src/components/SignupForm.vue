<!-- eslint-disable prettier/prettier -->

<template>
  <div class="mx-auto" style="width: 30%">
    <p class="fs-3">Register an account </p>
    <form>
      <div class="mb-3">
        <label for="email" class="form-label">Email address</label>
        <input type="email" class="form-control" id="email" aria-describedby="emailHelp">
        <!--<div id="emailHelp" class="form-text">Must be a valid e-mail.</div>-->
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Password</label>
        <input type="password" class="form-control" id="password">
        <div id="passwordHelp" class="form-text">Make it a strong one.</div>
      </div>
      <div class="mb-3 form-check">
        <input type="checkbox" class="form-check-input" id="exampleCheck1">
        <label class="form-check-label" for="exampleCheck1"> I accept the terms and conditions</label>
      </div>
      <button type="submit" class="btn btn-primary">Sign up</button>
    </form>
  </div>
</template>

<script>

</script>
