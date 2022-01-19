<template>
  <div class="fhContainer d-flex justify-center">
    <v-container>
      <v-row>
        <v-col>
          <h1 class="text-h3 mt-5 mb-2">
            Welcome to Trakr.app
          </h1>
          <p>
            This is work in progress and you may find bugs, please consider contributig to this project.
          </p>
          <p>
            You can browse maps without beeing logged in. You will also recive global data in realtime, a login is only required for us to save data.
          </p>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-card
            elevation="5"
            color="#724fe0"
            dark
            class="mr-3"
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
        </v-col>
        <v-col>
          <v-card
            color="#d35ebb"
            elevation="5"
            dark
            class="mr-3"
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
              <span class="my-2">
                Looking for client
              </span>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col>
          <v-card
            elevation="5"
            color="#e8b36d"
            dark
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
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <h2>Compatibility list</h2>
          <p>For now this is very limited but if you want a game supported consider contributig on github</p>
          <Compatibility />
        </v-col>
      </v-row>
    </v-container>
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
  background: #121212;
  z-index: 1;
position: relative;
}
</style>
