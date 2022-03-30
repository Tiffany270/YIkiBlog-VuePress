<template>
  <div class="invoice-apply">
    <div class="invoice" v-for="(item, index) in invoiceApplyForms" :key="index">
      <el-card class="invoice__card">
        <div class="invoice__card__type">{{ item.type }}</div>
        <el-form ref="invoiceApplyForms" size="medium">
          <div class="invoice__card__table">
            <table width="847" border="0" cellspacing="0" cellpadding="0">
              <tr style="background-color: #fafafa">
                <td style="width: 250px">服务名称</td>
                <td>金额(元)</td>
                <td>税率</td>
                <td>税额(元)</td>
                <td>含税金额(元)</td>
              </tr>
              <tr v-for="(item1, index1) of item.applyDataList" :key="index1">
                <td>{{ item1.invoiceContent }}</td>
                <td>{{ item1.amount | moneyConvert }}</td>
                <td>6%</td>
                <td>{{ item1.tax | moneyConvert }}</td>
                <td style="width: 180px">
                  {{ item1.taxAmount | moneyConvert }}
                </td>
              </tr>
              <tr>
                <td colspan="6">价税合计(元)：{{ item.taxAmount | moneyConvert }}</td>
              </tr>
            </table>
          </div>
        </el-form>
        <div class="invoice__card__info">
          <div class="base-name"><p>购买方</p></div>
          <div class="base-info">
            <el-form label-width="120px" size="medium">
              <el-form-item label="名称:">{{ buyerData.clientName }}</el-form-item>
              <el-form-item label="纳税人识别号:">{{ buyerData.creditCode }}</el-form-item>
              <el-form-item label="地址、电话:">{{ buyerData.address }} {{ buyerData.contactPhone }}</el-form-item>
              <el-form-item label="开户行及账号:">{{ buyerData.bankName }} {{ buyerData.bankAccount }}</el-form-item>
            </el-form>
          </div>
          <div class="base-name"><p>销售方</p></div>
          <div class="base-info">
            <el-form label-width="120px" size="medium">
              <el-form-item label="名称:">{{ sellerData.name }}</el-form-item>
              <el-form-item label="纳税人识别号:">{{ sellerData.bizLicNo }}</el-form-item>
              <el-form-item label="地址、电话:">{{ sellerData.address }} {{ sellerData.phone }}</el-form-item>
              <el-form-item label="开户行及账号:">{{ sellerData.bankName }} {{ sellerData.bankAccount }}</el-form-item>
            </el-form>
          </div>
        </div>
        <div class="invoice__card__remark">
          <div class="base-name"><p>备注</p></div>
          <div class="base-info">{{ item.remark }}</div>
        </div>
      </el-card>
    </div>
    <div class="delivery">
      <styled-title style="margin-bottom: 24px">收货地址信息</styled-title>
      <detail-list :labelData="deliveryLabelData" :data="deliveryData" :row="1" />
    </div>
    <div class="amount">
      <styled-title style="margin-bottom: 24px">开票金额</styled-title>
      <div class="amount__content">
        <span class="amount__content--label">本次开票金额：</span>
        <span class="amount__content--value">
          <span style="color: #cc3333; font-size: 15px; font-weight: 600">{{ invoiceTotalAmount }}</span> 元
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import DetailList from '_c/DetailList'
import StyledTitle from '_c/StyledTitle'
import { queryInvoiceDetail } from '@/apis/invoice'
export default {
  name: 'InvoiceApply',
  components: {
    DetailList,
    StyledTitle
  },
  data() {
    return {
      invoiceApplyForms: [
        {
          type: '增值税普通发票',
          taxAmount: 0,
          remark: '',
          applyDataList: [
            {
              invoiceContent: '',
              amount: 0,
              tax: 0,
              taxAmount: ''
            }
          ]
        }
      ],
      // 购方
      buyerData: {},
      // 消方
      sellerData: {},
      // 邮寄信息
      deliveryLabelData: [
        { label: '联系人', key: 'name' },
        { label: '电话', key: 'mobile' },
        { label: '收票地址', key: 'address' }
      ],
      deliveryData: {
        name: '',
        mobile: '',
        address: ''
      },
      invoiceTotalAmount: 0.0
    }
  },
  mounted() {
    this.getInvoiceDetail()
  },
  methods: {
    async getInvoiceDetail() {
      const { data } = await queryInvoiceDetail({
        invoiceId: this.$route.query.id
      })
      if (data.invoiceApplyFlowDTO && data.invoiceApplyFlowDTO.length) {
        const tempArr = []
        data.invoiceApplyFlowDTO.map(item => {
          const tempObj = {}
          tempObj['type'] = item.type.label
          tempObj['taxAmount'] = item.taxAmount
          tempObj['remark'] = item.remark
          tempObj['applyDataList'] = item.invoiceApplyDataDTOList || []
          tempArr.push(tempObj)
        })
        this.invoiceApplyForms = tempArr || []
      }
      // 购方
      this.buyerData = data && data.clientDTO
      // 消方
      this.sellerData = data && data.companyDTO
      // 地址信息
      this.deliveryData.name = data.invoiceDTO && data.invoiceDTO.name
      this.deliveryData.mobile = data.invoiceDTO && data.invoiceDTO.mobile
      this.deliveryData.address =
        data.invoiceDTO &&
        data.invoiceDTO.province + data.invoiceDTO.city + data.invoiceDTO.county + data.invoiceDTO.street
      this.invoiceTotalAmount = data.invoiceDTO && data.invoiceDTO.amount
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss">
@import '@/styles/mixin';
@include b(invoice-apply) {
  @include b(invoice) {
    @include e(card) {
      width: 978px;
      margin: 0 auto 6px;
      background-image: url('../../../../../assets/images/invoice-bg.png');
      background-position: -9px -6px;
      background-repeat: no-repeat;
      background-size: 102% 103%;
      overflow: visible;
      .el-card__body {
        padding: 10px 10px 50px;
        box-sizing: border-box;
      }
      @include e(type) {
        text-align: center;
        line-height: 50px;
        cursor: pointer;
        position: relative;
      }
      @include e(table) {
        margin-bottom: 23px;
        table {
          border-right: 1px solid #dcdfe6;
          border-bottom: 1px solid #dcdfe6;
          margin-left: 35px;
          tr {
            height: 54px;
            font-size: 12px;
            font-weight: 400;
            color: rgba(0, 0, 0, 0.85);
            line-height: 21px;
            td {
              text-align: center;
              border-left: 1px solid #dcdfe6;
              border-top: 1px solid #dcdfe6;
            }
          }
          tr:first {
            background: rgba(250, 250, 250, 1);
          }
        }
      }
      @include e(info) {
        box-sizing: border-box;
        border: 1px solid #dcdfe6;
        width: 848px;
        margin-left: 35px;
        &::after {
          content: '';
          height: 0;
          clear: both;
          overflow: hidden;
          display: block;
          visibility: hidden;
        }
        .base-name {
          border-right: 1px solid #dcdfe6;
          float: left;
          width: 50px;
          min-height: 255px;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 12px;
          color: rgba(102, 102, 102, 1);
          p {
            width: 10px;
          }
        }
        .base-info {
          border-right: 1px solid #dcdfe6;
          float: left;
          padding: 30px 0;
          min-height: 255px;
          width: 372px;
          box-sizing: border-box;
          .el-form-item {
            margin-bottom: 0px;
          }
        }
        div:last-of-type {
          border: none;
        }
      }
      @include e(remark) {
        border: 1px solid #dcdfe6;
        border-top: none;
        height: 51px;
        width: 846px;
        margin-left: 35px;
        &::after {
          content: '';
          height: 0;
          clear: both;
          overflow: hidden;
          display: block;
          visibility: hidden;
        }
        .base-name {
          border-right: 1px solid #dcdfe6;
          float: left;
          width: 50px;
          height: 50px;
          min-height: 50px;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 12px;
          color: rgba(102, 102, 102, 1);
          p {
            width: 10px;
          }
        }
        .base-info {
          float: left;
          height: 50px;
          line-height: 50px;
          padding-left: 20px;
          font-size: 12px;
        }
      }
    }
  }
  @include b(delivery) {
    width: 987px;
    margin: 45px auto;
    .el-form-item {
      margin-bottom: 0;
    }
  }
  @include b(amount) {
    width: 987px;
    margin: 45px auto;
    .el-form-item {
      margin-bottom: 0;
    }
  }
}
</style>
