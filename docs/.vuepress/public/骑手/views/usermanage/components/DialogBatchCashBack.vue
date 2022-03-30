<template>
  <dialog-container
    :ref="DIALOG_REF"
    title="批量返现"
    width="600px"
    class="dialog-batch-cash-back"
  >
    <div class="dialog-container">
      <el-form :model="form" :rules="rules" ref="ruleForm" class="form">
        <el-form-item label="批量返现类型：" prop="type">
          <el-select v-model="form.type" placeholder="请选择批量返现类型">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div class="upload-area">
        <el-upload
          class="avatar-uploader"
          action=""
          drag
          :on-change="handleFileChange"
        >
          <img src="@/assets/images/icon-preview-xls@2x.png" class="avatar" />
          <p>将文件拖到此处或点击上传</p>
        </el-upload>
      </div>
      <p class="download-excel">
        <i class="el-icon-download"></i>
        <span>下载导入表格模板</span>
      </p>
    </div>
  </dialog-container>
</template>
<script>
import Dialog from '@/mixin/Dialog'

export default {
  name: 'DialogBatchCashBack',
  mixins: [Dialog],
  components: {},
  data() {
    return {
      form: {
        type: ''
      },
      rules: {
        type: [
          { required: true, message: '请选择批量返现类型', trigger: 'change' }
        ]
      }
    }
  },
  created() {},
  methods: {
    updateView() {
      this.showDialog()
    },
    handleFileChange() {}
  }
}
</script>
<style lang="scss" scoped>
.dialog-batch-cash-back {
  .dialog-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    .form {
      .el-form-item {
        width: 100%;
        display: flex;
        justify-content: center;
      }
    }
    /deep/.el-upload-dragger {
      padding-top: 50px;
      background-color: #fafafa;
      // border: 1px dashed #ccc;
      // border-radius: 8px;
      img {
        width: 80px;
        height: 40px;
      }
    }
    .download-excel {
      display: flex;
      align-items: center;
      color: #69b1f9;
      font-size: 16px;
      i {
        padding-top: 4px;
        margin-right: 5px;
      }
    }
  }
}
</style>
