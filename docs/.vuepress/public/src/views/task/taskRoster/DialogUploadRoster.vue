<template>
  <dialog-container :ref="DIALOG_REF" title="上传任务名单" @closed="resetDialog" width="600px">
    <div class="selection-block">
      <div class="upload-box">
        <file-uploader
          :isPanelDisabled="uploadDisabled"
          :showType="UploadTypesEnum.PANEL"
          :acceptType="UploadFileTypes.XLS"
          :requestMethod="batchUpload"
          :requestParams="{ taskId }"
          @on-success="uploadSuccess"
          :needMessage="false"
        />
      </div>
      <div class="template-text" @click="handleDownTemplate">下载模板</div>
    </div>
  </dialog-container>
</template>

<script>
import fileUploader from '_c/FileUploader'
import { batchUpload, downloadTemplate } from '@/apis/taskManage'
import BaseDialog from '@/mixins/BaseDialog'
import { UploadFileTypes, UploadTypesEnum } from '@/maps/enums/UploadTypes'
import { downloadFileFromUrl } from '@/utils/handleDownload'

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
    },
    taskId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      form: {
        file: ''
      },
      templateFile: '',
      uploadDisabled: false,
      UploadTypesEnum,
      UploadFileTypes,
      batchUpload,
      failCount: 0,
      successCount: 0
    }
  },
  methods: {
    updateView() {
      this.showDialog()
    },
    // 下载导入模板
    async handleDownTemplate() {
      const res = await downloadTemplate()
      downloadFileFromUrl(res.data, '导入模板')
    },
    // 上传成功 跳转到校验列表
    uploadSuccess(key) {
      this.hideDialog()
      this.$router.push({
        name: 'TaskRosterCheck',
        query: {
          key,
          taskId: this.taskId
        }
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
