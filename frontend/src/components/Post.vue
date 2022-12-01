<template>
  <div>

    <ul> <!-- Header -->
      <li style="text-align: right">{{ time }}</li>
      <li><img :src="authorImage" alt="Profile photo" style="width: 40px"></li>
    </ul>

    <log-out></log-out>

    <div >
      {{ body }}
      <br>
      <img v-if="img" :src="img" alt="Body photo">
    </div>

    <div class="btn-toolbar">
      <add-post></add-post>
      <delete-all></delete-all>
    </div>

  </div>

</template>

<script>
import AddPost from "./AddPost";
import DeleteAll from "./DeleteAll";
import LogOut from "./Logout";
const props = defineProps({
  img: String,
  body: String,
  time: String,
  authorImage: String,
})
export default {
  components: {LogOut, DeleteAll, AddPost}
}
</script>