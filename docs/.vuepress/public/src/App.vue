<template>
  <div id="app" class="app">
    <router-view />
  </div>
</template>
<script>
import { handleUnloadCookie } from '@/utils/handleUnloadCookie'
export default {
  name: 'App',
  mounted() {
    handleUnloadCookie()
  }
}
</script>
<style lang="scss"></style>
