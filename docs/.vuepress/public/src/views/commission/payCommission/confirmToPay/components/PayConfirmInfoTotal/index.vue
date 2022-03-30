<template>
  <block-container class="pay-confirm-block">
    <div class="confirm-info">
      <div class="confirm-info__number">平台批次号：{{ confirmTotal.batchNo || '' }}</div>
      <div class="confirm-info__container">
        <div class="info-title">
          <i class="info-title__dot" style="margin-bottom: 16px"></i>
          付款单信息
          <i class="info-title__dot" style="margin-top: 16px"></i>
        </div>
        <div class="info-content">
          <ul class="info-content__header">
            <li class="info-content__header--item">账户名称：{{ confirmTotal.bankName || '' }}</li>
            <!-- <li class="info-content__header--item">总笔数：{{ confirmTotal.successCount || 0 }}</li> -->
            <li class="info-content__header--item">
              {{ confirmTotal.payChannel && confirmTotal.payChannel.label }}：{{ confirmTotal.bankAccount || '' }}
            </li>
          </ul>
          <div class="info-content__body">
            <div class="pay-amount">
              <div class="pay-amount__item">
                <div class="pay-amount__item--label">待付总额（元）</div>
                <div class="pay-amount__item--number" style="color: #cc3333">
                  <i class="iconfont xbicon-rmb" style="font-size: 30px; margin-right: 10px"></i>
                  <span>{{ confirmTotal.shouldDeductAmount | moneyConvert }}</span>
                </div>
              </div>
              <div class="pay-amount__others">
                <div class="pay-amount__item">
                  <div class="pay-amount__item--label">实发金额（元）</div>
                  <div class="pay-amount__item--number" style="color: #e6a422">
                    <i class="iconfont xbicon-rmb" style="font-size: 30px; margin-right: 10px"></i>
                    <span>{{ confirmTotal.expspay | moneyConvert }}</span>
                  </div>
                </div>
                <div class="pay-amount__item" style="margin-left: 80px">
                  <div class="pay-amount__item--label">服务费及税金（元）</div>
                  <div class="pay-amount__item--number" style="color: #333333">
                    <i class="iconfont xbicon-rmb" style="font-size: 30px; margin-right: 10px"></i>
                    <span>{{ confirmTotal.serviceAndTaxAmount | moneyConvert }}</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="pay-tip">
              <i class="iconfont xbicon-warningbig" style="color: #cc3333; font-size: 20px; margin-right: 10px"></i>
              <span
                v-if="
                  confirmTotal.expireStatus &&
                  confirmTotal.expireStatus.value &&
                  confirmTotal.expireStatus.value !== PAY_EXPIRE_STATUS['正常']
                "
                >提示：您的代发因超时未付款，代发申请已经失效，需要重新提交代发申请才能发放。</span
              >
              <span v-else
                >提示：若在
                <span class="pay-time">{{ confirmTotal.expireDate }}</span>
                未完成支付，订单将会取消</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </block-container>
</template>

<script>
import BasePage from '@/mixins/BasePage'
import { PAY_EXPIRE_STATUS } from '@/maps/enum'
export default {
  name: 'PayConfirmInfoTotal',
  mixins: [BasePage],
  props: {
    confirmTotal: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      PAY_EXPIRE_STATUS
    }
  },

  methods: {}
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import '@/styles/mixin';
.pay-confirm-block {
  border-top-left-radius: 0px;
  border-top-right-radius: 0px;
  margin-bottom: 24px;
}
@include b(confirm-info) {
  @include e(number) {
    font-size: 14px;
    font-weight: 700;
    color: #333333;
    margin-bottom: 24px;
  }
  @include e(container) {
    border: 1px solid #cc3333;
    border-radius: 9px;
    display: flex;
    @include b(info-title) {
      width: 60px;
      background-color: #cc3333;
      writing-mode: vertical-lr;
      border-radius: 9px 0 0 9px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      font-weight: 400;
      color: #ffffff;
      @include e(dot) {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: #fff;
      }
    }
    @include b(info-content) {
      flex: 1;
      @include e(header) {
        padding: 0 24px;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        height: 55px;
        background: #f5d6d6;
        border-radius: 0 9px 0 0;
        font-size: 14px;
        font-weight: 400;
        color: #333333;
        @include m(item) {
          flex: 1;
        }
      }
      @include e(body) {
        box-sizing: border-box;
        padding: 24px 24px 0 24px;
        @include b(pay-amount) {
          border-bottom: 1px dashed #cc3333;
          @include e(item) {
            margin-bottom: 18px;
            @include m(label) {
              font-size: 14px;
              font-weight: 400;
              color: #666666;
              margin-bottom: 5px;
            }
            @include m(number) {
              font-size: 28px;
              font-weight: 400;
            }
          }
          @include e(others) {
            display: flex;
          }
        }
        @include b(pay-tip) {
          height: 70px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          font-size: 400;
          .pay-time {
            font-size: blod;
            color: #cc3333;
          }
        }
      }
    }
  }
}
</style>
