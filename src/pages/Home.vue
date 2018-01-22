<template>
  <div>
    Home
    <hello-world></hello-world>
  </div>
</template>
<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator'
  import HelloWorld from '@/components/HelloWorld.vue'
  @Component({
    components: { HelloWorld }
  })
  export default class Home extends Vue {
    name: 'home'
  }
</script>
<style lang="scss" scoped>

</style>


