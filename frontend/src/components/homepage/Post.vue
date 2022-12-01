<template>
  <div @click="showModal = true">
    <div class="float-right">{{formattedTime}}</div>
    <br>
    <div class="text-justify text-center"> {{ body }}</div>
  </div>
  <Teleport to="body">
    <postModal :show="showModal" @close="showModal = false">
      <template #time>
        {{formattedTime}}
      </template>
      <template #body>
        {{body}}
      </template>
    </postModal>
  </Teleport>

</template>

<script setup>
import {ref} from "vue";
import PostModal from "./modals/PostModal.vue"

const props = defineProps(
    {
      id: String,
      time: String,
      body: String
    }
);

const showModal = ref(false);
const formattedTime = ref('');

const dateTime = new Date(props.time);
formattedTime.value = dateTime.toLocaleString();

</script>

<style scoped>

</style>