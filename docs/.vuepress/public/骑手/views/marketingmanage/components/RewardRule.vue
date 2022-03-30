<template>
  <div class="reward-rule">
    <div class="reward-people">
      <div class="title">奖励人</div>
      <div class="content">
        <div class="content">邀请人</div>
      </div>
    </div>
    <div class="reward-node">
      <div class="title">奖励节点</div>
      <div class="content">
        <div class="content-item">受邀用户提交求职信息完成注册</div>
        <div class="content-item">受邀用户首次入职</div>
        <div class="content-item">受邀用户入职 7 天</div>
        <div class="content-item">受邀用户入职 15 天</div>
        <div class="content-item">受邀用户入职 30 天</div>
      </div>
    </div>
    <div class="reward-money">
      <div class="title">奖励金额（元）</div>
      <div class="content">
        <div class="content-item">X</div>
        <div class="content-item">X</div>
        <div class="content-item">X</div>
        <div class="content-item">X</div>
        <div class="content-item">X</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'RewardRule'
}
</script>
<style lang="scss" scoped>
.reward-rule {
  display: flex;
  width: 720px;
  .reward-people,
  .reward-node,
  .reward-money {
    display: flex;
    flex-direction: column;
    flex: 1;
    text-align: center;
    border-left: 1px solid #ebeef5;
    .title {
      background-color: #f9f9f9;
    }
    .content {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      &:nth-child(1) {
        width: 100%;
        border-bottom: 1px solid #ebeef5;
      }
      .content-item {
        width: 100%;
        border-bottom: 1px solid #ebeef5;
      }
    }
  }
  .reward-money {
    border-right: 1px solid #ebeef5;
  }
}
</style>
