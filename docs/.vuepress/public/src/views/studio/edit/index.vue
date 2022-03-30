<template>
  <dialog-container :ref="DIALOG_REF" title="单个设立工作室" width="600px" @closed="resetDialog">
    <el-form ref="form" inline :model="studioForm" :rules="studioFormRules" label-width="180px" label-position="right">
      <el-form-item label="手机号码" prop="phone">
        <el-input v-model="studioForm.phone" placeholder="请输入手机号码" style="width: 240px"></el-input>
      </el-form-item>
      <el-form-item label="工作室名称" prop="studioName">
        <el-input v-model="studioForm.studioName" placeholder="请输入工作室名称" style="width: 240px"></el-input>
      </el-form-item>
      <el-form-item label="行业" prop="industry">
        <el-input v-model="studioForm.industry" placeholder="请输入行业" style="width: 240px"></el-input>
      </el-form-item>
      <el-form-item label="经营范围" prop="businessScope">
        <el-input
          v-model="studioForm.businessScope"
          type="textarea"
          placeholder="请输入经营范围"
          style="width: 240px"
          resize="none"
          :autosize="{ minRows: 3, maxRows: 3 }"
        ></el-input>
      </el-form-item>
      <el-form-item label="经营场所" prop="workplace">
        <el-input
          v-model="studioForm.workplace"
          type="textarea"
          placeholder="请输入经营场所"
          style="width: 240px"
          resize="none"
          :autosize="{ minRows: 3, maxRows: 3 }"
        ></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer">
      <el-button @click="hideDialog">取消</el-button>
      <el-button type="primary" @click="handleSubmit" v-preventReClick>确定</el-button>
    </div>
  </dialog-container>
</template>

<script>
import DialogContainer from '_c/DialogContainer'
import { studioForm, studioFormRules } from '../config'
import { updateStudio, queryStudioConnetProjectInfo } from '@/apis/studio'
import BaseDialog from '@/mixins/BaseDialog'
export default {
  name: 'StudioEdit',
  mixins: [BaseDialog],
  components: {
    DialogContainer
  },
  data() {
    return {
      studioForm,
      studioFormRules
    }
  },
  methods: {
    updateView() {
      this.showDialog()
      this.getConnectProjectInfo()
    },
    async getConnectProjectInfo() {
      const { data } = await queryStudioConnetProjectInfo()
      this.studioForm.businessScope = data.businessScope || ''
      this.studioForm.workplace = data.workplace || ''
    },
    handleSubmit() {
      this.$refs['form'].validate(async valid => {
        if (valid) {
          const { code } = await updateStudio({ ...this.studioForm })
          if (code === 0) {
            this.$message({
              message: '新增成功',
              type: 'success'
            })
            this.hideDialog()
            this.$emit('on-success')
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss"></style>
