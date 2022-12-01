<template>
  <div @click="showModal = true">
    <div class="float-right">{{formattedTime}}</div>
    <br>
    <div class="text-justify text-center"> {{ body }}</div>
  </div>
  <!-- show modal -->
  <Teleport to="body">
    <postModal :show="showModal" @close="showModal = false">
      <template #time>
        <div class="col-sm-13">
          <input disabled type="text" class="form-control border border-secondary" id="time" :value="formattedTime">
        </div>
      </template>
      <template #body>
        <div class="col-sm-13">
          <textarea type="text" class="form-control text-break border border-secondary" id="body" :value="body"></textarea>
        </div>
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