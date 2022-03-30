<template>
  <dialog-container :ref="DIALOG_REF" title="工作室详情" width="800px" @closed="resetDialog">
    <div class="dialog__body">
      <div class="base-info info-panel">
        <styled-title>基本信息</styled-title>
        <detail-list :row="2" :labelData="studioDetailBaseFileds" :data="studioDetailData" />
      </div>
      <div class="tax-info">
        <styled-title>工商税务信息</styled-title>
        <detail-list :row="2" :labelData="studioDetailTaxFileds" :data="studioDetailData" />
      </div>
      <div class="studio-files info-panel">
        <styled-title>工作室附件</styled-title>
        <file-preview-list :file-id-data="fileIdList" v-if="fileIdList.length" />
      </div>
      <div
        class="approval-form info-panel"
        v-if="!(studioDetailData.businessStatus && forbidChangeStatus.includes(studioDetailData.businessStatus.value))"
      >
        <el-form ref="form" :model="formData" :rules="formRules" label-width="140px">
          <el-form-item label="设置工作室状态" prop="status">
            <el-select v-model="formData.status" placeholder="请设置工作室状态">
              <el-option
                label="申请注销"
                value="APPLY_CANCEL"
                :disabled="
                  !(
                    studioDetailData.businessStatus &&
                    studioDetailData.businessStatus.value === BUSINESS_STATUS['设立成功']
                  )
                "
              ></el-option>
              <el-option
                label="申请取消"
                value="DELETE_STUDIO"
                :disabled="
                  studioDetailData.businessStatus &&
                  studioDetailData.businessStatus.value === BUSINESS_STATUS['设立成功']
                "
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div slot="footer">
      <el-button @click="hideDialog">取消</el-button>
      <el-button type="primary" @click="handleSubmit" v-preventReClick>确定</el-button>
    </div>
  </dialog-container>
</template>

<script>
import BaseDialog from '@/mixins/BaseDialog'
import StyledTitle from '_c/StyledTitle/index.vue'
import DetailList from '_c/DetailList/index.vue'
// import XBTable from '_c/XBTable/index.vue'
import FilePreviewList from '_c/FilePreviewList'
import {
  studioDetailBaseFileds,
  studioDetailTaxFileds,
  // getStudioDetailFilesTableCols,
  STUDIO_STATUS,
  BUSINESS_STATUS
} from '../config'
import { queryStudioDetail, applyLogOff } from '@/apis/studio'
import { staticRules } from '@/utils/validate'
// import { getOssFileListByIds } from '@/utils/oss-uploader/utilities/get-file-url-from-id'
// import { getUploadFileName } from '@/utils/oss-uploader/utilities/get-upload-file-name'
export default {
  name: 'StudioDetail',
  mixins: [BaseDialog],
  components: {
    StyledTitle,
    DetailList,
    // XBTable,
    FilePreviewList
  },
  data() {
    return {
      studioDetailBaseFileds,
      studioDetailData: {},
      studioDetailTaxFileds,
      // fileTableColumns: [],
      fileIdList: [],
      formData: {
        status: ''
      },
      formRules: { status: [staticRules('设置工作室状态').required] },
      STUDIO_STATUS,
      BUSINESS_STATUS,
      studioId: '',
      forbidChangeStatus: ['WAIT_CANCEL', 'IN_CANCEL', 'CANCEL']
    }
  },
  mounted() {
    // this.fileTableColumns = getStudioDetailFilesTableCols()
  },
  methods: {
    updateView(id) {
      this.studioId = id
      this.getStudioDetailData(id)
      this.showDialog()
    },
    async getStudioDetailData(id) {
      const { data } = await queryStudioDetail({ id })
      this.fileIdList = []
      if (data.businessStatus.value === this.BUSINESS_STATUS['已注销']) {
        // 工商状态为已注销才显示注销日期
        this.studioDetailTaxFileds[5] = { label: '注销日期', key: 'cancelDate' }
      }
      this.studioDetailData = data
      // const fileIdList = []
      // let fileUrlList = []
      data &&
        data.attachment.map(item => {
          this.fileIdList.push({
            fileId: item.fileId,
            fileName: item.attachmentName || ''
          })
        })
      // console.log('fileIdList', fileIdList)
      // // 根据ID获取附件URL
      // await getOssFileListByIds(fileIdList, res => {
      //   console.log('res', res)
      //   fileUrlList = res
      // })
      // console.log('fileUrlList', fileUrlList)
      // // eslint-disable-next-line prettier/prettier
      // const promise = fileIdList.map(async(item, index) => {
      //   const tempObj = {
      //     url: fileUrlList[index]
      //   }
      //   tempObj.name = await getUploadFileName(item)
      //   return tempObj
      // })
      // Promise.all(promise).then(res => {
      //   this.fileListData = res
      // })
    },
    async handleSubmit() {
      this.$refs['form'].validate(async valid => {
        if (valid) {
          const { code } = await applyLogOff({
            id: this.studioId,
            ...this.formData
          })
          if (code === 0) {
            // this.$message({
            //   message: '修改成功',
            //   type: 'success'
            // })
            this.hideDialog()
            this.$emit('on-success')
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.base-info,
.tax-info {
  margin-bottom: 30px;
}
.info-panel {
  margin-bottom: 30px;
}
</style>
