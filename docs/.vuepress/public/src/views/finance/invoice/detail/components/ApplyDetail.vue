<template>
  <div class="apply-detail">
    <XBTable
      :hasHandle="false"
      :hasPage="false"
      :columns="applyDetailColumns"
      :data="tableData"
      @on-page-change="handlePageChange"
    >
    </XBTable>
  </div>
</template>

<script>
import XBTable from '_c/XBTable/index.vue'
import { applyDetailColumns } from '../../config'
import { queryInvoiceDetailApplyInfo } from '@/apis/invoice'
import { mapGetters } from 'vuex'
export default {
  name: 'ApplyDetail',
  components: {
    XBTable
  },
  mounted() {
    this.getApplyDetail()
  },
  data() {
    return {
      applyDetailColumns,
      tableData: []
    }
  },
  computed: {
    ...mapGetters(['userProject'])
  },
  methods: {
    async getApplyDetail() {
      const {
        data: { records }
      } = await queryInvoiceDetailApplyInfo({
        invoiceId: this.$route.query.id,
        projectId: this.userProject.projectId
      })
      this.tableData = records || []
    },
    handlePageChange() {}
  }
}
</script>

<style lang="scss" rel="stylesheet/scss"></style>
