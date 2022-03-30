<template>
  <dialog-container
    :ref="DIALOG_REF"
    custom-class="custom-modify-style"
    title="详情"
    @closed="resetDialog"
    width="800px"
  >
    <styled-title>成果展示</styled-title>
    <detail-list :row="1" :labelData="labelData" :data="data">
      <template #pics>
        <span v-if="!data.pics.length">暂无</span>
        <div v-else style="padding-left: 70px">
          <file-preview-list :file-id-data="data.pics"></file-preview-list>
        </div>
      </template>
    </detail-list>
    <styled-title>签署协议</styled-title>
    <div class="contract-detail">
      <div class="contract-tip">附件</div>
      <div class="box">
        <div class="box-left">
          <img src="@/assets/images/pdf.png" alt="" />
          <span>{{ agreementName }}</span>
        </div>
        <div class="box-right">
          <el-button type="primary" @click="viewPDF" class="box-btn">查看合同</el-button>
        </div>
      </div>
    </div>
  </dialog-container>
</template>
<script>
import BaseDialog from '@/mixins/BaseDialog'
import StyledTitle from '_c/StyledTitle'
import FilePreviewList from '_c/FilePreviewList'
import DetailList from '_c/DetailList'
import { getTaskUserDetail } from '@/apis/taskManage'
import { getContractBySignAccount } from '@/apis/signManage'
// import { getOssFileListByIds } from '@/utils/oss-uploader/utilities/get-file-url-from-id'
export default {
  name: 'DialogApproval',
  mixins: [BaseDialog],
  components: {
    StyledTitle,
    DetailList,
    FilePreviewList
  },
  data() {
    return {
      signAccountId: '',
      taskId: '',
      labelData: [
        {
          label: '成果描述',
          key: 'result'
        },
        {
          label: '成果图片',
          key: 'pics',
          slot: 'pics'
        }
      ],
      data: {
        result: '',
        pics: []
      },
      agreementName: '',
      agreementUrl: ''
    }
  },
  methods: {
    updateView(taskId, signAccountId) {
      this.taskId = taskId
      this.signAccountId = signAccountId
      this.taskDetail()
    },
    taskDetail() {
      getTaskUserDetail({ taskId: this.taskId, signAccountId: this.signAccountId }).then(res => {
        this.data.result = (res.data && res.data.result) || '暂无'
        const pics = res.data && res.data.filedId && res.data.filedId.split(',')
        this.data.pics = []
        if (pics) {
          pics.map(item => {
            this.data.pics.push({
              fileId: item,
              fileName: ''
            })
          })
          // getOssFileListByIds(pics, res => {
          //   this.data.pics = res
          // })
        }
        this.getContractBySignAccount()
        this.showDialog()
      })
    },
    // requestForOssTempUrl(pics) {
    //   requestForOssTempUrl(pics).then(res => {
    //     this.data.pics = res.map(item => ({ url: item }))
    //   })
    // },
    getContractBySignAccount() {
      getContractBySignAccount(this.signAccountId).then(res => {
        if (res.data) {
          this.agreementName = res.data[0].contractName
          this.agreementUrl = res.data[0].signFile
        }
      })
    },
    viewPDF() {
      window.open(this.agreementUrl)
    }
  }
}
</script>
<style lang="scss" scoped>
.contract-detail {
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  .contract-tip {
    height: 44px;
    line-height: 44px;
    padding: 0 25px;
    border-bottom: 1px solid #d9d9d9;
  }
  .box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 13px 25px;
    .box-left {
      display: flex;
      align-items: center;
      img {
        width: 64px;
        height: 64px;
      }
    }
    .box-btn {
      display: flex;
      height: 27px;
      align-items: center;
      font-size: 12px;
    }
  }
}
</style>
