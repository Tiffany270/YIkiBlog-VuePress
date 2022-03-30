<template>
  <dialog-container :ref="DIALOG_REF" title="批量导入" width="500px">
    <div class="upload-container">
      <file-uploader
        :need-message="false"
        :showType="UploadTypesEnum.PANEL"
        :acceptType="UploadFileTypes.XLS"
        :requestMethod="uploadStudios"
        @on-success="handleUploadSuccess"
      />
    </div>
    <div class="upload-text" @click="handleDownTemplate">下载导入表格模板</div>
  </dialog-container>
</template>

<script>
import BaseDialog from '@/mixins/BaseDialog'
import { downloadImportTemplate, uploadStudios, queryCurrentProcress } from '@/apis/studio'
import { downloadBlobFile } from '@/utils/download-blob-file'
import FileUploader from '_c/FileUploader/index.vue'
import { UploadFileTypes, UploadTypesEnum } from '@/maps/enums/UploadTypes'
import { mapGetters } from 'vuex'
export default {
  name: 'DialogBatchImportStudio',
  mixins: [BaseDialog],
  components: {
    FileUploader
  },
  data() {
    return {
      uploadStudios,
      UploadTypesEnum,
      UploadFileTypes
    }
  },
  computed: {
    ...mapGetters(['projectId'])
  },
  methods: {
    updateView() {
      // this.updateView()
      this.getCurrentUploadProcress()
    },
    // 获取当前上传进度
    async getCurrentUploadProcress() {
      const { data } = await queryCurrentProcress('SIGN_STUDIO_IMPORT', this.projectId)
      if (data && data.total) {
        this.$confirm('当前项目有导入数据未完成，是否进入？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(() => {
          // 还有数据没导入完
          if (Number(data.current) < Number(data.total)) {
            this.$router.push({
              name: 'CheckStudioImportProcress'
            })
          } else {
            // 导完了
            this.$router.push({
              name: 'StudioImportResultList',
              query: {
                failCount: data.failCount,
                successCount: data.successCount
              }
            })
          }
        })
      } else {
        this.showDialog()
      }
    },
    handleUploadSuccess() {
      this.hideDialog()
      this.$router.push({ name: 'CheckStudioImportProcress' })
      // this.$emit('on-success', data)
    },
    // 下载导入模板
    async handleDownTemplate() {
      const res = await downloadImportTemplate({ id: '1' })
      downloadBlobFile(res)
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss">
.upload-container {
  box-sizing: border-box;
  padding: 30px;
  text-align: center;
}
// .upload-studio {
//   .el-upload {
//     .el-upload-dragger {
//       display: flex;
//       align-items: center;
//       justify-content: center;
//       flex-direction: column;
//       width: 650px;
//       height: 360px;
//     }
//   }
// }
.upload-text {
  // margin-top: 15px;
  text-align: center;
  cursor: pointer;
  color: #cc3333;
  font-weight: 500;
  margin-bottom: 30px;
}
</style>
