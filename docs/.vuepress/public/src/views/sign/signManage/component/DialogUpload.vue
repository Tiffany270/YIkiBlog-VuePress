<template>
  <dialog-container :ref="DIALOG_REF" title="批量导入名单" @closed="resetDialog" width="600px">
    <div class="selection-block">
      <div>
        选择协议：
        <el-select v-model.trim="form.agreementId" placeholder="请选择" clearable size="mini">
          <el-option v-for="item in agreementOptions" :key="item.id" :label="item.agreementName" :value="item.id" />
        </el-select>
      </div>
      <p class="agreement-title" @click="gotoAgreement">{{ agreementName }}</p>
      <div class="upload-box" @click="tell">
        <file-uploader
          :isPanelDisabled="uploadDisabled || !form.agreementId"
          :showType="UploadTypesEnum.PANEL"
          :acceptType="UploadFileTypes.XLS"
          :requestMethod="signUpload"
          :requestParams="requestParams"
          @on-success="uploadSuccess"
          :needMessage="false"
        />
      </div>
      <div class="template-text" @click="handleDownTemplate">下载导入表格模板</div>
      <!-- <el-button
        type="primary"
        :disabled="form.file ? false : true"
        class="submit-btn"
        plain
        @click="confirmUpload"
        >确认上传</el-button
      > -->
    </div>
  </dialog-container>
</template>

<script>
import fileUploader from '_c/FileUploader'
import { signUpload, getSignProcess, getByProject, downloadTemplate } from '@/apis/signManage'
import BaseDialog from '@/mixins/BaseDialog'
import { UploadFileTypes, UploadTypesEnum } from '@/maps/enums/UploadTypes'
import { downloadFileFromUrl } from '@/utils/handleDownload'
import { mapGetters } from 'vuex'
import { SIGN_SUBMIT_STATUS } from '@/maps/enum'

export default {
  name: 'BatchUpload',
  mixins: [BaseDialog],
  components: {
    fileUploader
  },
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      form: {
        agreementId: '',
        file: ''
      },
      signUpload,
      agreementName: '',
      agreementUrl: '',
      templateFile: '',
      uploadDisabled: true,
      agreementOptions: [],
      UploadTypesEnum,
      UploadFileTypes
    }
  },
  watch: {
    'form.agreementId'(id) {
      if (id) {
        const curAgreement = this.agreementOptions.find(agreement => agreement.id === id)
        this.agreementName = curAgreement.agreementName || ''
        this.agreementUrl = curAgreement.agreementUrl || ''
      } else {
        this.agreementName = ''
        this.agreementUrl = ''
      }
    }
  },
  computed: {
    ...mapGetters(['projectId']),
    // 上传需要携带的参数
    requestParams() {
      return {
        agreementId: this.form.agreementId,
        projectId: this.projectId
      }
    }
  },
  methods: {
    updateView(row) {
      // 先判断是否有名单未导入完成
      getSignProcess(this.projectId).then(({ data }) => {
        if (data && data.total) {
          this.$confirm('选中项目有名单导入未完成，是否进入？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消'
          }).then(() => {
            if (data.submitStatusEnum && data.submitStatusEnum.value === SIGN_SUBMIT_STATUS['未提交']) {
              this.$router.push({
                name: 'SignManageCheck'
              })
            } else {
              this.$router.push({
                name: 'SubmitConfirm'
              })
            }
          })
        } else {
          this.uploadDisabled = false
          this.form = { ...this.form, ...row }
          getByProject(this.projectId).then(({ data }) => {
            this.agreementOptions = data
            this.showDialog()
          })
        }
      })
    },
    // 下载导入模板
    async handleDownTemplate() {
      const res = await downloadTemplate()
      downloadFileFromUrl(res.data, '导入模板')
    },
    // 新开页面打开pdf
    gotoAgreement() {
      this.agreementUrl && window.open(this.agreementUrl)
    },
    // 选择协议了才能上传文件
    tell() {
      if (!this.form.agreementId) {
        this.$message.info('请先选择协议')
      }
    },
    // 上传成功 跳转到校验列表
    uploadSuccess() {
      this.hideDialog()
      this.$router.push({
        name: 'SignManageCheck'
      })
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
/deep/.el-upload-dragger {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 650px;
  height: 360px;
}
.upload-slot {
  margin-top: 80px;
  text-align: center;
}
.selection-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-wrap: wrap;
  .el-select {
    margin-right: 20px;
  }
  .agreement-title {
    cursor: pointer;
    &:hover {
      color: #169bd5;
    }
  }
  .upload-box {
    margin-bottom: 14px;
  }
  .template-text {
    text-align: center;
    cursor: pointer;
    color: #cc3333;
    font-weight: 500;
    margin-bottom: 30px;
  }
}
.template-a {
  height: 20px;
  display: block;
  text-align: center;
  margin-top: 30px;
  width: 100%;
  a {
    color: #6c6ade;
    text-decoration: none;
    width: 20px;
  }
}
</style>
