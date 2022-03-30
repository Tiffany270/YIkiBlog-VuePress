<template>
  <page-container show-go-back>
    <div class="submit-invoice">
      <!-- <div class="submit-invoice__warning">
        <warn-tips>温馨提示： 低于20万的开票金额，每月仅能申请1次！</warn-tips>
      </div> -->
      <block-container>
        <div class="invoice" v-for="(item, index) in invoiceApplyForms" :key="index">
          <el-card class="invoice__card">
            <div class="invoice__card__type">
              <p v-if="index > 0" class="invoice__card__type--delete" @click="removeInvoice(index)" />
              <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                  {{ item.typeName }}<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item
                    v-for="dtem in invoiceOptions"
                    :key="dtem.value"
                    @click.native="handleSwitchInvoiceType(dtem, index)"
                    >{{ dtem.label }}</el-dropdown-item
                  >
                </el-dropdown-menu>
              </el-dropdown>
            </div>
            <el-form ref="invoiceApplyForms" size="medium">
              <div class="invoice__card__table">
                <table width="847" border="0" cellspacing="0" cellpadding="0">
                  <tr style="background-color: #fafafa">
                    <td style="width: 250px">服务名称</td>
                    <td>金额(元)</td>
                    <td>税率</td>
                    <td>税额(元)</td>
                    <td>含税金额(元)</td>
                    <td>操作</td>
                  </tr>
                  <tr v-for="(item1, index1) of item.applyDataList" :key="index1">
                    <td>
                      <el-select v-model="item.applyDataList[index1].invoiceContent" placeholder="请选择">
                        <el-option v-for="(ctem, idx) in invoiceContentList" :key="idx" :label="ctem" :value="ctem" />
                      </el-select>
                    </td>
                    <td>{{ item1.amount | formatMoney }}</td>
                    <td>6%</td>
                    <td>{{ item1.tax | formatMoney }}</td>
                    <td style="width: 180px">
                      <template>
                        <el-input
                          v-model="item1.taxAmount"
                          placeholder="请输入金额"
                          prop="taxMoneny"
                          style="width: 135px"
                          @input="item1.taxAmount = handleMoneyInputDecimal($event)"
                          @keyup.native="calculateTaxAmount(item1.taxAmount, index, index1)"
                          @blur="handleBlurTaxAmount(item1.taxAmount, index, index1)"
                        />
                      </template>
                    </td>
                    <td style="width: 60px">
                      <el-button type="text" style="font-size: 12px" v-if="!index1" @click="handleAddContent(index)"
                        >增加</el-button
                      >
                      <el-button type="text" style="font-size: 12px" v-else @click="handleRemoveContent(index, index1)"
                        >删除</el-button
                      >
                    </td>
                  </tr>
                  <tr>
                    <td colspan="6">价税合计(元)：{{ item.totalAmount | formatMoney }}</td>
                  </tr>
                </table>
              </div>
            </el-form>
            <div class="invoice__card__info">
              <div class="base-name"><p>购买方</p></div>
              <div class="base-info">
                <el-form label-width="120px" size="medium">
                  <el-form-item label="名称：">{{ buyerData.clientName }}</el-form-item>
                  <el-form-item label="纳税人识别号：">{{ buyerData.creditCode }}</el-form-item>
                  <el-form-item label="地址、电话：">{{ buyerData.address }} {{ buyerData.contactPhone }}</el-form-item>
                  <el-form-item label="开户行及账号："
                    >{{ buyerData.bankName }} {{ buyerData.bankAccount }}</el-form-item
                  >
                </el-form>
              </div>
              <div class="base-name"><p>销售方</p></div>
              <div class="base-info">
                <el-form label-width="120px" size="medium">
                  <el-form-item label="名称：">{{ sellerData.name }}</el-form-item>
                  <el-form-item label="纳税人识别号：">{{ sellerData.bizLicNo }}</el-form-item>
                  <el-form-item label="地址、电话：">{{ sellerData.address }} {{ sellerData.phone }}</el-form-item>
                  <el-form-item label="开户行及账号："
                    >{{ sellerData.bankName }} {{ sellerData.bankAccount }}</el-form-item
                  >
                </el-form>
              </div>
            </div>
            <div class="invoice__card__remark">
              <div class="base-name"><p>备注</p></div>
              <div class="base-info">
                <el-input v-model.trim="item.remark" placeholder="请输入备注信息" />
              </div>
            </div>
          </el-card>
        </div>
        <div class="add">
          <p class="add__img" @click="handleAddInvoice"></p>
        </div>
        <div class="delivery">
          <styled-title>收货地址信息</styled-title>
          <el-form
            ref="deliveryForm"
            :model="deliveryForm"
            :rules="deliveryFormRules"
            label-width="80px"
            size="medium"
            style="margin-top: 50px"
          >
            <el-form-item label="联系人:" prop="personName">
              <el-input v-model.trim="deliveryForm.personName" style="width: 319px" placeholder="请输入联系人姓名" />
            </el-form-item>
            <br />
            <el-form-item label="电话:" prop="personPhone">
              <el-input v-model.trim="deliveryForm.personPhone" style="width: 319px" placeholder="请输入电话号码" />
            </el-form-item>
            <br />
            <el-form-item label="收票地址" prop="address">
              <city-picker ref="CityPicker" v-model.trim="deliveryForm.cityArray" />
              <el-input v-model.trim="deliveryForm.address" style="width: 319px" placeholder="请输入详细地址" />
            </el-form-item>
          </el-form>
        </div>
      </block-container>
    </div>
    <template v-slot:bottomBarLeft>
      <el-form label-width="156px" size="medium" inline label-position="left" class="invoice-count">
        <el-form-item label="开票总额（元）:">
          <span style="font-size:font-size: 18px;font-weight:600;color: #333333;"
            >￥{{ invoiceAmountData.invoiceTotalAmount | formatMoney }}</span
          ></el-form-item
        >
        <el-form-item label="本次开票金额（元）:" v-if="source === 'bill'"
          ><span style="font-size:font-size: 18px;font-weight:600;color: #CC3333;"
            >￥{{ invoiceAmountData.currentInvoiceAmount | formatMoney }}</span
          ></el-form-item
        >
        <el-form-item label="差额（元）:" v-if="source === 'bill'"
          ><span style="font-size:font-size: 18px;font-weight:600;color: #333333;"
            >￥{{ invoiceAmountData.differenceAmount | formatMoney }}</span
          ></el-form-item
        >
        <el-form-item label="发票总价税合计（元）:"
          ><span style="font-size:font-size: 18px;font-weight:600;color: #333333;"
            >￥{{ invoiceAmountData.invoiceAmountAndTax | formatMoney }}</span
          ></el-form-item
        >
      </el-form>
    </template>
    <template v-slot:bottomBarRight>
      <el-button
        type="primary"
        @click="handleSubmit"
        :disabled="invoiceAmountData.differenceAmount < 0"
        v-preventReClick
        >确认提交</el-button
      >
    </template>
  </page-container>
