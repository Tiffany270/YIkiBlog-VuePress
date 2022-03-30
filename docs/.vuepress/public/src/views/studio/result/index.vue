<template>
  <page-container class="studio-result">
    <block-container>
      <el-tabs v-model="currentResult" @tab-click="handleChangeTabs">
        <el-tab-pane :label="`上传失败(${failCount}条)`" name="FAIL">
          <div class="fail-handle">
            <el-button type="primary" plain @click="handleExportFailStudio" :disabled="!failStudioData.length"
              ><i class="iconfont xbicon-download2-x"></i> 导出失败数据</el-button
            >
          </div>
          <XBTable
            :hasHandle="false"
            :columns="failStudioColumns"
            :data="failStudioData"
            :total="failTotal"
            @on-page-change="handlePageFailChange"
          >
          </XBTable>
        </el-tab-pane>
        <el-tab-pane :label="`上传成功(${successCount}条)`" name="SUCCESS">
          <XBTable
            :hasHandle="false"
            :columns="successStudioColumns"
            :data="successStudioData"
            :total="successTotal"
            @on-page-change="handlePageSuccessChange"
          >
          </XBTable>
        </el-tab-pane>
      </el-tabs>
    </block-container>
    <template v-slot:bottomBarRight>
      <el-button type="primary" plain @click="handleClearFailData">完成</el-button>
      <!-- <el-button
        type="primary"
        plain
        @click="$router.push({ name: 'StudioManage' })"
        >返回列表</el-button
      > -->
    </template>
  </page-container>
</template>

<script>
import BasePage from '@/mixins/BasePage'
import XBTable from '_c/XBTable/index.vue'
import PageMixin from '@/mixins/Page'
import {
  exportUploadFailData,
  queryStudioImportFailData,
  queryStudioImportSuccessData,
  clearFailData
} from '@/apis/studio'
import { downloadBlobFile } from '@/utils/download-blob-file'
import { failStudioColumns, successStudioColumns } from '../config'
export default {
  name: 'StudioImportResultList',
  mixins: [BasePage, PageMixin],
  components: {
    XBTable
  },
  data() {
    return {
      currentResult: 'FAIL',
      failStudioColumns: Object.freeze(failStudioColumns),
      failStudioData: [],
      failTotal: 0,
      successStudioColumns: Object.freeze(successStudioColumns),
      successStudioData: [],
      successTotal: 0
    }
  },
  computed: {
    successCount() {
      return this.$route.query.successCount
    },
    failCount() {
      return this.$route.query.failCount
    }
  },
  mounted() {
    this.currentResult = this.failCount ? 'FAIL' : 'SUCCESS'
    this.failCount ? this.getStudioFailData() : this.getStudioSuccessData()
  },
  methods: {
    async getStudioFailData() {
      const { data } = await queryStudioImportFailData({ ...this.pages })
      this.failStudioData = data.records || []
      this.failTotal = data.total
    },
    // 获取成功数据
    async getStudioSuccessData() {
      const { data } = await queryStudioImportSuccessData({ ...this.pages })
      this.successStudioData = data.records || []
      this.successTotal = data.total
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
    },
    handlePageFailChange(data) {
      this.pages = data
      this.getStudioFailData()
    },
    handlePageSuccessChange(data) {
      this.pages = data
      this.getStudioSuccessData()
    },
    handleChangeTabs() {
      this.pages.current = 1
      this.currentResult === 'FAIL' ? this.getStudioFailData() : this.getStudioSuccessData()
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss">
@import '@/styles/mixin';
@include b(studio-result) {
  .fail-handle {
    margin-bottom: 10px;
    text-align: right;
  }
}
</style>
