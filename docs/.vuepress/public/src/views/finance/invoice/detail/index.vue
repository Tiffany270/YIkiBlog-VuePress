<template>
  <page-container show-go-back>
    <block-container>
      <el-tabs v-model="currentTab" @tab-click="handleClick">
        <el-tab-pane :label="item.label" :name="item.name" v-for="item in tabList" :key="item.name">
          <component v-if="currentTab === item.name" :is="item.component"></component>
        </el-tab-pane>
      </el-tabs>
    </block-container>
  </page-container>
</template>

<script>
import BasePage from '@/mixins/BasePage'
import InvoiceApply from './components/InvoiceApply'
import ApplyDetail from './components/ApplyDetail'
import InvoiceInfo from './components/InvoiceInfo'
// import DeliveryInfo from './components/DeliveryInfo'
export default {
  name: 'InvoiceDetail',
  mixins: [BasePage],
  data() {
    return {
      currentTab: 'invoiceApply',
      tabList: [
        { label: '开票信息', name: 'invoiceApply', component: InvoiceApply },
        { label: '关联账单', name: 'applyDetail', component: ApplyDetail },
        { label: '发票明细', name: 'invoiceInfo', component: InvoiceInfo }
        // { label: '快递信息', name: 'deliveryInfo', component: DeliveryInfo }
      ]
    }
  },
  mounted() {
    console.log('parent')
  },
  methods: {
    handleClick() {}
  }
}
</script>

<style lang="scss" rel="stylesheet/scss"></style>
