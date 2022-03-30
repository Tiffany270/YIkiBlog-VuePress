<template>
  <dialog-container :ref="DIALOG_REF" :title="title" width="750px">
    <template>
      <el-form ref="form" :model="form" label-width="140px" size="medium">
        <el-form-item label="姓名：">
          {{ form.realName }}
        </el-form-item>
        <el-form-item label="性别：">
          {{ form.gender }}
        </el-form-item>
        <el-form-item label="证件类型：">
          {{ form.certType }}
        </el-form-item>
        <el-form-item label="出生日期：">
          {{ form.birthday }}
        </el-form-item>
        <el-form-item label="证件号码：">
          {{ form.certNo }}
        </el-form-item>
        <el-form-item label="国家/地区：">
          {{ form.nationality }}
        </el-form-item>
        <el-form-item label="联系电话：">
          {{ form.mobile }}
        </el-form-item>
        <el-form-item label="证件图片:">
          <upload-img-list
            v-model="form.certImg"
            accept-type="image/*"
            notUploadImg
            :limit-count="3"
            :oss-file-type="OSSFileTypeEnum.TENANT_IMG_STATIC"
          />
        </el-form-item>
      </el-form>
    </template>
  </dialog-container>
</template>

<script>
import BaseDialog from '@/mixins/BaseDialog'
import UploadImgList from '_c/UploadImgList'
import { OSSFileTypeEnum } from '@/maps/enums/OSSFileType'
import { requestForOssTempUrl } from '@/utils/request/oss-handler/request-for-oss-temp-url'
import { getNonMainlandDetail } from '@/apis/signManage'
import { certTypeOptions } from '../config'
import nationOptions from '../nations.json'

export default {
  mixins: [BaseDialog],
  components: {
    UploadImgList
  },
  data() {
    return {
      id: '',
      title: '详情',
      certTypeOptions,
      nationOptions,
      OSSFileTypeEnum,
      form: {
        realName: '',
        gender: '',
        certType: '',
        birthday: '',
        certNo: '',
        nationality: '',
        mobile: '',
        certImg: []
      }
    }
  },
  methods: {
    updateView(id) {
      if (id) {
        this.id = id
        getNonMainlandDetail(id).then(async res => {
          const data = res.data
          this.showDialog()
          if (data) {
            const fileIds = data.certImg && data.certImg.split(',').map(item => ({ fileId: item }))
            const certImg = await requestForOssTempUrl(fileIds)
            this.form.realName = data.realName
            this.form.gender = data.gender && data.gender.label
            this.form.birthday = data.birthday
            this.form.certType = data.certType && data.certType.label
            this.form.certNo = data.certNo
            this.form.nationality = data.nationality
            this.form.mobile = data.mobile
            this.form.certImg = certImg
          }
        })
      } else {
        this.showDialog()
      }
    }
  }
}
</script>
