<template>
  <Transition name="modal">
    <div v-if="show" class="modal-mask">
      <div class="modal-wrapper" @click="$emit('close')">
        <div class="modal-container" @click.stop="">
          <div class="modal-header justify-content-center">
            <h3>A post</h3>
          </div>

          <div class="modal-body">
            <div>
              <label for="time" class="form-label mb-3">Time:</label>
              <slot name="time">No time specified.</slot>
            </div>
            <div class="mt-3">
              <label for="bodyText" class="form-label mb-3">Body:</label>
              <div class="col-sm-13">
                <textarea type="text" v-model="bodyRef" class="form-control text-break border border-secondary" id="bodyText"></textarea>
              </div>
            </div>
          </div>

          <div class="modal-footer row gx-1">
              <button
                  class="btn btn-secondary col"
                  @click="$emit('updateValue', bodyRef)"
              >Update</button>
            <div class="col"></div>
            <button
                class="btn btn-danger col"
                @click="$emit('delete')"
            >Delete</button>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
  import {ref} from "vue";

  const props = defineProps(
      {
        show: Boolean,
        body: String
      }
  );

  const bodyRef = ref(props.body);




</script>

<style>
</style>