</template>

<script>
import BasePage from '@/mixins/BasePage'
import StyledTitle from '_c/StyledTitle'
import CityPicker from '_c/CityPicker'
import { handleMoneyInputDecimal } from '@/utils/handleMoneyEvent'
import {
  queryPrepareIvnoice,
  calculateAmount,
  createInvoice,
  queryInvoiceContent,
  queryPreInvoiceData,
  createPreInvoiceInfo
} from '@/apis/invoice'
import { mapGetters } from 'vuex'
import debounce from 'lodash/debounce'
import { staticRules } from '@/utils/validate'
import { toThousands } from '@/utils/util'
export default {
  name: 'SubmitInvoice',
  mixins: [BasePage],
  components: {
    StyledTitle,
    CityPicker
  },
  data() {
    return {
      toThousands,
      // 发票类型
      invoiceOptions: [
        {
          value: 'VAT_INVOICE',
          label: '增值税专用发票'
        },
        {
          value: 'PLAIN_INVOICE',
          label: '增值税普通发票'
        }
      ],
      // 开票内容
      invoiceContentList: [],
      // 发票信息
      invoiceApplyForms: [
        {
          type: 'VAT_INVOICE',
          typeName: '增值税专用发票',
          totalAmount: 0,
          remark: '',
          applyDataList: [
            {
              invoiceContent: '',
              amount: '0',
              tax: '0',
              taxAmount: '0.00'
            }
          ]
        }
      ],
      // 购买方
      buyerData: {},
      // 销方
      sellerData: {},
      // 邮寄地址
      deliveryForm: {
        personName: '',
        personPhone: '',
        cityArray: [],
        address: ''
      },
      deliveryFormRules: {
        personName: [staticRules('联系人').required],
        personPhone: [staticRules('电话').required, staticRules('电话').mobile],
        address: [staticRules('收票详细地址').required]
      },
      handleMoneyInputDecimal,
      // 开票金额信息
      invoiceAmountData: {
        invoiceTotalAmount: 0,
        currentInvoiceAmount: 0,
        differenceAmount: 0,
        invoiceAmountAndTax: 0
      }
    }
  },
  computed: {
    billNos() {
      return this.$route.query.billNos.split(',')
    },
    source() {
      return this.$route.query.source
    },
    ...mapGetters(['userProject'])
  },
  mounted() {
    this.getInitData()
    this.calculateTaxAmount = debounce(this.calculateTaxAmount, 500)
  },
  methods: {
    async getInitData() {
      await this.getInvoiceContentList()
      this.getInvoiceData()
    },
    // 获取开票内容
    async getInvoiceContentList() {
      const { data } = await queryInvoiceContent(this.userProject.projectId)
      this.invoiceContentList = data.invoiceContent || []
    },
    // 获取账单开票信息
    async getInvoiceData() {
      /* eslint-disable */
      const { data } =
        this.source === 'bill'
          ? await queryPrepareIvnoice({
              billNo: this.$route.query.billNos
            })
          : await queryPreInvoiceData()
      this.buyerData = data.clientDTO
      this.sellerData = data.companyDTO
      this.invoiceApplyForms[0].applyDataList[0].invoiceContent = this.invoiceContentList[0]
      this.invoiceApplyForms[0].applyDataList[0].amount = data.invoiceTaxDTO.amount
      this.invoiceApplyForms[0].applyDataList[0].tax = data.invoiceTaxDTO.tax
      this.invoiceApplyForms[0].applyDataList[0].taxAmount = data.invoiceTaxDTO.taxAmount
      // 底部显示开票总额
      this.invoiceAmountData.invoiceTotalAmount = data.invoiceTaxDTO.taxAmount
      let totalAmount = 0
      this.invoiceApplyForms[0].applyDataList.forEach(val => {
        totalAmount = this.addCalc(totalAmount, val['amount'], val['tax'])
      })
      this.invoiceApplyForms[0].totalAmount = totalAmount
      // 更新底部统计
      this.calculateTaxAmount(this.invoiceApplyForms[0].applyDataList[0].taxAmount, 0, 0)
      // 收货信息
      if (data.accountExpandInfoDTO) {
        this.deliveryForm.personName = data.accountExpandInfoDTO.personName
        this.deliveryForm.personPhone = data.accountExpandInfoDTO.personPhone
        this.deliveryForm.cityArray = [
          data.accountExpandInfoDTO.province,
          data.accountExpandInfoDTO.city,
          data.accountExpandInfoDTO.area
        ]
        this.deliveryForm.address = data.accountExpandInfoDTO.address
      }
    },
    // 切换发票
    handleSwitchInvoiceType(item, index) {
      this.invoiceApplyForms[index].type = item.value
      this.invoiceApplyForms[index].typeName = item.label
    },
    // 新增内容
    handleAddContent(index) {
      this.invoiceApplyForms[index].applyDataList.push({
        invoiceContent: this.invoiceContentList[0],
        moneny: '0',
        amount: '0',
        taxAmount: '0.00'
      })
    },
    // 删除内容
    handleRemoveContent(index, index1) {
      this.invoiceApplyForms[index].applyDataList.splice(index1, 1)
      this.calculateTotalTaxAmount(index)
      this.calculateTotalAmount()
    },
    calcDecimalLength(decimal) {
      const splitArray = decimal.toString().split('.')
      if (splitArray.length === 1) {
        return 0
      }
      return splitArray[1].length
    },
    calcMax(a, b, c) {
      // 计算相乘的倍数
      const aLength = this.calcDecimalLength(a)
      const bLength = this.calcDecimalLength(b)
      const cLength = this.calcDecimalLength(c)
      const max = Math.pow(10, Math.max(aLength, bLength, cLength))
      return max
    },
    multiCalc(num1, num2) {
      const num1Length = this.calcDecimalLength(num1)
      const num2Length = this.calcDecimalLength(num2)
      return (
        (Number(num1.toString().replace('.', '')) * Number(num2.toString().replace('.', ''))) /
        Math.pow(10, Math.max(num1Length, num2Length))
      )
    },
    addCalc(a, b, c) {
      if (typeof a !== 'number' || typeof b !== 'number' || typeof b !== 'number') {
        return a + b + c
      }
      const max = this.calcMax(a, b, c)
      return (this.multiCalc(a, max) + this.multiCalc(b, max) + this.multiCalc(c, max)) / max
    },
    // 增加开票发票
    handleAddInvoice() {
      let invoiceContent = ''
      if (this.invoiceContentList.length) {
        invoiceContent = this.invoiceContentList[0]
      }
      this.invoiceApplyForms.push({
        // 发票信息
        type: 'VAT_INVOICE',
        typeName: '增值税专用发票',
        totalAmount: 0,
        remark: '',
        applyDataList: [
          {
            invoiceContent: invoiceContent,
            moneny: '0',
            amount: '0',
            taxAmount: '0.00'
          }
        ]
      })
    },
    // 删除已增加开票发票
    removeInvoice(index) {
      this.invoiceApplyForms.splice(index, 1)
      this.calculateTotalAmount()
    },
    handleBlurTaxAmount(val, index, index1) {
      if (val) {
        this.invoiceApplyForms[index].applyDataList[index1].taxAmount = String(parseFloat(val).toFixed(2))
      } else {
        this.invoiceApplyForms[index].applyDataList[index1].taxAmount = '0.00'
      }
    },
    // 根据含税金额计算金额和税额
    async calculateTaxAmount(val, index, index1) {
      const {
        data: { amount, tax }
      } = await calculateAmount({ amount: Number(val) })
      this.invoiceApplyForms[index].applyDataList[index1].amount = amount
      this.invoiceApplyForms[index].applyDataList[index1].tax = tax
      // 计算当前服务内容价税合计
      this.calculateTotalTaxAmount(index)
      this.calculateTotalAmount()
    },
    // 计算加税合计金额
    calculateTotalTaxAmount(index) {
      let currentInvoicetotalAmount = 0
      this.invoiceApplyForms[index].applyDataList.map(val => {
        currentInvoicetotalAmount = this.addCalc(currentInvoicetotalAmount, val['amount'], val['tax'])
      })
      this.invoiceApplyForms[index].totalAmount = currentInvoicetotalAmount
    },
    // 计算总额
    calculateTotalAmount() {
      // 计算底部总额totalAmount
      let totalAmount = 0
      this.invoiceApplyForms.map(item => {
        totalAmount += item.totalAmount
      })
      this.invoiceAmountData.invoiceAmountAndTax = totalAmount
      this.invoiceAmountData.currentInvoiceAmount = totalAmount
      this.invoiceAmountData.invoiceTotalAmount = this.source === 'bill' ? this.invoiceAmountData.invoiceTotalAmount : totalAmount
      this.invoiceAmountData.differenceAmount = this.source === 'bill' ? (this.invoiceAmountData.invoiceTotalAmount - totalAmount).toFixed(2) : 0
    },
    handleSubmit() {
      this.$refs.deliveryForm.validate(async valid => {
        let hasServiceContent = true
        // 校验新增开票金额是否为0
        let isLegal = true
        this.invoiceApplyForms.map(item => {
          if (item.applyDataList && item.applyDataList.length) {
            item.applyDataList.map(item1 => {
              if (!Number(item1.taxAmount)) {
                isLegal = false
              }
              if (!item1.invoiceContent) {
                hasServiceContent = false
              }
            })
          }
        })
        if (!hasServiceContent) {
          this.$message.warning('服务名称不能为空')
          return
        }
        if (!isLegal) {
          this.$message.warning('开票金额不能为0')
          return
        }
        if (valid) {
          const data = {
            province: this.deliveryForm.cityArray[0],
            city: this.deliveryForm.cityArray[1],
            county: this.deliveryForm.cityArray[2],
            street: this.deliveryForm.address,
            name: this.deliveryForm.personName,
            mobile: this.deliveryForm.personPhone,
            invoiceApplyForms: this.invoiceApplyForms
          }
          if (this.source === 'bill') {
            data.billNos = this.billNos 
          }
          const { code } = this.source === 'bill' ? await createInvoice(data) : await createPreInvoiceInfo(data)
          if (code === 0) {
            this.$message({
              message: '开票成功',
              type: 'success'
            })
            this.$router.replace({ name: 'InvoiceManage' })
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss">
@import '@/styles/mixin';
@include b(submit-invoice) {
  @include e(warning) {
    width: 100%;
    height: 60px;
    line-height: 36px;
    background-color: white;
    border-radius: 5px;
    padding: 11px 20px;
    box-sizing: border-box;
    margin-bottom: 15px;
  }
  @include b(invoice) {
    @include e(card) {
      width: 978px;
      margin: 0 auto 6px;
      background-image: url('../../../../assets/images/invoice-bg.png');
      background-position: -9px -6px;
      background-repeat: no-repeat;
      background-size: 102% 103%;
      overflow: visible;
      .el-card__body {
        padding: 35px;
        box-sizing: border-box;
      }
      @include e(type) {
        text-align: center;
        line-height: 50px;
        cursor: pointer;
        position: relative;
        @include m(delete) {
          width: 40px;
          height: 40px;
          position: absolute;
          right: -42px;
          top: -55px;
          background: url('../../../../assets/images/icon_close.png');
          background-position: -5px -5px;
          border-radius: 50%;
          box-shadow: 0px 0px 3px 0px rgba(221, 221, 221, 1);
          cursor: pointer;
        }
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
            .el-form-item__label,
            .el-form-item__content {
              font-size: 12px;
              color: #606266;
            }
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
          .el-input {
            height: 50px;
            width: 794px;
            .el-input__inner {
              border: none;
              height: 50px;
            }
          }
        }
      }
    }
  }
  @include b(add) {
    margin-bottom: 24px;
    @include e(img) {
      height: 62px;
      line-height: 62px;
      text-align: center;
      font-weight: 100;
      background-image: url('../../../../assets/images/add-invoice.png');
      background-repeat: no-repeat;
      background-size: 100% 100%;
      width: 987px;
      cursor: pointer;
      margin: 0 auto;
    }
  }
  @include b(delivery) {
    width: 987px;
    margin: 45px auto;
    .el-form-item {
      margin-bottom: 0;
    }
  }
}
@include b(invoice-count) {
  width: 800px;
  .el-form-item {
    margin-bottom: 0;
    margin-right: 50px;
    .el-form-item__label,
    .el-form-item__content {
      line-height: 25px;
    }
  }
}
</style>
