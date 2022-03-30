<template>
  <dialog-container :ref="DIALOG_REF" title="更改" width="750px">
    <template>
      <el-form ref="form" :model="form" :rules="rules" label-width="140px" inline size="medium">
        <el-form-item label="姓名：" prop="realName">
          <el-input v-model.trim="form.realName" placeholder="请输入姓名" clearable maxlength="30" />
        </el-form-item>
        <el-form-item label="性别：" prop="gender">
          <el-select v-model="form.gender" placeholder="请选择性别">
            <el-option label="男" value="MALE" />
            <el-option label="女" value="FEMALE" />
          </el-select>
        </el-form-item>
        <el-form-item label="证件类型：" prop="certType">
          <el-select v-model="form.certType" placeholder="请选择证件类型">
            <el-option
              v-for="cerType in certTypeOptions"
              :label="cerType.label"
              :value="cerType.value"
              :key="cerType.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="出生日期：" prop="birthday">
          <el-date-picker v-model="form.birthday" type="date" placeholder="请选择出生日期" value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="证件号码：" prop="certNo">
          <div style="display: flex">
            <el-input v-model.trim="form.certNo" placeholder="请输入证件号码" clearable maxlength="20" />
          </div>
        </el-form-item>
        <el-form-item label="国家/地区：" prop="nationality">
          <el-select v-model="form.nationality" placeholder="请选择国家/地区" filterable>
            <el-option v-for="nation in nationOptions" :label="nation" :value="nation" :key="nation" />
          </el-select>
        </el-form-item>
        <el-form-item label="联系电话：" prop="mobile">
          <el-input v-model.trim="form.mobile" placeholder="请输入联系电话" clearable maxlength="15" />
        </el-form-item>
        <el-form-item class="block" label="上传证件：" prop="certImg">
          <upload-img-list
            v-model="form.certImg"
            accept-type="image/*"
            :limit-count="3"
            :oss-file-type="OSSFileTypeEnum.TENANT_IMG_STATIC"
          />
        </el-form-item>
      </el-form>
    </template>
    <div slot="footer">
      <el-button @click="hideDialog">取消</el-button>
      <el-button type="primary" @click="save">确定</el-button>
    </div>
  </dialog-container>
</template>

<script>
import BaseDialog from '@/mixins/BaseDialog'
import UploadImgList from '_c/UploadImgList'
import { getFileIdFromUrl } from '@/utils/oss-uploader/utilities/get-file-id-from-url'
import { requestForOssTempUrl } from '@/utils/request/oss-handler/request-for-oss-temp-url'
import { staticRules } from '@/utils/validate'
import { OSSFileTypeEnum } from '@/maps/enums/OSSFileType'
import { UploadTypesEnum, UploadFileTypes } from '@/maps/enums/UploadTypes'
import { updateNonMainland, getNonMainlandDetail } from '@/apis/signManage'
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
      certTypeOptions,
      nationOptions,
      OSSFileTypeEnum,
      UploadFileTypes,
      UploadTypesEnum,
      form: {
        realName: '',
        gender: '',
        certType: '',
        birthday: '',
        certNo: '',
        nationality: '',
        mobile: '',
        certImg: []
      },
      rules: {
        realName: [staticRules('姓名').required],
        gender: [staticRules('性别', 'change').required],
        certType: [staticRules('证件类型', 'change').required],
        birthday: [staticRules('出生日期', 'change').required],
        certNo: [staticRules('证件号码').required],
        nationality: [staticRules('国家/地区', 'change').required],
        mobile: [staticRules('联系电话').required, staticRules('手机号').mobile],
        certImg: [{ required: true, trigger: 'change', validator: this.valiImg }]
      },
      isResetForm: false
    }
  },
  watch: {
    'form.certImg'() {
      this.isResetForm && this.$refs.form && this.$refs.form.validateField('certImg')
    }
  },
  methods: {
    updateView(id) {
      this.isResetForm = false
      if (id) {
        this.id = id
        getNonMainlandDetail(id).then(async res => {
          const data = res.data
          if (data) {
            const fileIds = data.certImg.split(',').map(item => ({ fileId: item }))
            const certImg = await requestForOssTempUrl(fileIds)
            this.form.realName = data.realName
            this.form.gender = data.gender && data.gender.value
            this.form.certType = data.certType && data.certType.value
            this.form.birthday = data.birthday
            this.form.certNo = data.certNo
            this.form.nationality = data.nationality
            this.form.mobile = data.mobile
            this.form.certImg = certImg
            this.showDialog()
          }
        })
      }
    },
    save() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          const certImg = await getFileIdFromUrl(this.form.certImg)
          updateNonMainland({ id: this.id, ...this.form, certImg: certImg.join(',') }).then(() => {
            this.$message.success('更改成功')
            this.isResetForm = true
            this.$refs.form.resetFields()
            this.hideDialog()
            this.$emit('after-submit')
          })
        }
      })
    },
    valiImg(rule, value, callback) {
      // 图片验证
      if (!value.length) {
        callback(new Error('请上传证件'))
      } else {
        callback()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/.el-input,
.el-date-editor {
  width: 324px;
}
/deep/.el-upload-dragger {
  width: 100px;
}
</style>
