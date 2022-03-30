<template>
  <block-container class="block-container-custom">
    <div class="handle-valid-wrapper">
      <div class="valid-info">
        <div class="valid-info__process">
          <div class="valid-info__process__progress">
            <payroll-progress :success="successCount" :fail="failCount" :total="totalCount" />
          </div>
          <div class="valid-info__process__tip">
            <div class="valid-info__process__tip--top">
              提示：数据上传过程中您可离开此页面，数据将在后台继续完成上传
            </div>
            <div class="valid-info__process__tip--bottom">
              <span>校验方式：二要素</span>
              <el-tooltip class="item" effect="dark" content="姓名与身份证校验" placement="bottom">
                <i class="iconfont xbicon-question"></i>
              </el-tooltip>
            </div>
          </div>
        </div>
        <ul class="valid-info__result">
          <li class="valid-info__result__item">
            <i class="valid-info__result__item__line" style="background: #333333"></i>
            <div class="valid-info__result__item__total">
              <div class="valid-info__result__item__total--text">校验总条数(条)</div>
              <div class="valid-info__result__item__total--number" style="color: #333333">
                {{ totalCount }}
              </div>
            </div>
          </li>
          <li class="valid-info__result__item">
            <i class="valid-info__result__item__line" style="background: #03a92c"></i>
            <div class="valid-info__result__item__total">
              <div class="valid-info__result__item__total--text">校验成功(条)</div>
              <div class="valid-info__result__item__total--number" style="color: #03a92c">
                {{ successCount }}
              </div>
            </div>
          </li>
          <li class="valid-info__result__item">
            <i class="valid-info__result__item__line" style="background: #cc3333"></i>
            <div class="valid-info__result__item__total">
              <div class="valid-info__result__item__total--text">校验失败(条)</div>
              <div class="valid-info__result__item__total--number" style="color: #cc3333">
                {{ failCount }}
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="valid-wallet">
        <div class="valid-wallet__actual">
          <div class="valid-wallet__actual__label">实发金额（元）</div>
          <div class="valid-wallet__actual__number">
            <i class="iconfont xbicon-rmb" style="font-size: 28px; margin-right: 8px"></i>
            <span>{{ formatValue(batchPayDetail.totalExpspay) | moneyConvert }}</span>
          </div>
        </div>
        <div class="valid-wallet__tax">
          <div class="valid-wallet__tax__label">服务费及税金（元）</div>
          <div class="valid-wallet__tax__number">
            <i class="iconfont xbicon-rmb" style="font-size: 28px; margin-right: 8px"></i>
            <span>{{ formatValue(batchPayDetail.serviceAndTax) | moneyConvert }}</span>
          </div>
        </div>
        <div class="valid-wallet__account">
          <div class="charge">
            <div class="charge__amount">
              <div class="charge__amount__label">待充值金额（元）</div>
              <div class="charge__amount__number">
                {{ batchPayDetail.rechargeAmount | moneyConvert }}
              </div>
            </div>
            <div class="charge__bank">
              <div class="charge__bank__label">{{ batchPayDetail.channel && batchPayDetail.channel.label }}发放</div>
              <el-button
                v-if="menuAuthList.includes('WalletIndex')"
                style="background: #fff; width: 88px; height: 32px; padding: 5px 20px; color: #cc3333"
                @click="$router.push({ name: 'WalletIndex' })"
                >充值
              </el-button>
            </div>
          </div>
          <div class="balance">
            <div class="balance__account">
              账户余额：<span style="font-size: 18px">{{ batchPayDetail.balance | moneyConvert }}</span>
            </div>
            <div class="balance__pay" style="display: flex; align-items: center">
              待付金额：<span style="font-size: 18px">{{ batchPayDetail.shouldDeductAmount | moneyConvert }}</span>
              <el-popover
                placement="top-start"
                trigger="hover"
                width="250"
                v-if="batchPayDetail.settleType === 'NO_REAL_TIME'"
              >
                <div style="margin-left: 10px">
                  当前项目服务费为非实时结算，出账单后需手动结清，故本次待付金额中不含服务费及税金。
                </div>
                <i slot="reference" class="iconfont xbicon-question" style="font-size: 25px; cursor: pointer"></i>
              </el-popover>
            </div>
          </div>
        </div>
      </div>
    </div>
  </block-container>
</template>

