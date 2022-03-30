<template>
  <page-container show-go-back :go-back-method="handleCustomGoBack">
    <div class="pass-pay">
      <top-steper :list="STEPER_TEXT_LIST" :current="2" />
      <pass-pay-panel :payAmount="payAmount" />
    </div>
    <!-- <template v-slot:bottomBarRight>
      <el-button type="primary" style="margin-right: 15px" @click="goBackList">返回列表</el-button>
    </template> -->
  </page-container>
</template>

<script>
import BasePage from '@/mixins/BasePage'
import TopSteper from '_c/TopSteper'
import PassPayPanel from './components/PassPayPanel'
import { STEPER_TEXT_LIST } from '../config'
import { queryPassPayBillList } from '@/apis/payroll'
export default {
  name: 'PassToPay',
  mixins: [BasePage],
  components: {
    TopSteper,
    PassPayPanel
  },
  data() {
    return {
      STEPER_TEXT_LIST,
      payAmount: {}
    }
  },
  computed: {
    batchNo() {
      return this.$route.query.batchNo
    }
  },
  mounted() {
    this.getPayAmount()
  },
  methods: {
    async getPayAmount() {
      const { data } = await queryPassPayBillList(this.batchNo)
      this.payAmount = data || {}
    },
    handleCustomGoBack() {
      this.$router.replace({ name: 'PayCommission' })
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss"></style>
