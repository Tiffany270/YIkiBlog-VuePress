<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
import { handleUnloadAuth } from '@utils/handle-unload-auth'
export default {
  name: 'App',
  mounted() {
    handleUnloadAuth()
  }
}
</script>
<style lang="scss"></style>
