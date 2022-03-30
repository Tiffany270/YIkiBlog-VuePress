<template>
  <div class="invoice-info">
    <div class="invoice-info__receipt">
      <styled-title style="margin-bottom: 24px">发票信息</styled-title>
      <XBTable :columns="invoiceInfoColumns" :data="invoiceInfoData" :has-page="false" :has-handle="false" />
    </div>
    <div class="invoice-info__file">
      <styled-title style="margin-bottom: 24px">附件信息</styled-title>
      <file-preview-list :file-id-data="fileIdList" v-if="fileIdList.length" />
      <div class="invoice-info__file--none" v-if="!fileIdList.length">
        <no-data />
      </div>
    </div>
  </div>
</template>

<script>
import XBTable from '_c/XBTable'
import NoData from '_c/NoData'
import StyledTitle from '_c/StyledTitle'
import FilePreviewList from '_c/FilePreviewList'
import { invoiceInfoColumns } from '../../config'
import { queryInvoiceDetail } from '@/apis/invoice'
// import { getOssFileListByIds } from '@/utils/oss-uploader/utilities/get-file-url-from-id'
export default {
  name: 'InvoiceInfo',
  components: {
    XBTable,
    StyledTitle,
    FilePreviewList,
    NoData
  },
  data() {
    return {
      invoiceInfoColumns,
      invoiceInfoData: [],
      fileIdList: []
    }
  },
  computed: {
    invoiceId() {
      return this.$route.query.id
    }
  },
  mounted() {
    this.getInvoiceInfoData()
  },
  methods: {
    async getInvoiceInfoData() {
      const res = await queryInvoiceDetail({ invoiceId: this.invoiceId })
      this.invoiceInfoData = (res.data && res.data.attachmentDTOS) || []
      this.fileIdList = []
      const fileIdList =
        (res.data && res.data.invoiceDTO && res.data.invoiceDTO.fileIds && res.data.invoiceDTO.fileIds.split(',')) || []
      // 获取附件
      fileIdList &&
        Array.isArray(fileIdList) &&
        fileIdList.length &&
        fileIdList.map(item => {
          this.fileIdList.push({
            fileId: item,
            fileName: ''
          })
        })
      // getOssFileListByIds(fileIdList, res => {
      //   this.fileList = res
      // })
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss">
@import '@/styles/mixin';
@include b(invoice-info) {
  @include e(receipt) {
    margin-bottom: 24px;
  }
}
</style>
