<template>
  <page-container>
    <block-container>
      <div class="top-title">资金账户</div>
      <div class="wallet-card-container">
        <fragment-wallet-card
          v-for="(item, idx) of walletList"
          :key="idx"
          :view="item.view"
          :main-color="item.mainColor"
          :sub-color="item.subColor"
          @withdraw="showDialogWithdraw"
        ></fragment-wallet-card>
      </div>
    </block-container>
    <search-form :list="searchList" @on-search="handleSearch" />
    <block-container>
      <XBTable
        title="交易记录"
        :columns="tableColumns"
        :data="tableData"
        :total="total"
        @on-page-change="handlePageChange"
      >
        <template v-slot:handle>
          <el-button
            v-if="checkPermission('accountInfo-export')"
            :disabled="!tableData.length"
            type="primary"
            plain
            @click="downloadList"
          >
            <i class="iconfont xbicon-download1"></i>导出数据
          </el-button>
        </template>
      </XBTable>
    </block-container>
    <dialog-withdraw ref="DialogWithdraw" :clientName="clientName" @after-withdraw-submit="fetchAllData" />
  </page-container>
</template>

<script>
import BasePage from '@/mixins/BasePage'
import Page from '@/mixins/Page'
import SearchForm from '_c/SearchForm'
import XBTable from '_c/XBTable'
import { downloadWalletFlow, getSubWalletList, getWalletFlowPage, walletCustomTypeList } from '@/apis/wallet'
import { getChannelColor, WalletList, WalletSearchList } from './config'
import FragmentWalletCard from './components/FragmentWalletCard'
import DialogWithdraw from './components/DialogWithdraw'
import { mapGetters } from 'vuex'
export default {
  name: 'Wallet',
  components: {
    DialogWithdraw,
    FragmentWalletCard,
    XBTable,
    SearchForm
  },
  mixins: [BasePage, Page, WalletList],
  data() {
    return {
      searchList: [],
      searchForm: {},
      total: 0,
      tableColumns: [],
      tableData: [],
      rawWalletList: [],
      clientName: ''
    }
  },
  computed: {
    walletList() {
      return this.rawWalletList.map(view => {
        const colors = getChannelColor(view.channel.value)
        return {
          mainColor: colors.mainColor,
          subColor: colors.subColor,
          view
        }
      })
    },
    ...mapGetters(['userProject'])
  },
  mounted() {
    this.fetchAllData()
  },
  methods: {
    fetchAllData() {
      this.getWalletList()
      this.getWalletCustomTypeList()
      this.fetchData()
    },
    fetchData() {
      getWalletFlowPage({
        ...this.searchForm,
        ...this.pages
      }).then(({ data }) => {
        this.tableData = data.records
        this.total = data.total
      })
    },
    handleSearch(searchForm) {
      this.searchForm = { ...searchForm }
      this.pages.current = 1
      this.fetchAllData()
    },
    handlePageChange(pages) {
      this.pages = pages
      this.fetchData()
    },
    downloadList() {
      downloadWalletFlow({ ...this.searchForm })
    },
    async getWalletCustomTypeList() {
      const { data } = await walletCustomTypeList()
      data &&
        data.map(item => {
          item.label = item.typeName
          item.value = item.walletFlowViewType
        })
      this.searchList = WalletSearchList
      this.searchList[1].option = data
    },
    getWalletList() {
      getSubWalletList().then(({ data }) => {
        this.clientName = data.clientName
        this.rawWalletList = data.subWallets
      })
    },
    showDialogWithdraw(view) {
      // 判断是否设置支付密码
      if (!this.userProject.hasPayPassword) {
        const h = this.$createElement
        this.$msgbox({
          title: '提示',
          message: h('p', { style: 'color: #e6a422' }, '您还未设置支付密码，请先设置后在操作提现'),
          showCancelButton: true,
          confirmButtonText: '去设置',
          cancelButtonText: '暂时不了',
          dangerouslyUseHTMLString: true
        })
          .then(() => {
            this.$router.push({ name: 'ResetPassword' })
          })
          .catch(() => {})
        return
      }
      this.$refs.DialogWithdraw.updateView(view)
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'common';
.top-title {
  display: flex;
  font-size: 16px;
  color: #333;
  line-height: 26px;
  font-weight: 700;
  margin-bottom: 15px;
}

.top-hint {
  border-color: #e6a422;
  display: flex;
  align-items: center;
  color: #e6a422;
  line-height: 28px;
  padding-top: 15px;
  padding-bottom: 15px;
  font-size: 14px;
  background-color: #fff4e5;
  .left-bar {
    background-color: #e6a422;
  }
  i {
    font-size: 28px;
    margin-right: 8px;
  }
  .client-name {
    color: #333;
  }
}

.wallet-card-container {
  display: flex;
  align-items: stretch;
  flex-wrap: wrap;
  margin-top: 25px;
  margin-bottom: -25px; // 如果换行正好就干掉了
  margin-right: -25px; // 如果太多正好就干掉了
  & > * {
    margin-right: 25px;
    margin-bottom: 25px;
  }
}
</style>
