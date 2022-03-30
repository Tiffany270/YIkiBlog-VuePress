<template>
  <div class="home-container">
    <div class="dashboard-container">
      <div class="tip-title">
        <h1>简单4步轻松发佣金，快来开始吧！</h1>
        <h2>我们拥有简便快捷的报税和发佣流程,满足各种发佣需要和多种支付场景</h2>
      </div>
      <div class="step">
        <template v-for="item in imgs">
          <div :key="item.url" class="step-img" @click="goto(item.name)">
            <div class="img-box">
              <img :src="item.url" alt="" />
              <p>{{ item.label }}</p>
            </div>
            <div class="circle-box">
              <i class="item-circle"></i>
              <i class="item-circle"></i>
              <i class="item-circle"></i>
            </div>
          </div>
        </template>
      </div>
      <img class="right" src="./imgs/right.png" alt="" />
    </div>

    <div class="display-block">
      <template v-for="(item, index) in contractData">
        <div :key="item.id" class="count-display" :style="{ 'margin-right': index === 2 ? '0' : '30px' }">
          <h3>{{ item.title }}</h3>
          <div class="contract-box">
            <h5 @click="goto(item.toName)">{{ item.tip }}</h5>
            <p>{{ item.label1 }}</p>
            <p class="label-count">
              {{ item.count1 }}
            </p>
            <div class="contract-line"></div>
            <p>{{ item.label2 }}</p>
            <p class="label-count count2">
              {{ item.count2 }}
            </p>
          </div>
        </div>
      </template>
    </div>

    <div class="chart-container">
      <h3>发放趋势</h3>
      <line-chart :chart-data="trendData" />
    </div>
  </div>
</template>
<script>
import LineChart from '@/views/home/component/LineChart'
import { statisticsSign, homePageData, subWalletCount, indexStatistics } from '@/apis/dashboard'
import { numberConverter } from '@/mixins/NumberConverter'
import { OFFLINN_PAY_KEY } from '@/maps/constant'
import { mapGetters } from 'vuex'
export default {
  name: 'Dashboard',
  components: { LineChart },
  data() {
    return {
      statistics: {
        canUseAmount: 0,
        usedAmount: 0,
        signedCount: 0,
        unSignCount: 0,
        balance: 0,
        payrollAmount: 0
      },
      chatData: [],
      imgs: [
        {
          url: require('./imgs/step1.png'),
          label: '个人签约',
          name: 'SignManage'
        },
        {
          url: require('./imgs/step2.png'),
          label: '钱包充值',
          name: 'WalletIndex'
        },
        {
          url: require('./imgs/step3.png'),
          label: '佣金发放',
          name: 'PayCommission'
        },
        {
          url: require('./imgs/step4.png'),
          label: '开票申请',
          name: 'InvoiceManage'
        }
      ],
      OFFLINN_PAY_KEY,
      secondPanelAuthList: []
    }
  },
  computed: {
    trendData() {
      const result = {
        month: [],
        totalAmount: [],
        unit: '元'
      }
      for (let i = 0; i <= this.chatData.length - 1; i++) {
        result.month.push(this.chatData[i].month)
        result.totalAmount.push(this.chatData[i].totalAmount)
      }
      return result
    },
    contractData() {
      return [
        {
          tip: '充值',
          title: '资金统计',
          label1: '资金账户余额（元）',
          label2: '累计发放金额（元）',
          count1: numberConverter.moneyConvert(this.statistics.balance),
          count2: numberConverter.moneyConvert(this.statistics.payrollAmount),
          id: 1,
          toName: 'WalletIndex'
        },
        {
          tip: '开票',
          title: '开票统计',
          label1: '可开票金额（元）',
          label2: '累计开票金额（元）',
          count1: numberConverter.moneyConvert(this.statistics.canUseAmount),
          count2: numberConverter.moneyConvert(this.statistics.usedAmount),
          id: 2,
          toName: 'InvoiceManage'
        },
        {
          tip: '详情',
          title: '签约统计',
          label1: '已完成签约（人）',
          label2: '未完成签约（人）',
          count1: numberConverter.strokeCountConvert(this.statistics.signedCount),
          count2: numberConverter.strokeCountConvert(this.statistics.unSignCount),
          id: 3,
          toName: 'SignManage'
        }
      ]
    },
    ...mapGetters(['userMenus'])
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      statisticsSign().then(res => {
        this.statistics.signedCount = res.data.signedCount
        this.statistics.unSignCount = res.data.unSignCount
      })
      homePageData().then(res => {
        this.statistics.usedAmount = res.data.usedAmount
        this.statistics.canUseAmount = res.data.canUseAmount
      })
      subWalletCount().then(res => {
        this.statistics.balance = res.data.balance
        this.statistics.payrollAmount = res.data.payrollAmount
      })
      indexStatistics().then(res => {
        this.chatData = res.data
      })
      this.handleFilterMenuAuth()
    },
    goto(name) {
      if (!this.secondPanelAuthList.includes(name)) {
        this.$message.warning('您没有当前页面的访问权限')
        return
      }
      this.$router.push({ name })
    },
    // 根据权限获取是否又资金、开票、签约菜单
    handleFilterMenuAuth() {
      const list = []
      this.userMenus.map(item => {
        item.children.map(item1 => {
          list.push(item1.permission)
        })
      })
      this.secondPanelAuthList = list
    }
  }
}
</script>
<style lang="scss" scoped>
.home-container {
  box-sizing: border-box;
  padding: 24px;
  width: 100%;
  overflow-y: auto;
}
.dashboard-container {
  position: relative;
  padding: 21px 34px 23px 24px;
  background-color: #fff;
  margin-bottom: 20px;
  border-radius: 6px;
  .tip-title {
    h1 {
      margin: 0;
      font-size: 26px;
      font-weight: 700;
      color: #333;
      width: 251px;
    }
    h2 {
      margin: 18px 0 37px 0;
      width: 405px;
      font-size: 16px;
      font-weight: 400;
      color: #999999;
      line-height: 26px;
    }
  }
  .right {
    position: absolute;
    top: 50px;
    right: 50px;
    height: 90%;
  }
  .step {
    display: flex;
    justify-content: space-between;
    width: 70%;
    .step-img {
      display: flex;
      justify-content: space-between;
      width: 25%;
      &:hover {
        &:nth-child(1) {
          p {
            color: #80dd97;
          }
        }
        &:nth-child(2) {
          p {
            color: #e08585;
          }
        }
        &:nth-child(3) {
          p {
            color: #ffca7f;
          }
        }
        &:nth-child(4) {
          p {
            color: #7295ff;
          }
        }
      }
      .img-box {
        transition: all 0.2s;
        flex: 3;
        &:hover {
          transform: translateY(-8px);
        }
      }
      img {
        cursor: pointer;
        width: 100%;
        box-shadow: 2px 2px 10px 0px rgba(0, 0, 0, 0.1);
      }
      position: relative;
      // i {
      //   color: #e4e4e4;
      //   font-size: 20px;
      //   position: absolute;
      //   top: 25%;
      //   transform: translateY(25%);
      //   right: 25%;
      //   transform: translatex(100%);
      // }
      p {
        text-align: center;
      }
      .circle-box {
        flex: 2;
        display: flex;
        justify-content: center;
        padding: 25% 0 0;
        .item-circle {
          width: 6px;
          height: 6px;
          background: #ccc;
          border-radius: 50%;
          margin-right: 5%;
        }
      }
      &:nth-last-child(1) {
        .circle-box {
          visibility: hidden;
        }
      }
    }
  }
}

