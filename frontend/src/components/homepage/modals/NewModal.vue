<template>
  <Transition name="modal">
    <div v-if="show" class="modal-mask">
      <div class="modal-wrapper" @click="$emit('close')">
        <div class="modal-container" @click.stop="">
          <div class="modal-header justify-content-center">
            <h3>Create a new post</h3>
          </div>

          <div class="modal-body">
              <label for="bodyText" class="form-label mb-3">Body:</label>
              <div class="col-sm-13">
                <textarea type="text" v-model="bodyRef" class="form-control text-break border border-secondary" id="bodyText"></textarea>
              </div>
          </div>

          <div class="modal-footer justify-content-center">
            <button
                class="col"
                @click.once="createPost"
            >Create</button>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import {ref} from "vue";
import router from "../../../router";

const props = defineProps(
    {
      show: Boolean,
    }
);

const bodyRef = ref('');

const createPost = async () => {
  const res = await fetch(`http://localhost:8000/posts/`, {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify({
      body: bodyRef.value
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
</script>

<style>

</style>