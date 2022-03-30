<template>
  <div class="app-head">
    <div class="app-head__left">
      <div
        class="app-head__left__switch"
        :style="{ transform: `rotateZ(${isMenuCollapse ? 90 : 0}deg)` }"
        @click="$store.commit('SET_MENU_COLLAPSE', !isMenuCollapse)"
      >
        <i class="iconfont xbicon-nav-de app-head__left__switch__icon"></i>
      </div>
      <breadcrumb />
    </div>
    <div class="app-head__right">
      <news-bell />
      <el-dropdown trigger="click">
        <el-button type="primary" class="app-head__right__drop" id="projectBtn">
          {{ userProject.clientName }}-{{ userProject.projectName }}<i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown" :style="{ width: projectWidth + 'px' }">
          <div class="app-head__right__content">
            <div class="app-head__right__content--header">
              <div class="header-avator">
                <i class="iconfont xbicon-customer" style="font-size: 40px; color: #cc3333"></i>
              </div>
              <div class="header-name">{{ userProject.clientName }}-{{ userProject.projectName }}</div>
            </div>
            <ul class="app-head__right__content--body">
              <li class="item" @click="handleSwitchProject">
                <i class="iconfont xbicon-switch"></i>
                <span style="margin-left: 8px">切换项目</span>
              </li>
            </ul>
            <div class="app-head__right__content--edit" @click="gotoEditPassword">修改密码</div>
            <div class="app-head__right__content--footer" @click="handleLogout">退出登录</div>
          </div>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <!-- 切换项目 -->
    <dialog-container :ref="DIALOG_REF" title="项目列表" width="500px" class="project-list-dialog">
      <div class="project-list scrollbar-s">
        <el-radio-group v-model="currentProjectId" @change="handleSelectedProject">
          <el-radio :label="item.id" v-for="item in projectList" :key="item.id">{{ item.projectName }}</el-radio>
        </el-radio-group>
      </div>
    </dialog-container>
  </div>
</template>

<script>
import BaseDialog from '@/mixins/BaseDialog'
import Breadcrumb from '@/components/Breadcrumb'
import NewsBell from '@/components/NewsBell/index.vue'
import { queryProjectListByUser, switchProject, logout } from '@/apis/user'
import { mapGetters, mapActions } from 'vuex'
import { removeToken } from '@/utils/auth'

export default {
  name: 'AppHead',
  mixins: [BaseDialog],
  components: {
    Breadcrumb,
    NewsBell
  },
  data() {
    return {
      projectList: [],
      currentProjectId: '',
      projectWidth: 0
    }
  },
  computed: {
    ...mapGetters(['userProject', 'serviceProviderInfo', 'isMenuCollapse'])
  },
  mounted() {
    this.getInitProjectContainerWidth()
    this.UPDATE_CAN_USE_AGREEMENTS()
  },
  methods: {
    ...mapActions(['UPDATE_CAN_USE_AGREEMENTS']),
    getInitProjectContainerWidth() {
      this.projectWidth = document.getElementById('projectBtn').offsetWidth
    },
    async handleSwitchProject() {
      const { data } = await queryProjectListByUser()
      data.map(item => {
        if (item.selected) {
          this.currentProjectId = item.id
        }
      })
      this.projectList = data || []
      this.showDialog()
    },
    async handleSelectedProject(value) {
      const { code } = await switchProject(value)
      if (code === 0) {
        this.$store.dispatch('getUserInfo')
        this.hideDialog()
        location.href = '/'
      }
    },
    gotoEditPassword() {
      this.$router.push({ name: 'PasswordEdit' })
    },
    async handleLogout() {
      this.$confirm('是否确定退出?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
        // eslint-disable-next-line
      }).then(async() => {
        const { code } = await logout()
        if (code === 0) {
          removeToken()
          // 跳转登录页同时清除vuex用户数据
          location.href = '/login'
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/index';
@include b(app-head) {
  width: 100% !important;
  display: flex;
  justify-content: space-between;
  height: 64px;
  background: #fff;
  border-bottom: 1px solid #eff0f4;
  @include e(left) {
    display: flex;
    align-items: center;
    padding-left: 20px;
    @include e(switch) {
      @include e(icon) {
        font-size: 26px;
        cursor: pointer;
      }
    }
  }
  @include e(right) {
    padding-right: 29px;
    display: flex;
    align-items: center;
    // @include e(icon) {
    //   display: inline-block;
    //   width: 45px;
    //   height: 45px;
    //   margin-right: 15px;
    //   text-align: center;
    //   line-height: 45px;
    //   cursor: pointer;
    //   i {
    //     font-size: 26px;
    //   }
    // }
    @include e(drop) {
      border-radius: 22px;
      // width: 164px;
      font-size: 12px;
      font-weight: 400;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    @include e(content) {
      display: flex;
      flex-direction: column;
      @include m(header) {
        box-sizing: border-box;
        padding: 20px 0 15px 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        border-bottom: 1px solid #d9d9d9;
        .header-avator {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          margin-bottom: 12px;
          border: 1px solid #cc3333;
          text-align: center;
          img {
            width: 44px;
            height: 44px;
            border-radius: 50%;
          }
        }
      }
      @include m(body) {
        .item {
          height: 44px;
          display: flex;
          align-items: center;
          padding: 0 16px;
          cursor: pointer;
          font-size: 14px;
          font-weight: 400;
          color: #333333;
        }
        .item:hover {
          background: #f2f2f2;
        }
      }
      @include m(edit) {
        height: 59px;
        line-height: 59px;
        text-align: center;
        border-top: 1px solid #d9d9d9;
        cursor: pointer;
      }
      @include m(footer) {
        height: 59px;
        line-height: 59px;
        text-align: center;
        color: #cc3333;
        border-top: 1px solid #d9d9d9;
        cursor: pointer;
      }
    }
  }
}
.project-list-dialog {
  .dialog-body {
    padding-right: 0 !important;
    .project-list {
      min-height: 250px;
      max-height: 600px;
      overflow: auto;
      .el-radio-group {
        display: flex;
        flex-direction: column;
        .el-radio {
          line-height: 40px;
          .el-radio__label {
            font-size: 14px;
            font-weight: 400;
            color: #333333;
          }
        }
      }
    }
  }
}
</style>
