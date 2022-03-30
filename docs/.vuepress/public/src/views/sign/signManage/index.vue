<template>
  <page-container>
    <search-form :list="searchList" ref="searchForm" @on-search="handleSearch" />
    <block-container>
      <XBTable
        title="签约管理"
        :columns="tableColumns"
        :data="tableData"
        @on-page-change="handlePageChange"
        :total="pageTotal"
        @on-selection-change="sectionChange"
        :onRowKey="changeRowKey"
      >
        <template v-slot:handle>
          <!-- <div class="action-hint">
            <el-tooltip placement="top">
              <template slot="content">
                <div class="tooltip-content">
                  <p>1. 系统将自动识别Excel表格信息，无需按模板编辑</p>
                  <p>2. 表格必须包含 姓名、身份证号、手机号，将智能匹配模板。</p>
                </div>
              </template>
              <i class="el-icon-question" />
            </el-tooltip>
            <span>智能上传帮助</span>
          </div> -->
          <el-button size="small" v-if="checkPermission('signManage-checkQrcode')" @click="showQrCode"
            >查看二维码</el-button
          >
          <el-button
            :disabled="!tableData.length"
            v-if="checkPermission('signManage-batchReminder')"
            @click="showExpediteSign()"
            plain
          >
            <i class="iconfont xbicon-message"></i>
            批量催签</el-button
          >
          <el-button
            :disabled="!tableData.length"
            v-if="checkPermission('signManage-allReminder')"
            @click="showExpediteSign(true)"
            plain
          >
            <i class="iconfont xbicon-message"></i>
            全部催签</el-button
          >
          <el-button
            :loading="isDownload"
            v-if="checkPermission('signManage-batchDownloadContract')"
            :disabled="!tableData.length"
            @click="showPdfediteSign()"
            plain
          >
            <i class="iconfont xbicon-download1"></i>
            批量下载合同</el-button
          >
          <el-button
            size="small"
            v-if="checkPermission('signManage-exportBatchSign')"
            @click="toApply"
            type="primary"
            plain
          >
            <i class="iconfont xbicon-Import"></i>
            批量导入名单</el-button
          >
          <el-button
            :disabled="!tableData.length"
            v-if="checkPermission('signManage-downloadQueryResult')"
            @click="downloadResult"
            type="primary"
            plain
          >
            <i class="iconfont xbicon-download1"></i>
            导出数据</el-button
          >
        </template>
      </XBTable>
    </block-container>
    <dialog-qr-code ref="DialogQrCode" />
    <dialog-upload ref="DialogUpload" />
  </page-container>
</template>

<script>
import SearchForm from '_c/SearchForm/index.vue'
import XBTable from '_c/XBTable/index.vue'
import { signManageSearchItems, getStudioTableCols } from './component/config.js'
import { downloadFileFromUrl, downloadZIP, downloadBlobFile } from '@/utils/handleDownload'
import DialogQrCode from './component/DialogQrCode.vue'
import DialogUpload from './component/DialogUpload.vue'
import {
  getSignPage,
  contractInvalid,
  contractCancellation,
  contractUrgeTimes,
  getContractBySignAccount,
  contractUrgeBySms,
  exportList
} from '@/apis/signManage'
import { getUrls } from '@/apis/oss'
import { SIGN_STATUS } from '@/maps/enum'
import BasePage from '@/mixins/BasePage'
import PageMixin from '@/mixins/Page'

