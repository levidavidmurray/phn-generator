<template>
  <v-app>
    <v-app-bar color="grey lighten-3" app flat absolute></v-app-bar>
    <v-content class="grey lighten-3">
      <HelloWorld/>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import HelloWorld from './components/HelloWorld.vue';

export default Vue.extend({
  name: 'App',

  components: {
    HelloWorld,
  },

  data: () => ({
    //
  }),
});
</script>
