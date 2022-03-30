<template>
  <page-container show-go-back>
    <block-container style="height: 100%">
      <div class="check-progress">
        <progress-circle :current="current" :total="total" />
        <h4>数据准备中...</h4>
        <p>数据上传过程中您可离开此页面，数据将在后台继续完成上传</p>
      </div>
    </block-container>
  </page-container>
</template>

<script>
import BasePage from '@/mixins/BasePage'
import ProgressCircle from '_c/ProgressCircle/index'
import { queryCurrentProcress } from '@/apis/studio'
import { mapGetters } from 'vuex'
export default {
  name: 'CheckStudioImportProcress',
  mixins: [BasePage],
  components: {
    ProgressCircle
  },
  data() {
    return {
      current: 0,
      total: 0,
      timer: null
    }
  },
  computed: {
    ...mapGetters(['projectId'])
  },
  mounted() {
    this.getCurrentImportProcress()
  },
  methods: {
    async getCurrentImportProcress() {
      const { data } = await queryCurrentProcress('SIGN_STUDIO_IMPORT', this.projectId)
      if (data && data.total) {
        if (Number(data.current) < Number(data.total)) {
          this.current = data.current
          this.total = data.total
          this.timer = setTimeout(() => {
            this.getCurrentImportProcress()
          }, 5000)
        } else {
          setTimeout(() => {
            this.$router.push({
              name: 'StudioImportResultList',
              query: {
                failCount: data.failCount,
                successCount: data.successCount
              }
            })
          }, 500)
        }
      }
    }
  },
  beforeDestroy() {
    clearTimeout(this.timer)
  }
}
</script>

<style lang="scss" rel="stylesheet/scss">
@import '@/styles/mixin';
@include b(check-progress) {
  margin: 100px auto;
  text-align: center;
}
</style>
