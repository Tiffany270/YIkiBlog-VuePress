<template>
  <div class="reset-password-content">
    <div class="reset-password-success">
      <img src="../images/reset-success.png" alt="" />
      <span>{{ title }}</span>
    </div>
    <p class="reset-password-seconds">
      <span>{{ seconds }}</span>
      <span>秒后将返回到登录页面…</span>
    </p>
    <div class="reset-password-login-btn">
      <el-button type="success" @click="handleClick">返回登录</el-button>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    seconds: {
      type: Number,
      default: 3
    },
    handleClick: {
      type: Function,
      default: () => {}
    }
  }
}
</script>
<style lang="scss" scoped>
.reset-password-content {
  border-radius: 8px;
  background-color: #fff;
  padding: 24px;
  .reset-password-success {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 36px 0;
    img {
      width: 64px;
      height: 64px;
      margin-right: 20px;
    }
    span {
      font-size: 32px;
      color: #03a92c;
    }
  }
  .reset-password-seconds {
    display: flex;
    justify-content: center;
    margin-top: 0;
    margin-bottom: 33px;
    span {
      font-size: 14px;
      &:nth-child(1) {
        color: #cc3333;
        margin-right: 9px;
      }
    }
  }
  .reset-password-login-btn {
    text-align: center;
    margin-bottom: 36px;
    .el-button {
      width: 350px;
    }
  }
}
</style>