.display-block {
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
}
.count-display {
  width: 33%;
  background: #ffffff;
  box-shadow: 0 2px 12px 0 #f2f2f2;
  padding: 15px 26px 28px 26px;
  border-radius: 6px;
  position: relative;
  // margin-right: 30px;
  h3 {
    margin-top: 0;
    color: #333;
    font-weight: 700;
    font-size: 16px;
  }
  p {
    font-size: 14px;
    color: #666;
    transition: all 0.3s;
    &.label-count {
      font-size: 28px;
      color: #333333;
      font-weight: 600;
      margin: 15px 0;
    }
  }
  .contract-box {
    position: relative;
    padding: 0 17px 0px 22px;
    border-radius: 9px;
    &:hover {
      p {
        transform: translateX(8px);
      }
    }
    .contract-line {
      height: 1px;
    }
    h5 {
      position: absolute;
      right: -1px;
      top: -1px;
      z-index: 10;
      padding: 9px 16px;
      margin: 0;
      font-size: 12px;
      font-weight: 400;
      border-radius: 0 9px 0 9px;
      cursor: pointer;
    }
  }
  &:nth-child(1) {
    .contract-box {
      border: 1px solid #f5d6d6;
      border-left: 8px solid #cc3333;
      h5 {
        color: #cc3333;
        background-color: #f5d6d6;
      }
      &:hover {
        border: 1px solid #cc3333;
        border-left: 8px solid #cc3333;
        h5 {
          color: #fff;
          background-color: #cc3333;
        }
      }
      .contract-line {
        background: #f5d6d6;
      }
      .count2 {
        color: #cc3333;
      }
    }
  }
  &:nth-child(2) {
    .contract-box {
      border: 1px solid #d4ddf7;
      border-left: 8px solid #3360e1;
      h5 {
        color: #3360e1;
        background-color: #d4ddf7;
      }
      &:hover {
        border: 1px solid #3360e1;
        border-left: 8px solid #3360e1;
        h5 {
          color: #fff;
          background-color: #3360e1;
        }
      }
      .contract-line {
        background: #d4ddf7;
      }
      .count2 {
        color: #3360e1;
      }
    }
  }
  &:nth-child(3) {
    .contract-box {
      margin-right: 0px;
      border: 1px solid #cdeed5;
      border-left: 8px solid #03a92c;
      h5 {
        color: #03a92c;
        background-color: #cdeed5;
      }
      &:hover {
        border: 1px solid #03a92c;
        border-left: 8px solid #03a92c;
        h5 {
          color: #fff;
          background-color: #03a92c;
        }
      }
      .contract-line {
        background: #cdeed5;
      }
      .count2 {
        color: #03a92c;
      }
    }
  }
}
.chart-container {
  background-color: #fff;
  margin-top: 30px;
  border-radius: 6px;
  padding: 18px 24px;
  h3 {
    margin-top: 0;
  }
}
</style>
