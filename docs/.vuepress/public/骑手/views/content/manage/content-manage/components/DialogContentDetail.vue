<template>
  <dialog-container
    class="dialog-content-detail"
    :ref="DIALOG_REF"
    title="内容详情"
    width="600px"
    @closed="closeDialog"
    center
  >
    <div class="content-detail-list">
      <!-- 内容详情信息 start-->
      <div class="detail-item">
        <!-- 头像 -->
        <div class="detail-item__avatar">
          <el-avatar :src="headImg[0]" prop="headImg">
            {{ this.headImg }}
          </el-avatar>
        </div>
        <!-- 信息 -->
        <div class="detail-item__name">{{ row.nickname }}</div>
      </div>
      <!-- 创建时间 -->
      <div class="detail-item-date">
        {{ row.createdDate }}
      </div>
      <!-- end-->

      <!-- 图片 start-->
      <div class="detail-item-images">
        <div class="detail-item__content">{{ row.content }}</div>
        <div class="images-item__file">
          <file-preview :urlList="imagesArr || []" />
        </div>
      </div>
      <!-- end -->

      <!-- 相关值 start -->
      <div class="detail-item-value">
        <!-- 热力值 -->
        <div class="detail-item__hotVal">
          <span class="detail-item__hotValTitle">
            热力值：{{ row.hotValue }}
          </span>
        </div>
        <!-- 推荐值 -->
        <div class="detail-recommendedIndex">
          <span class="detail-item__recommendedIndexTitle">
            推荐值 {{ row.recommendedIndex }}
          </span>
        </div>
      </div>
      <!-- end -->

      <!-- 区域 start-->
      <div class="detail-item-region">
        <div class="detail-item__region" :class="region">
          {{ this.region }}
        </div>
      </div>
      <!-- end -->

      <!-- 浏 赞 评 start -->
      <div class="detail-item-brow-like-comm">
        <div class="detail-item__brow">
          <span class="brow-like-comm__text">浏</span>
          {{ row.browseNum }}
        </div>
        <div class="detail-item__brow">
          <span class="brow-like-comm__text">赞</span>
          {{ row.likesNum }}
        </div>
        <div class="detail-item__comm">
          <span class="brow-like-comm__text">评</span>
          {{ row.commentNum }}
        </div>
      </div>
      <!-- end -->
    </div>

    <template v-slot:footer class="el-dialog__footer center-button">
      <el-button
        type="primary"
        @click="handleDetailAudit"
        :disabled="isBtnDisabled"
      >
        审核
      </el-button>
      <el-button type="primary" @click="hideDialog">取消</el-button>
    </template>
    <dialog-content-detail-audit
      ref="DialogContentDetailAudit"
    ></dialog-content-detail-audit>
  </dialog-container>
</template>

<script>
import Table from '@/mixin/Table'
import Dialog from '@/mixin/Dialog'
import BasePage from '@/mixin/BasePage'
import { getContentMangeDetail, getAuditStatus } from '@/api/contentMange'
import FilePreview from '@components/FilePreview'
import DialogContentDetailAudit from './DialogContentDetailAudit.vue'

export default {
  name: 'DialogContentDetail', // 内容详情
  props: [],
  inject: ['fatherMethod'],
  components: { FilePreview, DialogContentDetailAudit },
  mixins: [Table, Dialog, BasePage],
  data() {
    return {
      row: {},
      imagesArr: [],
      region: '',
      status: '',
      headImg: ''
    }
  },
  computed: {
    isBtnDisabled() {
      let flag = true
      if (this.status === 0 || this.status === 4) {
        flag = false // 启用
      }
      return flag
    }
  },
  watch: {},
  mounted() {
    // this.findContentMangeDetailList()
  },
  methods: {
    updateView(row) {
      this.row = row
      this.id = this.row.id
      this.status = this.row.status
      this.findCommentMangeDetailList()
      this.showDialog()
    },
    // 获取内容管理-详情列表
    async findCommentMangeDetailList() {
      const res = await getContentMangeDetail(this.id)
      this.data = res.data
      this.imagesArr = this.data.images
      // const labelVosArr = this.data.labelVos
      // this.selectedLabelVosArr = labelVosArr.map(item => item.labelName)
      // // 转换数组形式
      // this.selectedLabelVosNumArr = this.selectedLabelVosArr.join()
      this.headImg = [this.data.headImg]
      this.status = this.data.status
      this.region = this.data.region
    },
    // 内容管理-获取内容审核状态是否开启，data返回true表示开启
    async findAuditStatus() {
      const res = await getAuditStatus({
        isOpenAudit: this.audit
      })
      console.log('内容审核状态开启res', res)
    },
    // 内容详情-审核
    handleDetailAudit() {
      this.$refs.DialogContentDetailAudit.updateView(this.id, this.status)
      this.hideDialog()
    },
    closeDialog() {
      this.fatherMethod()
      this.resetDialog()
    }
  }
}
</script>
<style scoped lang="scss">
.dialog-content-detail {
  .dialog-container .el-dialog__body {
  }
  .content-detail-list {
    position: relative;
    .detail-item-date {
      position: absolute;
      display: inline;
      width: 300px;
      padding-left: 56px;
      margin-top: -28px;
    }
    .detail-item {
      width: 300px;
      display: flex;
      flex-wrap: wrap;
      flex-direction: row;
      justify-content: flex-start;
      align-content: flex-start;
      .detail-item__info {
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        text-align: justify;
      }
      .detail-item__value {
        display: flex;
        flex-direction: row;
      }
      div {
        padding: 10px 5px;
      }
    }
    .detail-item-images {
      margin: 10px 0;
      .detail-item__content {
        padding-bottom: 10px;
      }
    }
    .detail-item-value {
      color: #cccccc;
      font-size: 14px;
      display: flex;
      flex-direction: row;
      .detail-recommendedIndex {
        // .detail-recommendedIndex-
        margin-left: 20px;
      }
    }
    .detail-item-region {
      display: flex;
      flex-direction: row;
      .detail-item__region {
        border: 1px solid #939393;
        border-radius: 5px;
        padding: 5px 10px;
        margin-top: 20px;
      }
    }
    .detail-item-brow-like-comm {
      display: flex;
      flex-direction: row;
      font-size: 12px;
      margin-top: 20px;
      div {
        margin-right: 20px;
      }
      .brow-like-comm__text {
        background-color: #aaaaaa;
        color: #ffffff;
        padding: 2px 2px;
        border-radius: 4px;
      }
    }
  }
}
</style>
