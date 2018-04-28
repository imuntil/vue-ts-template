<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator'
  @Component
  export default class App extends Vue {
    name: 'App'
  }
</script>

<style>
  #app {
    height: inherit;
    background-color: transparent;
  }
</style>
