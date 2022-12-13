<template>
  <div>
    <button type="button" class="btn btn-primary mb-2"  v-if = "authResult" @click="Logout">Logout</button>
  </div>
</template>

<script>
import auth from "../../auth";
import router from "../router";

export default {
  name: "Logout",
  components: {},

  data: function () {
    return {
      authResult: auth.authenticated()
    }
  },

  methods: {
    Logout() {
      fetch("http://localhost:8000/auth/logout", {
        credentials: 'include',
      })
          .then((response) => response.json())
          .then(async (data) => {
            console.log(data);
            console.log('jwt removed');
            await router.push("/login");
          })
          .catch((e) => {
            console.log(e);
            console.log("error logout");
          });
    },
  }
}
</script>