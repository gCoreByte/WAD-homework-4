<template>
  <div class="mx-auto" style="width: 50%">
    <Post v-for="post in posts" :body="post.body" :time="post.createdAt" :id="post.id" :key="post.id"></Post>
  </div>
</template>

<script setup>
import Post from '../components/homepage/Post.vue'
import {onMounted, ref} from "vue";
import router from "../router";
//import AddPost from "../components/homepage/AddPost";
//import DeleteAll from "../components/homepage/DeleteAll";

const posts = ref([]);

// Gets posts from the API.
const getData = async () => {
  const res = await fetch("http://localhost:8000/posts", {
    credentials: 'include'
  });
  // Something went wrong, probably not authenticated. Redirect to login page.
  if (!res.ok) {
    await router.push('/login');
  }
  let temp_posts = await res.json();
  temp_posts.forEach(post => posts.value.push(post));
}

getData();


</script>

<style scoped>

</style>