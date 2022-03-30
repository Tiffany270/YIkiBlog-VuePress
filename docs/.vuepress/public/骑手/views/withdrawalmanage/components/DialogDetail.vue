<template>
  <dialog-container
    :ref="DIALOG_REF"
    title="提现审核"
    width="1000px"
    class="dialog-detail"
  >
    <div class="dialog-container">
      <styled-title>用户132****4567提现审核</styled-title>
      <info-list :labelData="labelData1" :data="data1"></info-list>
      <styled-title>用户基本信息</styled-title>
      <info-list :labelData="labelData2" :data="data2"></info-list>
      <styled-title>审核意见</styled-title>
      <info-list :labelData="labelData3" :data="data3" :row="1"></info-list>
      <el-form
        :model="form"
        :rules="rules"
        ref="ruleForm"
        class="form"
        label-width="100px"
      >
        <el-form-item label="审核结果：" prop="type">
          <el-radio-group v-model="form.type" @change="changeType">
            <el-radio label="pass">通过</el-radio>
            <el-radio label="unpass">不通过</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="备注：" prop="remind">
          <el-input
            type="textarea"
            v-model="form.remind"
            maxlength="500"
          ></el-input>
        </el-form-item>
      </el-form>
      <div class="footer-btns">
        <el-button @click="closeDialog" size="small">取消</el-button>
        <el-button type="primary" @click="submit" size="small">提交</el-button>
      </div>
    </div>
  </dialog-container>
</template>
<script>
import Dialog from '@/mixin/Dialog'
import Table from '@/mixin/Table'
import InfoList from '@/components/InfoList'
import StyledTitle from '@/components/StyledTitle'

export default {
  name: 'DialogDetail',
  mixins: [Dialog, Table],
  components: {
    InfoList,
    StyledTitle
  },
  data() {
    return {
      labelData1: [
        {
          label: '提现流水号：',
          key: 'flowNo'
        },
        {
          label: '提现金额：',
          key: 'money'
        },
        {
          label: '提现时间：',
          key: 'time'
        },
        {
          label: '当日提现次数：',
          slot: 'num'
        },
        {
          label: '当日累计提现金额：',
          slot: 'money1'
        },
        {
          label: '剩余总额：',
          slot: 'money2'
        }
      ],
      data1: {
        flowNo: '231234124312111111',
        money: '￥199.00',
        time: '2019/05/04 20:13',
        num: '1次',
        money1: '￥0.00',
        money2: '￥100.00'
      },
      labelData2: [
        {
          label: '用户昵称：',
          key: 'nickname'
        },
        {
          label: '用户姓名：',
          key: 'name'
        },
        {
          label: '用户手机号：',
          key: 'mobile'
        },
        {
          label: '性别：',
          slot: 'sex'
        }
      ],
      data2: {
        nickname: '马云',
        name: '马化腾',
        mobile: '13268277450',
        sex: '女'
      },
      labelData3: [
        {
          label: '审核结果：',
          key: 'result'
        },
        {
          label: '备注：',
          key: 'remind'
        }
      ],
      data3: {
        result: '不通过',
        remind: '马化腾'
      },
      form: {
        type: 'pass',
        remind: ''
      },
      rules: {
        type: [{ required: true, message: '请选择审核结果', trigger: 'change' }]
      }
    }
  },
  created() {},
  methods: {
    updateView() {
      this.showDialog()
    },
    changeType(val) {
      this.form.type = val
    },
    closeDialog() {
      this.hideDialog()
    },
    submit() {}
  }
}
</script>
<style lang="scss" scoped>
.dialog-detail {
  .dialog-container {
    .styled-title {
      margin: 30px 0 20px;
    }
    .el-textarea {
      width: 600px;
    }
    .footer-btns {
      display: flex;
      justify-content: flex-end;
    }
  }
}
</style>
