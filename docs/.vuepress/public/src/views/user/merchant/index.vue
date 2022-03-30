<template>
  <page-container>
    <div class="commercial-tenant-info">
      <div class="commercial-tenant-box">
        <div class="title"><span>商户管理员</span></div>
        <div class="info-content">
          <div>
            姓名： <span>{{ userInfo.accountName }}</span>
          </div>
          <div>
            电话： <span>{{ userInfo.accountPhone }}</span>
          </div>
          <div class="remark"><span>(如需更换请联系平台客服)</span></div>
        </div>
      </div>
      <!-- <div class="commercial-tenant-box">
        <div class="title"><span>联系信息</span></div>
        <div class="info-content">
          <div>
            客户经理： <span>{{ businessInfo.accountManager }}</span>
          </div>
          <div>
            手机号码： <span>{{ businessInfo.phone }}</span>
          </div>
        </div>
      </div> -->
      <div class="commercial-tenant-box">
        <div class="title"><span>开票信息</span></div>
        <div class="info-content">
          <div>
            开票企业名称：<span>{{ userInfo.clientName }}</span>
          </div>
          <div>
            纳税人识别号： <span>{{ userInfo.creditCode }}</span>
          </div>
          <div>
            电话号码： <span>{{ userInfo.clientPhone }}</span>
          </div>
          <div>
            开户行： <span>{{ userInfo.bankName }}</span>
          </div>
          <div>
            银行账号： <span>{{ userInfo.bankAccount }}</span>
          </div>
          <div>
            地址： <span>{{ userInfo.address }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="commercial-tenant-info">
      <div class="commercial-tenant-box">
        <div class="title"><span>公司信息</span></div>
        <div class="info-content">
          <div>
            公司名称：<span>{{ userInfo.companyName }}</span>
          </div>
          <div>
            社会信用代码： <span>{{ userInfo.companyCreditCode }}</span>
          </div>
          <!-- <div>
            所属行业： <span>{{ userInfo.industryInvolved }}</span>
          </div>
          <div>
            平台名称： <span>{{ userInfo.platformName }}</span>
          </div> -->
        </div>
      </div>
      <div class="commercial-tenant-box">
        <div class="title"><span>签约信息</span></div>
        <div class="info-content">
          <div>
            项目名称：<span>{{ userInfo.projectName }}</span>
          </div>
          <div>
            签约服务公司： <span>{{ userInfo.signCompanyName }}</span>
          </div>
          <!-- <div class="company-subject">
            园区主体：
            <div style="margin-top: 0">
              <div
                v-for="item in userInfo.companySubjectList"
                :key="item.name"
                class="company-subject-item"
              >
                <span>{{ item.name }}</span>
                <span
                  v-if="item.status.name === 'USING'"
                  class="current-provide"
                  >当前发放</span
                >
              </div>
            </div>
          </div>
          <div>
            合同起止时间：
            <span>{{ userInfo.startDate }} 至 {{ userInfo.endDate }}</span>
          </div> -->
        </div>
      </div>
    </div>
  </page-container>
</template>
<script>
import { businessInfo } from '@/apis/businessInfo'
import BasePage from '@/mixins/BasePage'
export default {
  mixins: [BasePage],
  data() {
    return {
      userInfo: {},
      businessInfo: {}
    }
  },
  created() {
    this.getBusinessInfo()
  },
  methods: {
    getBusinessInfo() {
      businessInfo().then(({ data }) => {
        this.userInfo = data
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.commercial-tenant-info {
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-bottom: 10px;
  .commercial-tenant-box {
    position: relative;
    background-color: #fff;
    margin-left: 15px;
    padding: 20px 30px;
    min-height: 190px;
    flex: 1;
    border-radius: 4px;
    &:first-child {
      margin-left: 0;
    }
    .title {
      position: absolute;
      border-bottom: 1px solid #eff0f4;
      left: 0;
      background-color: #fff;
      width: 100%;
      font-weight: 500;
      font-size: 16px;
      span {
        position: relative;
        top: -8px;
        left: 25px;
      }
    }
    .info-content {
      margin-top: 35px;
      color: #333;
      font-size: 14px;
      div {
        margin-top: 12px;
        line-height: 20px;
        &.remark {
          margin-top: 4px;
          font-size: 12px;
        }
        &.company-subject {
          display: flex;
          .company-subject-item:first-child {
            margin-top: 0;
            display: flex;
            align-items: center;
          }
          .current-provide {
            display: inline-block;
            width: 64px;
            line-height: 24px;
            // font-size: $hint-fsz;
            // background: url(/static/image/icon_label_bg.png);
            // color: $color-warning;
            padding-left: 6px;
            margin-left: 7px;
          }
        }
      }
      span {
        color: #666;
      }
      .enterprise-info {
        display: flex;
        flex-wrap: wrap;
        align-items: stretch;
        margin-top: 0;
        /deep/ {
          .upload-img-container {
            .upload-img-content,
            .upload-img {
              width: inherit !important;
            }
          }
        }
      }
    }
  }
}
</style>
