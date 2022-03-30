<template>
  <dialog-container
    :ref="DIALOG_REF"
    title="编辑活动"
    width="1000px"
    class="dialog-edit"
  >
    <div class="dialog-container">
      <el-form
        :model="form"
        :rules="rules"
        ref="ruleForm"
        class="form"
        label-width="140px"
      >
        <el-form-item label="活动时间：" prop="time">
          <el-date-picker
            v-model="time"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="活动标题：" prop="title">
          <el-input
            v-model="form.title"
            style="width: 350px"
            maxlength="20"
          ></el-input>
        </el-form-item>
        <el-form-item label="参与活动人数：" prop="type">
          <el-radio-group v-model="form.type" @change="changeNum">
            <el-radio label="pass">无上限</el-radio>
            <el-radio label="unpass">
              <span>有上限：</span>
              <el-input v-model="value" style="width: 100px"></el-input>
              <span>人</span>
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="奖励规则：" prop="rule">
          <reward-rule></reward-rule>
        </el-form-item>
        <el-form-item label="活动状态：" prop="status">
          <el-radio-group v-model="form.status" @change="changeStatus">
            <el-radio label="pass">启用</el-radio>
            <el-radio label="unpass">停用</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div class="footer-btns">
        <el-button size="small" @click="hideDialog">取消</el-button>
        <el-button type="primary" size="small" @click="submit">保存</el-button>
      </div>
    </div>
  </dialog-container>
</template>
<script>
import Dialog from '@/mixin/Dialog'
import RewardRule from './RewardRule'

export default {
  name: 'DialogEdit',
  mixins: [Dialog],
  components: {
    RewardRule
  },
  data() {
    return {
      form: {
        time: '',
        title: '',
        type: 'pass',
        rule: '',
        status: 'pass'
      },
      rules: {
        time: [
          { required: true, message: '请选择活动时间', trigger: 'change' }
        ],
        title: [{ required: true, message: '请填写活动标题', trigger: 'blur' }],
        type: [
          { required: true, message: '请选择参与活动人数', trigger: 'change' }
        ],
        rule: [
          { required: true, message: '请填写奖励规则', trigger: 'change' }
        ],
        status: [
          { required: true, message: '请选择活动状态', trigger: 'change' }
        ]
      },
      value: ''
    }
  },
  created() {},
  methods: {
    updateView() {
      this.showDialog()
    },
    changeNum() {},
    changeStatus() {},
    submit() {}
  }
}
</script>
<style lang="scss" scoped>
.dialog-edit {
  .dialog-container {
    .footer-btns {
      display: flex;
      justify-content: flex-end;
    }
  }
}
</style>
