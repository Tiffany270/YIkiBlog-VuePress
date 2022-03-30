<template>
  <page-container show-go-back>
    <div class="studio-fail">
      <block-container>
        <XBTable :has-page="false" title="导入失败数据列表" :columns="failStudioColumns" :data="failStudioData">
          <template v-slot:handle>
            <el-button type="primary" plain @click="handleExportFailStudio"
              ><i class="iconfont xbicon-download2-x"></i> 导出失败数据</el-button
            >
            <el-button type="primary" plain @click="handleClearFailData"
              ><i class="iconfont xbicon-delete"></i> 清除失败数据</el-button
            >
          </template>
        </XBTable>
      </block-container>
    </div>
  </page-container>
</template>

<script>
import BasePage from '@/mixins/BasePage'
import XBTable from '_c/XBTable/index.vue'
import { exportUploadFailData, queryStudioImportFailData, clearFailData } from '@/apis/studio'
import { downloadBlobFile } from '@/utils/download-blob-file'
import { failStudioColumns } from '../config'
export default {
  name: 'StudioImportFailList',
  mixins: [BasePage],
  components: {
    XBTable
  },
  data() {
    return {
      failStudioColumns,
      failStudioData: []
    }
  },
  mounted() {
    this.getStudioFailData()
  },
  methods: {
    async getStudioFailData() {
      const { data } = await queryStudioImportFailData()
      this.failStudioData = data || []
    },
    async handleExportFailStudio() {
      const res = await exportUploadFailData()
      downloadBlobFile(res)
    },
    async handleClearFailData() {
      const { code } = await clearFailData()
      if (code === 0) {
        setTimeout(() => {
          this.$router.push({ name: 'StudioManage' })
        }, 1000)
      }
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss"></style>
