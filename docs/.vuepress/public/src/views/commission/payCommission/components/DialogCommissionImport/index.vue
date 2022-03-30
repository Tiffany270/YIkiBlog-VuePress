<template>
  <dialog-container :ref="DIALOG_REF" :title="dialogTitle" width="500px">
    <div class="dialog-content">
      <!-- 选择发放渠道 -->
      <ul class="select-chanel" v-if="step === 1">
        <li
          class="select-chanel__item"
          @click="handleSelectPayChannel(item)"
          v-for="item in payChanels"
          :key="item.value"
        >
          <i
            class="iconfont xbicon-pay3"
            style="color: #3360e0; font-size: 30px; margin-right: 10px"
            v-if="item.value === 'ALIPAY'"
          ></i>
          <i
            class="iconfont xbicon-pay2"
            style="color: #03a82c; font-size: 30px; margin-right: 10px"
            v-else-if="item.value === 'MMPAY'"
          ></i>
          <i class="iconfont xbicon-pay1" style="color: #cb3333; font-size: 30px; margin-right: 10px" v-else></i>
          <span class="select-chanel__item--text">{{ item.label }}</span>
        </li>
      </ul>
      <!-- 选择微信应用 -->
      <ul class="wx-app" v-else-if="step === 2 && currentPayChannel.value === 'MMPAY' && wechatApps.length > 1">
        <li class="wx-app__item" v-for="item in wechatApps" :key="item.wxAppId" @click="handleSelectWxApp(item)">
          {{ item.wxAppName }}
        </li>
      </ul>
      <!-- 导入 -->
      <div class="import-file" v-else>
        <div class="import-file__chanel" v-if="currentPayType !== ChannelEnum.OFFLINE">
          发放方式：{{ this.currentPayChannel.label }}
        </div>
        <file-uploader
          :showType="UploadTypesEnum.PANEL"
          :acceptType="UploadFileTypes.XLS"
          :requestParams="{ payChannel: currentPayChannel.value, wxAppId: currentWxApp.wxAppId }"
          :requestMethod="exportPayroll"
          @on-success="handleUploadSuccess"
        />
        <el-button type="text" class="import-file__template" @click="handleDownload">下载导入模板</el-button>
      </div>
    </div>
  </dialog-container>
</template>

<script>
import DialogContainer from '_c/DialogContainer'
import BaseDialog from '@/mixins/BaseDialog'
import FileUploader from '_c/FileUploader/index.vue'
import { exportPayroll, downloadTemplate } from '@/apis/payroll'
import { UploadTypesEnum, UploadFileTypes } from '@/maps/enums/UploadTypes'
import { ChannelEnum } from '@/maps/enums/ChannelEnum'
import { mapGetters } from 'vuex'
export default {
  name: 'CommissionImport',
  mixins: [BaseDialog],
  components: {
    DialogContainer,
    FileUploader
  },
  data() {
    return {
      step: 1,
      exportPayroll,
      UploadTypesEnum,
      // 选中的发放渠道
      currentPayChannel: {},
      // 选中得微信应用
      currentWxApp: {},
      UploadFileTypes: Object.freeze(UploadFileTypes),
      ChannelEnum: Object.freeze(ChannelEnum),
      currentPayType: 'ONLINE'
    }
  },
  computed: {
    ...mapGetters(['payChanels', 'wechatApps']),
    dialogTitle() {
      /* eslint-disable*/
      return this.step === 1
        ? '请选择发放渠道'
        : this.step === 2 && this.currentPayChannel.value === 'MMPAY'
        ? '请选择微信应用'
        : '请导入发放数据'
    }
  },
  methods: {
    show(type) {
      this.currentPayType = type
      if (type === ChannelEnum.OFFLINE) {
        this.step = 2
        this.currentPayChannel = this.payChanels[0]
      } else {
        this.step = 1
      }
      this.currentWxApp = {}
      this.showDialog()
    },
    handleSelectPayChannel(value) {
      this.currentPayChannel = value
      this.step = 2
      //发放渠道为微信支付时候，且应用主体只有一个，默认选择为第一个,直接忽略第二步
      if(this.currentPayChannel.value === 'MMPAY'&&this.wechatApps.length===1){
        this.currentWxApp = this.wechatApps[0]
        this.step = 3
      }

    },
    handleSelectWxApp(value) {
      this.step = 3
      this.currentWxApp = value
    },
    async handleDownload() {
      const { data } = await downloadTemplate()
      if (data) {
        location.href = data
      }
    },
    handleUploadSuccess(data) {
      this.hideDialog()
      this.$router.push({
        name: 'HandleToPay',
        query: {
          batchNo: data
        }
      })
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss">
@import '@/styles/mixin';
@include b(dialog-content) {
  min-height: 360px;
}
@include b(select-chanel) {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @include e(item) {
    width: 300px;
    height: 100px;
    margin-bottom: 20px;
    border-radius: 6px;
    background-color: #f8f8f8;
    border: 1px dashed #dcdcdc;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    @include m(img) {
      width: 44px;
      height: 44px;
      margin-right: 25px;
    }
    @include m(text) {
      color: #000;
      font-size: 18px;
      width: 4em;
    }
  }
}
@include b(wx-app) {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @include e(item) {
    width: 300px;
    height: 100px;
    margin-bottom: 20px;
    border-radius: 6px;
    background-color: #f8f8f8;
    border: 1px dashed #dcdcdc;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
@include b(import-file) {
  text-align: center;
  margin: 23px;
  @include e(chanel) {
    margin-bottom: 20px;
    font-size: 14px;
    font-weight: 600;
    color: #03a92c;
  }
  @include e(template) {
    text-align: center;
    line-height: 30px;
    margin-top: 30px;
    font-weight: 600;
    font-size: 15px;
    cursor: pointer;
    color: #cc3333;
  }
}
</style>
