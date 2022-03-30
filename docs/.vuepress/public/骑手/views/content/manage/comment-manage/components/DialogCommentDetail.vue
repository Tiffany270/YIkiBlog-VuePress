<template>
  <dialog-container
    class="dialog-comment-detail"
    :ref="DIALOG_REF"
    title="评论详情"
    width="600px"
    @closed="resetDialog"
    center
  >
    <!-- 评论详情 -->
    <div
      class="content-detail-list"
      style="border-bottom: 1px solid rgb(209 213 228)"
    >
      <!-- 详情信息 start-->
      <div class="detail-item">
        <!-- 头像 -->
        <div class="detail-item__avatar">
          <el-avatar :src="headImg[0]" prop="headImg">
            {{ this.headImg }}
          </el-avatar>
        </div>
        <!-- 信息 -->
        <div class="detail-item__name">{{ this.nickname }}</div>
        <div class="detail-item__label">
          {{ this.region }}
        </div>
      </div>
      <!-- 创建时间 -->
      <div class="detail-item-date">
        {{ this.createdDate }}
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
    </div>

    <!-- 评论者信息 -->
    <div class="content-detail-list">
      <!-- 评论者信息 start-->
      <div class="detail-item">
        <!-- 头像 -->
        <div class="detail-item__avatar">
          <el-avatar :src="reviewerHeadImg[0]" prop="reviewerHeadImg">
            {{ this.reviewerHeadImg }}
          </el-avatar>
        </div>
        <div class="detail-item__name">{{ this.reviewerNickname }}</div>
        <div class="detail-item__label">
          {{ this.region }}
        </div>
        <!-- 赞start -->
        <div class="detail-item__brow_likeNum">
          <span class="brow-like-comm__text">赞</span>
          {{ this.commentLike }}
        </div>
        <!-- end -->
      </div>
      <!-- end-->

      <!-- 评论内容comment start-->
      <div class="detail-item-images">
        <div class="detail-item__content">{{ this.comment }}</div>
      </div>
      <!-- end -->

      <!-- 评论时间 start -->
      <div class="detail-item-value">
        <div class="detail-item__hotVal">
          <span class="detail-item__hotValTitle">
            {{ this.commentDate }}
          </span>
        </div>
      </div>
      <!-- end -->
    </div>

    <template v-slot:footer class="el-dialog__footer center-button">
      <el-button type="primary" @click="hideDialog">关闭</el-button>
    </template>
  </dialog-container>
</template>

<script>
import Table from '@/mixin/Table'
import Dialog from '@/mixin/Dialog'
import BasePage from '@/mixin/BasePage'
import { getCommentMangeDetail } from '@/api/contentMange'
import FilePreview from '@components/FilePreview'
export default {
  name: 'DialogCommentDetail', // 评论详情
  props: [],
  components: { FilePreview },
  mixins: [Table, Dialog, BasePage],
  data() {
    return {
      row: {},
      imagesArr: [], // 图片
      reviewerNickname: '',
      region: '',
      comment: '',
      commentDate: '',
      createdDate: '',
      commentLike: '',
      headImg: '',
      reviewerHeadImg: '',
      nickname: ''
    }
  },
  computed: {},
  watch: {},
  mounted() {
    // this.findCommentMangeDetailList()
  },
  methods: {
    updateView(row) {
      this.row = row
      this.id = this.row.id
      this.findCommentMangeDetailList()
      this.showDialog()
    },
    // 获取评论管理-详情
    async findCommentMangeDetailList() {
      const res = await getCommentMangeDetail(this.id)
      this.data = res.data
      this.imagesArr = this.data.images
      this.reviewerNickname = this.data.reviewerNickname
      this.nickname = this.data.nickname
      this.region = this.data.region
      this.comment = this.data.comment
      this.commentDate = this.data.commentDate
      this.createdDate = this.data.createdDate
      this.commentLike = this.data.commentLike
      this.headImg = [this.data.headImg]
      this.reviewerHeadImg = [this.data.reviewerHeadImg]
    }
  }
}
</script>
<style scoped lang="scss">
.dialog-comment-detail {
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
    .detail-item__avatar {
      float: left;
    }
    .detail-item {
      display: flex;
      flex-wrap: wrap;
      flex-direction: row;
      justify-content: flex-start;
      align-content: flex-start;
      .detail-item__info {
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
      }
      // .detail-item__date {
      //   align-self: flex-end;
      // }
      .detail-item__value {
        display: flex;
        flex-direction: row;
      }
      .detail-item__brow_likeNum {
        font-size: 12px;
        justify-content: space-between;
        padding-left: 310px;
        .brow-like-comm__text {
          // background-color: #aaaaaa;
          border: 1px solid #000000;
          color: #000000;
          padding: 0px 2px;
          // border-radius: 4px;
        }
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
        margin-left: 20px;
      }
    }
    .detail-item-label {
      display: flex;
      flex-direction: row;
      .detail-item__labelName {
        border: 1px solid #939393;
        border-radius: 5px;
        padding: 5px 10px;
        margin-top: 20px;
      }
    }
    .detail-item-brow-like-comm {
      // display: flex;
      // flex-direction: row;
      // font-size: 12px;
      // margin-top: 20px;
      div {
        margin-right: 20px;
      }
      // .brow-like-comm__text {
      //   // background-color: #aaaaaa;
      //   border: 1px solid #000000;
      //   color: #000000;
      //   padding: 2px 2px;
      //   // border-radius: 4px;
      // }
    }
  }
}
</style>
