<template>
  <div class="app-head">
    <div class="app-head__left">
      <div class="left-logo">
        <img
          src="../../../../assets/images/logo-layout-head@2x.png"
          alt=""
          class="left-logo__img"
        />
      </div>
      <div
        class="left-switch"
        @click="$store.commit('SET_MENU_COLLAPSE', !isMenuCollapse)"
      >
        <i class="iconfont icon-icon-nav left-switch__icon"></i>
      </div>
      <div class="left-name">骑手大本营管理系统</div>
    </div>
    <div class="app-head__right">
      <el-popover
        placement="bottom"
        width="160"
        trigger="hover"
        popper-class="head-popover"
      >
        <div class="popover-reference" slot="reference">
          <img
            src="../../../../assets/images/icon-head-avator@2x.png"
            class="popover-reference__avator"
          />
          <div class="popover-reference__username">
            {{
              (userInfo.attrs && userInfo.attrs.name) ||
              userInfo.username ||
              '未知用户'
            }}
          </div>
          <i class="iconfont icon-icon-arrowdown popover-reference__arrow"></i>
        </div>
        <!-- <ul class="head-popover__content">
          <li class="popover-item">
            <i class="iconfont icon-icon-print"></i>
            <span class="popover-item__title">账号设置</span>
          </li>
          <li class="popover-item" @click="handleLogout">
            <i class="iconfont icon-icon-signout"></i>
            <span class="popover-item__title">退出登录</span>
          </li>
        </ul> -->
      </el-popover>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { updateLogout } from '@/api/user'
import { getToken, removeToken } from '@/utils/auth'
export default {
  name: 'AppHead',
  components: {},
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['isMenuCollapse', 'userInfo'])
  },
  methods: {
    async handleLogout() {
      this.$confirm('是否确定退出?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(async () => {
        const { code } = await updateLogout({
          token: getToken().split(' ')[1]
        })
        if (code === 0) {
          removeToken()
          sessionStorage.clear()
          // 跳转登录页同时清除vuex用户数据
          location.href = '/login'
        }
      })
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss">
.app-head {
  width: 100%;
  height: 64px;
  background: $color-primary;
  display: flex;
  justify-content: space-between;
  align-items: center;
  &__left {
    display: flex;
    align-items: center;
  }
  .left-logo {
    width: 200px;
    box-sizing: border-box;
    padding: 12px 24px;
    &__img {
      width: 152px;
      height: 40px;
    }
  }
  .left-switch {
    width: 48px;
    line-height: 60px;
    text-align: center;
    cursor: pointer;
    &__icon {
      color: $color-text-active;
      font-size: $font-size-xxxxxxxl;
    }
  }
  .left-switch:hover {
    background: $color-primary-deep-hover;
  }
  .left-name {
    line-height: 60px;
    box-sizing: border-box;
    padding-left: 16px;
    color: $color-text-active;
    font-size: $font-size-xl;
  }
  &__right {
    display: flex;
    align-items: center;
    // line-height: 64px;
    cursor: pointer;
    > span {
      line-height: 64px;
    }
    .popover-reference {
      display: flex;
      align-items: center;
      box-sizing: border-box;
      padding: 0 12px;
      &__avator {
        width: 40px;
        height: 40px;
        margin-right: 10px;
      }
      &__username {
        color: $color-text-active;
        font-size: $font-size-m;
      }
      &__arrow {
        width: 28px;
        height: 28px;
        line-height: 28px;
        text-align: center;
        color: $color-text-active;
      }
    }
    :hover {
      background: $color-primary-deep-hover;
    }
  }
}
.head-popover {
  line-height: 64px;
  box-sizing: border-box;
  padding: 10px 0 !important;
  .popover-item {
    height: 48px;
    line-height: 48px;
    box-sizing: border-box;
    padding-left: 12px;
    cursor: pointer;
    color: $color-text-base;
    font-size: $font-size-m;
    &:hover {
      background-color: $color-normal-hover;
    }
    &__title {
      margin-left: 11px;
    }
  }
}
</style>
