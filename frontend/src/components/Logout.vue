<template>
  <div>
    <button type="button" class="btn btn-primary mb-2" v-on:click="logout">Logout</button>
  </div>
</template>

<script setup>
import router from "../router";

const logout = async () => {
  await router.push('/login');
}
</script>