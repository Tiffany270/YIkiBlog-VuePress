<template>
  <error-content code="404" desc="你要找的页面不存在" :src="img404Src" />
</template>

<script>
import ErrorContent from './components/ErrorContent'
import img404Src from '@/assets/images/error-404.png'
export default {
  name: 'ERROR404',
  components: {
    ErrorContent
  },
  data() {
    return {
      img404Src: img404Src
    }
  }
}
</script>