export default {
  name: 'SignManage',
  components: {
    SearchForm,
    XBTable,
    DialogQrCode,
    DialogUpload
  },
  mixins: [BasePage, PageMixin],
  data() {
    return {
      searchList: [...signManageSearchItems],
      tableColumns: [],
      signAccountIds: [],
      signAccountObj: [],
      tableData: [],
      pageTotal: 0,
      ValSignStatus: false,
      listQuery: {},
      isDownload: false
    }
  },
  mounted() {
    this.tableColumns = getStudioTableCols(this)
    this.fetchData()
  },
  methods: {
    handleSearch(data) {
      this.searchForm = { ...data }
      this.pages.current = 1
      this.fetchData()
      this.listQuery = data
    },
    fetchData() {
      getSignPage({
        ...this.searchForm,
        ...this.pages
      }).then(({ data }) => {
        this.tableData = data.records
        this.pageTotal = data.total
      })
    },
    // 根据数据自定义row-key
    changeRowKey(row, callback) {
      return callback(row.id)
    },
    handlePageChange(data) {
      this.pages = data
      this.fetchData()
    },
    contractInvalidHandle(contractId) {
      this.$msgbox({
        title: '提示',
        message: '确认要作废本签约合同吗？',
        showCancelButton: true
      }).then(() => {
        contractInvalid(contractId).then(() => {
          this.fetchData()
        })
      })
    },
    contractCancellationHandle(contractId) {
      this.$msgbox({
        title: '提示',
        message: '确认要注销本签约合同吗？',
        showCancelButton: true
      }).then(() => {
        contractCancellation(contractId).then(() => {
          this.fetchData()
        })
      })
    },
    contractCheck(id) {
      getContractBySignAccount(id).then(({ data }) => {
        window.open(data[0].signFile)
      })
    },
    showExpediteSign(status) {
      if (status) {
        this.showMessageSms('', status)
      } else {
        if (!this.signAccountIds.length) {
          this.$message.warning('请先勾选要处理的内容')
        } else if (!this.ValSignStatus) {
          this.$message.warning('只能勾选待签约数据进行催签')
        } else {
          this.showMessageSms(this.signAccountIds.length, status)
        }
      }
    },
    async showMessageSms(notSignNumber, status) {
      let data = {}
      // 全部催签才请求这个接口
      if (status) {
        try {
          const res = await contractUrgeTimes()
          data = res.data
        } catch (e) {
          data = {}
        }
      }
      if (status && !data.memberNotSign) {
        this.$message.warning('未签约人数为0，无需催签')
        return
      }
      const title = status ? '全部催签' : '批量催签'
      const type = status ? '全部' : '已选'
      const number = status ? data.memberNotSign : notSignNumber
      const message = `${type}未签约人数：${number}<br>请问是否确认发送通知给当前用户？<br>一天内可发送通知5次，已满5次的用户将不发送邀签短信。`
      this.$msgbox({
        title,
        message,
        confirmButtonText: '发送通知',
        cancelButtonText: '取消',
        dangerouslyUseHTMLString: true,
        showCancelButton: true
      })
        .then(() => {
          contractUrgeBySms({
            contractIds: status ? [] : this.signAccountIds
          }).then(() => {})
        })
        .catch(() => {})
      // contractUrgeTimes({}).then(({ data }) => {
      //   if (data.memberNotSign) {
      //     this.$msgbox({
      //       title: status ? '全部催签' : '批量催签',
      //       message: `${status ? '全部' : '已选'}未签约人数：${
      //         data.memberNotSign || notSignNumber || 0
      //       }<br>请问是否确认发送通知给当前用户？<br>一天内可发送通知5次，已满5次的用户将不发送邀签短信。`,
      //       confirmButtonText: '发送通知',
      //       cancelButtonText: '取消',
      //       dangerouslyUseHTMLString: true,
      //       showCancelButton: true
      //     }).then(() => {
      //       contractUrgeBySms({
      //         contractIds: status ? [] : this.signAccountIds
      //       }).then(() => {})
      //     })
      //   } else {
      //     this.$message.warning('未签约人数为0，无需催签')
      //   }
      // })
    },
    sectionChange(val) {
      this.signAccountObj = []
      this.signAccountIds = []
      const arr = []
      val.forEach(item => {
        const obj = {}
        obj.name = item.projectName + '-' + item.realName
        obj.fileUrl = item.signFile
        this.signAccountIds.push(item.contractId)
        arr.push(item.signStatus.value)
        this.signAccountObj.push(obj)
      })
      // 只有待签约的才能催签
      this.ValSignStatus = arr.every(item => item === SIGN_STATUS['待签约'])
    },
    async showPdfediteSign() {
      if (!this.signAccountObj.length) {
        this.$message.warning('请先勾选要处理的内容')
        return
      }
      if (this.signAccountObj.length > 100) {
        this.$message.error('最多处理一百条数据')
        return
      }
      try {
        const fileIds = this.signAccountObj.map(item => item.fileUrl)
        const res = await getUrls(fileIds)
        this.signAccountObj.forEach(item => {
          item.url = res[item.fileUrl]['url']
        })
      } catch (e) {
        this.$message.error(e)
      }
      if (this.signAccountObj.length === 1) {
        // 单个文件处理
        downloadFileFromUrl(this.signAccountObj[0].url, this.signAccountObj[0].name)
      } else if (this.signAccountObj.length <= 100) {
        this.isDownload = true
        try {
          await downloadZIP(
            this.signAccountObj,
            // this.$store.getters.projectName + '-签约文件'
            '签约文件'
          )
          this.isDownload = false
        } catch (e) {
          this.isDownload = false
          this.$message.error(e)
        }
      }
    },
    downloadResult() {
      this.$refs.searchForm.handleSearch()
      exportList(this.listQuery).then(data => {
        downloadBlobFile(data)
      })
    },
    showQrCode() {
      this.$refs.DialogQrCode.updateView()
    },
    toApply() {
      this.$refs.DialogUpload.updateView()
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss">
.action-hint {
  display: inline-block;
  margin-right: 10px;
}
</style>
