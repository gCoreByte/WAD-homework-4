<template>
  <div @click="showModal = true" class="post">
    <div class="text-end text-margin">{{formattedTime}}</div>
    <div class="text-justify text-margin"> {{ bodyRef }}</div>
  </div>
  <!-- show modal -->
  <Teleport to="body">
    <postModal :body="bodyRef" :show="showModal" @close="showModal = false" @update-value="updateValue" @delete="deletePost">
      <template #time>
        <div class="col-sm-13">
          <input disabled type="text" class="form-control border border-secondary" id="time" :value="formattedTime">
        </div>
      </template>
    </postModal>
  </Teleport>

</template>

<script setup>
import {ref} from "vue";
import PostModal from "./modals/PostModal.vue"
import router from "../../router";

const props = defineProps(
    {
      id: Number,
      time: String,
      body: String
    }
);

const bodyRef = ref(props.body);
const showModal = ref(false);
const formattedTime = ref('');

const dateTime = new Date(props.time);
formattedTime.value = dateTime.toLocaleString();

const updateValue = async (newValue) => {
  const res = await fetch(`http://localhost:8000/posts/${props.id}`, {
    method: 'PATCH',
    credentials: 'include',
    body: JSON.stringify({
      body: newValue
    }),
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
  await router.go(0);
}

const deletePost = async () => {
  const res = await fetch(`http://localhost:8000/posts/${props.id}`, {
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
  await router.go(0);
}


</script>

<style scoped lang="scss">
  @import "../node_modules/bootstrap/scss/bootstrap";

  .post {
    margin-top: 25px;
    @extend .bg-dark;
    @extend .text-light;
    width: 50vw;
    display: block;
    margin-bottom: 25px;
    border-radius: 10px;
  }

  .text-margin {
    margin: 25px;
  }
</style>