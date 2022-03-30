<template>
  <page-container>
    <div class="setting-content">
      <div class="setting-box">
        <div class="title">收票地址</div>
        <div class="setting-box-left">
          <div v-if="list.personName" class="setting-info">
            <div>
              <span>{{ list.personName }}</span>
              <span>{{ list.personPhone }}</span>
            </div>
            <div>
              <span>{{ list.province }} {{ list.city }} {{ list.area }} {{ list.address }}</span>
            </div>
          </div>
          <div v-else class="setting-info">
            <div><span>暂无收票地址</span></div>
          </div>
        </div>
        <el-button size="small" type="primary" @click="showDialogEdit">{{
          setBtnStatusText(list.personName, true)
        }}</el-button>
      </div>

      <!-- <div class="setting-box">
        <div class="setting-box-left">
          <div class="title">登录密码</div>
          <div class="setting-info">
            <div><span>已设置</span></div>
          </div>
        </div>
        <el-button
          size="small"
          v-if="checkPermission('settingIndex-set')"
          type="primary"
          @click="showDialogPasswordSetting('loginPassword')"
          >修改</el-button
        >
      </div> -->

      <div class="setting-box">
        <div class="setting-box-left">
          <div class="title">支付密码</div>
          <div class="setting-info">
            <div>
              <span>{{ setBtnStatusText(list.payPasswordStatus) }}</span>
            </div>
          </div>
        </div>
        <el-button
          size="small"
          type="primary"
          v-if="checkPermission('settingIndex-set')"
          @click="showDialogPasswordSetting('payPassword', list.payPasswordStatus)"
          >{{ setBtnStatusText(list.payPasswordStatus, true) }}</el-button
        >
      </div>
    </div>

    <dialog-edit ref="DialogEdit" @after-submit="fetchData" />
    <dialog-password-setting ref="DialogPasswordSetting" @after-submit="fetchData" />
  </page-container>
</template>
<script>
import DialogEdit from './component/DiaglogEdit'
import DialogPasswordSetting from './component/DialogPasswordSetting'
import { getSettingInfo } from '@/apis/setting'
import BasePage from '@/mixins/BasePage'
export default {
  components: {
    DialogPasswordSetting,
    DialogEdit
  },
  mixins: [BasePage],
  data() {
    return {
      list: {},
      isShowEdit: false,
      isShowPasswordSetting: false,
      payPasswordStatus: false,
      settingType: 'payPassword'
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    setBtnStatusText(val, isBtn) {
      if (isBtn) {
        return val ? '修改' : '设置'
      }
      return val ? '已设置' : '未设置'
    },
    showDialogEdit() {
      this.$refs.DialogEdit.updateView(this.list.personName)
    },
    fetchData() {
      getSettingInfo().then(({ data }) => {
        this.list = data || {}
        // this.payPasswordStatus = data.payPasswordStatus
      })
    },
    showDialogPasswordSetting(type, payPasswordStatus) {
      this.$refs.DialogPasswordSetting.updateView(type, payPasswordStatus)
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.setting-content {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  justify-content: space-between;

  .setting-box {
    position: relative;
    width: calc(50% - 80px);
    padding: 30px;
    height: 170px;
    background-color: #fff;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
    .title {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 40px;
      line-height: 40px;
      border-bottom: 1px solid #eff0f4;
      padding-left: 20px;
      font-weight: 500;
      font-size: 16px;
    }
    .setting-box-left {
      // align-self: flex-start;
    }
    .setting-info {
      margin-left: 57px;
      // font-size: $main-fsz;
      line-height: 20px;
      div {
        margin-bottom: 12px;
        span {
          // color: $color-text-regular;
          margin-left: 40px;
          &:first-child {
            margin-left: 0;
          }
        }
      }
    }
  }
}
</style>
