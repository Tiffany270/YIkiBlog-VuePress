<template>
  <dialog-container :ref="DIALOG_REF" title="导入失败数据" width="1150px">
    <div class="fail-wrapper">
      <XBTable :has-page="false" :columns="failStudioColumns" :data="failStudioData" :max-height="500">
        <template v-slot:handle>
          <el-button type="primary" plain @click="handleExportFailStudio"
            ><i class="iconfont xbicon-download2-x"></i> 导出失败数据</el-button
          >
        </template>
      </XBTable>
    </div>
  </dialog-container>
</template>

<script>
import BaseDialog from '@/mixins/BaseDialog'
import XBTable from '_c/XBTable/index.vue'
import { exportUploadFailData } from '@/apis/studio'
import { downloadBlobFile } from '@/utils/download-blob-file'
import { failStudioColumns } from '../../config'
export default {
  name: 'DialogStudioImportFail',
  mixins: [BaseDialog],
  components: {
    XBTable
  },
  data() {
    return {
      failStudioColumns,
      failStudioData: [],
      pageTotal: 0
    }
  },

  methods: {
    show(data) {
      this.failStudioData = data
      this.showDialog()
    },
    async handleExportFailStudio() {
      const res = await exportUploadFailData()
      downloadBlobFile(res)
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.fail-wrapper {
  min-height: 500px;
  padding-bottom: 50px;
}
</style>
