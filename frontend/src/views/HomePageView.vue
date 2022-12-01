<template>
  <div>
    <Post v-for="post in posts" :body="post.body" :time="post.createdAt" :id="post.id" :key="post.id"></Post>
  </div>
  <AddPost></AddPost>
  <DeleteAll></DeleteAll>
</template>

<script setup>
import Post from '../components/homepage/Post.vue'
import {ref} from "vue";
//import AddPost from "../components/homepage/AddPost";
//import DeleteAll from "../components/homepage/DeleteAll";

const posts = ref([]);

// Gets posts from the API.
const getData = async () => {
  const res = await fetch("https://localhost:8000/api/v1/posts", {
    credentials: 'include'
  });
  // Something went wrong, probably not authenticated. Redirect to login page.
  if (!res.ok) {
    await this.$router.push('/login');
  }
  posts.value.concat(await res.json());
}

</script>

<style scoped>

</style>