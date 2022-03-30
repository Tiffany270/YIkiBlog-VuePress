<template>
  <error-content
    code="401"
    desc="抱歉，你无权访问该页面"
    :src="error_401_img"
  />
</template>

<script>
import ErrorContent from './components/ErrorContent'
import error_401_img from '@/assets/images/error-401.png'
export default {
  name: 'ERROR401',
  components: {
    ErrorContent
  },
  data() {
    return {
      error_401_img
    }
  }
}
</script>
