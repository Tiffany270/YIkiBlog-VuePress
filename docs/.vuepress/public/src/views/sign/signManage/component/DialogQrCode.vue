<template>
  <!-- <Modal v-model="visible" title="查看二维码" width="35%"> -->
  <dialog-container :ref="DIALOG_REF" title="查看二维码" @closed="resetDialog" width="500px">
    <!-- <div slot="modalBody"> -->
    <!-- <el-alert :closable="false" type="warning"
        >请截图将对应协议的二维码发送给相关用户，扫码后即可完成签约操作。</el-alert
      > -->
    <warn-tips>请截图将对应协议的二维码发送给相关用户，扫码后即可完成签约操作。</warn-tips>
    <div class="foreign-sign-code">
      <div v-for="(item, index) in qrCodeImgList" :key="index" class="sign-code-container">
        <div class="position-radius-content">
          <div class="position-radius left" />
          <div class="position-radius right" />
        </div>
        <div class="code-container">
          <div class="code-title">
            <!-- <div>{{ generateTitle(item) }}</div> -->
            <div @click="showAgreement(item.agreementUrl)">
              {{ item.agreementName }}
            </div>
          </div>
          <div class="code-content">
            <div class="code-top">
              <div class="code-wrapper">
                <div v-loading="qrLoading" ref="qrcode" class="code-img" />
                <!-- <div class="code-type">
                  {{ item.qrCodeType && item.qrCodeType.label }}
                </div> -->
              </div>
            </div>
            <div class="code-description">扫描上方二维码，进行签约</div>
          </div>
        </div>
      </div>
    </div>
  </dialog-container>
  <!-- </div> -->
  <!-- </Modal> -->
</template>

<script>
// import Modal from '_c/Modal/index.vue'
import WarnTips from '_c/WarnTips/index.vue'
import BaseDialog from '@/mixins/BaseDialog'
import { getByProject } from '@/apis/signManage'
import { createQRCode } from '@/utils/CreateQRCode'
export default {
  name: 'DialogQrCode',
  components: {
    // Modal,
    WarnTips
  },
  mixins: [BaseDialog],
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      qrLoading: false,
      qrCodeImgList: []
    }
  },
  computed: {
    // visible: {
    //   get() {
    //     return this.value
    //   },
    //   set(value) {
    //     this.$emit('input', value)
    //   }
    // },
    // qrCodeImgList() {
    //   // return this.$store.getters.billConfig.qrCodeImgList
    //   return [{ qrCodeType: '1' }]
    // }
  },
  methods: {
    updateView() {
      this.qrLoading = true
      getByProject(this.$store.getters.userInfo.attrs.projectId).then(({ data }) => {
        this.qrCodeImgList = data
        this.showDialog()
        this.$nextTick(() => {
          data.forEach((item, index) => {
            createQRCode(this.$refs.qrcode[index], data[index].websiteUrl, 116, 116)
          })
        })
        this.qrLoading = false
      })
    },
    showAgreement(url) {
      window.open(url)
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import '@/styles/global';
// /deep/.modal__body.scrollbar-s {
// padding: 38px 40px;
.dialog-body {
  position: relative;
}
.warn-tips {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 38px;
  border-radius: 0;
}
.foreign-sign-code {
  display: flex;
  flex-wrap: wrap;
  max-height: 530px;
  overflow-y: scroll;
  padding: 20px 24px;
  margin-top: 20px;
}
.sign-code-container {
  position: relative;
  width: 328px;
  min-height: 336px;
  margin: 0 auto;
  .position-radius-content {
    position: absolute;
    z-index: 11;
    display: flex;
    justify-content: space-between;
    width: 328px;
    top: 38px;
    left: 0;
    .position-radius {
      width: 15px;
      height: 30px;
      border: 1px solid #ebeef5;
      background-color: #fff;
      &.left {
        border-radius: 0 30px 30px 0;
        border-left-color: #fff;
      }
      &.right {
        border-radius: 30px 0 0 30px;
        border-right-color: #fff;
      }
    }
  }
  // }
  .code-container {
    border: 1px solid #ebeef5;
    width: 326px;
    height: 100%;
    border-radius: 4px;
    color: #333333;
    position: absolute;
    // left: 1px;
    // top: 0;
    z-index: 5;
    $title-height: 53px;
    .code-title {
      // padding: 10px 0px;
      width: 100%;
      text-align: center;
      display: flex;
      height: $title-height;
      align-items: center;
      border-bottom: 1px dashed #ebeef5;
      font-size: 14px;
      font-weight: 500;
      div {
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        cursor: pointer;
        &:hover {
          color: #169bd5;
        }
      }
    }
    .code-content {
      display: flex;
      justify-content: space-between;
      flex-direction: column;
      align-items: center;
      height: calc(100% - #{$title-height});
      line-height: 17px;
      .code-top {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        .code-wrapper {
          // .code-img {
          //   @include square(160px);
          // }
          .code-img {
            width: 120px;
            height: 120px;
            margin: 0 auto 4px;
            // background-color: #fff;
            border: 2px solid #fff;
          }
          .code-type {
            margin-top: 5px;
            text-align: center;
            color: #333333;
            font-size: 14px;
          }
        }
      }

      .code-description {
        width: 100%;
        border-top: 1px dashed #ebeef5;
        padding: 20px 0;
        text-align: center;
        font-size: 14px;
        color: #333333;
      }
    }
  }
}
</style>