<script>
import BasePage from '@/mixins/BasePage'
import PayrollProgress from '../PayrollProgress'
import { mapGetters } from 'vuex'
export default {
  name: 'HandleValidProcess',
  mixins: [BasePage],
  components: {
    PayrollProgress
  },
  props: {
    isInit: {
      type: Boolean,
      default: false
    },
    isValidating: {
      type: Boolean,
      default: false
    },
    batchPayDetail: {
      type: Object,
      default: () => ({})
    },
    successCount: {
      type: Number,
      default: 0
    },
    failCount: {
      type: Number,
      default: 0
    },
    totalCount: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      timer: null
    }
  },
  computed: {
    ...mapGetters(['userMenus']),
    menuAuthList() {
      const list = []
      this.userMenus.map(item => {
        item.children.map(item1 => {
          list.push(item1.permission)
        })
      })
      return list
    }
  },
  watch: {
    isInit(bool) {
      // UPLOAD中更新进度
      if (!bool && this.isValidating) {
        setTimeout(() => {
          this.updatingProgress()
        }, 500)
      }
    }
  },
  beforeDestroy() {
    clearTimeout(this.timer)
  },
  methods: {
    // 格式化金额
    formatValue(money) {
      // 展示代发状态中的金额
      if (this.isValidating) {
        return '计算中...'
      } else {
        return money
      }
    },
    // 更新进度
    updatingProgress() {
      clearTimeout(this.timer)
      // 更近进度
      this.$emit('on-change')
      if (this.successCount + this.failCount < this.totalCount) {
        this.timer = setTimeout(this.updatingProgress, 1000)
      } else {
        this.onFinish()
      }
    },
    // 完成校验
    onFinish() {
      setTimeout(() => {
        clearTimeout(this.timer)
        this.$emit('on-finish')
      }, 1000)
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import '@/styles/mixin';
.block-container-custom {
  border-top-left-radius: 0px;
  border-top-right-radius: 0px;
  margin-bottom: 24px;
}
@include b(handle-valid-wrapper) {
  display: flex;
  box-sizing: border-box;
  padding: 5px 0;
  @include b(valid-info) {
    flex: 1;
    display: flex;
    @include e(process) {
      width: 310px;
      @include e(progress) {
      }
      @include e(tip) {
        box-sizing: border-box;
        width: 100%;
        height: 114px;
        background: #fff4e5;
        border: 1px solid #e6a422;
        border-radius: 5px;
        padding: 0 17px;
        color: #e6a422;
        @include m(top) {
          box-sizing: border-box;
          padding: 12px 0;
          border-bottom: 1px dashed #e6a422;
        }
        @include m(bottom) {
          text-align: center;
          line-height: 45px;
        }
      }
    }
    @include e(result) {
      width: 100%;
      flex: 1;
      box-sizing: border-box;
      padding: 0 50px;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      @include e(item) {
        // height: 54px;
        display: flex;
        padding: 20px;
        box-sizing: border-box;
        @include e(line) {
          width: 6px;
          margin-right: 12px;
          border-radius: 3px;
        }
        @include e(total) {
          @include m(text) {
            font-size: 14px;
            font-weight: 400;
            color: #666666;
          }
          @include m(number) {
            font-size: 28px;
            font-weight: 400;
          }
        }
      }
    }
  }
  @include b(valid-wallet) {
    width: 494px;
    box-sizing: border-box;
    padding: 0 0 0 49px;
    border-left: 1px solid #e4e4e4;
    @include e(actual) {
      margin-bottom: 18px;
      @include e(label) {
        font-size: 14px;
        font-weight: 400;
        color: #666666;
        margin-bottom: 8px;
      }
      @include e(number) {
        font-size: 28px;
        font-weight: 400;
        color: #e6a422;
      }
    }
    @include e(tax) {
      margin-bottom: 18px;
      @include e(label) {
        font-size: 14px;
        font-weight: 400;
        color: #666666;
        margin-bottom: 8px;
      }
      @include e(number) {
        font-size: 28px;
        font-weight: 400;
        color: #333333;
      }
    }
    @include e(account) {
      width: 100%;
      border: 1px solid #cc3333;
      border-radius: 9px;
      @include b(charge) {
        height: 88px;
        box-sizing: border-box;
        padding: 14px 16px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: #cc3333;
        border-radius: 8px;
        @include e(amount) {
          @include e(label) {
            font-size: 14px;
            font-weight: 400;
            color: #ffffff;
            margin-bottom: 9px;
          }
          @include e(number) {
            font-size: 28px;
            font-weight: 400;
            color: #ffffff;
          }
        }
        @include e(bank) {
          @include e(label) {
            font-size: 14px;
            font-weight: 400;
            color: #ffffff;
            margin-bottom: 9px;
          }
        }
      }
      @include b(balance) {
        height: 88px;
        background: #fbefef;
        border-radius: 0 0 9px 9px;
        box-sizing: border-box;
        padding: 16px;
        font-size: 14px;
        font-weight: 400;
        @include e(account) {
          color: #cc3333;
          margin-bottom: 1px;
          margin-bottom: 12px;
        }
      }
      @include e(pay) {
        color: #cc3333;
        margin-bottom: 1px;
        margin-bottom: 12px;
      }
    }
  }
}
</style>
