<template>
  <div class="mx-auto" style="width: 50%">
    <div class="container text-center">
      <LogOut></LogOut>
    </div>
    <Post v-for="post in posts" :body="post.body" :time="post.createdAt" :id="post.id" :key="post.id"></Post>
    <div class="row">
      <div class="col">
        <AddPost class="float-end" @click="newModal = true"></AddPost>
      </div>
      <div class="col">
        <DeleteAll></DeleteAll>
      </div>
    </div>
  </div>
  <!-- new modal -->
  <Teleport to="body">
    <newModal :show="newModal" @close="newModal = false">
    </newModal>
  </Teleport>
</template>

<script setup>
import Post from '../components/homepage/Post.vue'
import {ref} from "vue";
import router from "../router";
import NewModal from "../components/homepage/modals/NewModal.vue"
import AddPost from "../components/homepage/AddPost.vue";
import DeleteAll from "../components/homepage/DeleteAll.vue";
import LogOut from "../components/Logout.vue";

const newModal = ref(false);

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