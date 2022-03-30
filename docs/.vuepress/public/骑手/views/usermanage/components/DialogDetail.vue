<template>
  <dialog-container
    :ref="DIALOG_REF"
    title="用户详情"
    width="1000px"
    class="dialog-detail"
  >
    <div class="dialog-container">
      <styled-title>个人基本信息</styled-title>
      <info-list :labelData="labelData" :data="data">
        <template #zhengmian="{ data: { zhengmian } }">
          <img
            class="card-img"
            :src="zhengmian"
            alt=""
            @click="showImg(zhengmian)"
          />
        </template>
        <template #fanmian="{ data: { fanmian } }">
          <img
            class="card-img"
            :src="fanmian"
            alt=""
            @click="showImg(fanmian)"
          />
        </template>
      </info-list>
      <styled-title>用户相关内容</styled-title>
      <div class="table-container">
        <xb-table
          :columns="contentColumns"
          :data="contentData"
          :has-page="false"
          max-height="108"
          has-border
        ></xb-table>
      </div>
      <styled-title>用户相关附件</styled-title>
      <div class="table-container">
        <xb-table
          :columns="appendixColumns"
          :data="appendixData"
          :has-page="false"
          has-border
        ></xb-table>
      </div>
    </div>
    <image-viewer ref="ImageViewer" />
  </dialog-container>
</template>
<script>
import Dialog from '@/mixin/Dialog'
import Table from '@/mixin/Table'
import StyledTitle from '@/components/StyledTitle'
import InfoList from '@/components/InfoList'
import ImageViewer from '@/components/ImageViewer'
import { contentColumns, appendixColumns } from './config'

export default {
  name: 'DialogDetail',
  mixins: [Dialog, Table],
  components: {
    StyledTitle,
    InfoList,
    ImageViewer
  },
  data() {
    return {
      labelData: [
        {
          label: '姓名',
          key: 'name'
        },
        {
          label: '性别',
          key: 'sex'
        },
        {
          label: '身份证号码',
          key: 'cardNo'
        },
        {
          label: '手机号码',
          key: 'mobile'
        },
        {
          label: '身份证正面',
          key: 'zhengmian',
          slot: 'zhengmian'
        },
        {
          label: '身份证反面',
          key: 'fanmian',
          slot: 'fanmian'
        },
        {
          label: '联系地址',
          key: 'address'
        }
      ],
      data: {
        name: '张三',
        sex: '女',
        cardNo: '421************722',
        mobile: '155****2778',
        zhengmian: 'https://sys.anquancloud.cn/upload/06/1588316849579.png',
        fanmian: 'https://sys.anquancloud.cn/upload/06/1588316849579.png',
        address: '广东省广州市'
      },
      contentColumns,
      contentData: [{}],
      appendixColumns: [],
      appendixData: [{ yulan: 22 }]
    }
  },
  created() {
    this.appendixColumns = appendixColumns(this)
  },
  methods: {
    updateView() {
      this.showDialog()
    },
    showImg(url) {
      const imgList = [url]
      this.$refs.ImageViewer.viewImg(imgList)
    },
    dowloadFile() {}
  }
}
</script>
<style lang="scss" scoped>
.dialog-detail {
  .dialog-container {
    .styled-title {
      margin: 30px 0 20px;
    }
    .card-img {
      width: 158px;
      height: 100px;
      cursor: pointer;
    }
    .table-container {
      padding: 0 20px;
    }
  }
}
</style>
