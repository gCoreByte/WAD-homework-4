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
                  class="col"
                  @click="$emit('updateValue', bodyRef)"
              >Update</button>
            <div class="col"></div>
            <button
                class="col"
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

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}


/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

</style>