<template>
  <div class="v-container d-flex justify-center">
    <div class="mt-5" style="max-width:60%">
      <div class="">
        <v-alert
          dense
          outlined
          type="error"
        >
          Early version, could <strong>crash</strong> your browser or pc, be <strong>carefull</strong>
        </v-alert>
        <h1 class="my-5 text-h3">
          Welcome to Trakr.app
        </h1>
        <p>
          This is work in progress and you may find bugs, please consider contributig to this project. <br> <strong>You can browse maps without beeing logged in.</strong> You will also recive global data in realtime, a login is only required for us to save data.
        </p>
      </div>
      <div class="d-flex justify-center mt-6" style="height:100%">
        <v-card
          color="#724fe0"
          dark
          class="mr-3"
          max-width="374"
          min-height="200"
        >
          <v-card-title class="text-h5">
            1. Login
          </v-card-title>

          <v-card-text>Because of limitations we need to authenticate user to be able to moderate bad actors. For now we only support auth over discord oauth.</v-card-text>

          <v-card-actions>
            <v-btn text>
              Login
            </v-btn>
          </v-card-actions>
        </v-card>
        <v-card
          color="#d35ebb"
          dark
          class="mr-3"
          max-width="374"
          min-height="200"
        >
          <v-card-title class="text-h5">
            2. Register Client
          </v-card-title>
          <v-card-text>Set your games UDP data out to <code>trakr.app:5300</code> and go to the website on the same IP, a prompt will apear asking you to register your client.</v-card-text>
          <v-card-actions>
            <v-progress-circular
              :size="20"
              indeterminate
              color="white"
              class="mx-3"
            />
            <span>
              Looking for client
            </span>
          </v-card-actions>
        </v-card>
        <v-card
          color="#e8b36d"
          dark
          class=""
          max-width="374"
          min-height="200"
        >
          <v-card-title class="text-h5">
            3. Enjoy
          </v-card-title>

          <v-card-text>You should be good to go, we will track your clients data and you don't need to be on the website ever again</v-card-text>

          <v-card-actions>
            <v-btn text to="/">
              Go home
            </v-btn>
          </v-card-actions>
        </v-card>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  head: {
    title: 'Home'
  }
}
</script>
<style scoped>
canvas{
  display:none !important
}
.v-card{
  height: fit-content;
}
.v-container{
  height: 100%;
  background: #1E1E1E;
  z-index: 1;
position: relative;
}
</style>
