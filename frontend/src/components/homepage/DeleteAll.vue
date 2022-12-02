<template>
    <button type="button" class="btn btn-danger" @click="deleteAll">Delete all</button>
</template>

<script setup>

import router from "../../router";

const deleteAll = async () => {
  const res = await fetch(`http://localhost:8000/posts/`, {
    method: 'DELETE',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  // Something is bad about the request.
  // TODO: show user an error
  if (res.statusCode === 400) {
    console.log("Something went wrong.");
    console.log(await res.json());
  }
  // Something went wrong, probably not authenticated. Redirect to login page.
  if (!res.ok) {
    await router.push('/login');
  }
  // Refresh the page if everything works
  await router.go(0);}

</script>
