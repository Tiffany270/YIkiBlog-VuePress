<template>
  <block-container>
    <XBTable
      title="批量打款明细"
      :columns="payrollDetailColumns"
      :data="tableData"
      :total="total"
      @on-page-change="handlePageChange"
    >
    </XBTable>
  </block-container>
</template>

<script>
import BasePage from '@/mixins/BasePage'
import XBTable from '_c/XBTable/index.vue'
import { payrollDetailColumns } from '../../../config'
import PageMixin from '@/mixins/Page'
export default {
  name: 'PayConfirmInfoDetail',
  mixins: [BasePage, PageMixin],
  components: {
    XBTable
  },
  props: {
    total: {
      type: [Number, String],
      default: 0
    },
    tableData: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      payrollDetailColumns
    }
  },
  methods: {
    handlePageChange(pages) {
      this.$emit('on-page-change', pages)
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss"></style>
