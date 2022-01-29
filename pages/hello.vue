<template>
  <div class="fhContainer d-flex justify-center">
    <v-container>
      <v-row>
        <v-col>
          <h1 class="text-h3 mt-5 mb-2">
            Getting Started
          </h1>
          <p class="mb-0">
            <strong>Testing:</strong>
            If you just want to test this, enter the url and port for your game from the list below into the Data out settings. <br>
          </p>
          <p class=" ma-0 pa-0 text-caption">
            Data will apear on <NuxtLink to="/">
              home
            </NuxtLink>
          </p>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <h5 class="text-h5">
            Compatibility list
          </h5>
          <p>For now this is very limited but if you want a game supported consider contributing on github</p>
          <LazyCompatibility />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <p class="text-caption warning--text">
            This is work in progress and you may find bugs, please consider contributing to this project.
          </p>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <h5 class="text-h5">
            Saving Data
          </h5>

          <p>
            This only applies if you want to save telemetry to our database
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

            <v-card-text>Because of limitations we need to authenticate user to be able to moderate bad actors. For now we only support auth over discord oauth. You can still use trakr.app without a login, data will just be passed to you and not saved </v-card-text>

            <v-card-actions>
              <AppBarLogin v-if="!$auth.loggedIn" />
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
            <v-card-text>Set your games UDP data out to a UDP url from the list below and go to the website on the same IP, a prompt will appear asking you to register your client.</v-card-text>
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
    </v-container>
  </div>
</template>
<script>
export default {
  head: {
    title: 'Hello'
  }
}
</script>
<style scoped>
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
