<template>
  <dialog-container
    :ref="DIALOG_REF"
    title="查看详情"
    width="600px"
    @closed="resetDialog"
    class="suggestion-show-detail"
  >
    <div class="detail-list">
      <div class="detail-item">
        <div class="detail-item_name">
          用户名称: {{ suggestiondetail.nickName }}
        </div>
      </div>
      <div class="detail-item">
        <div class="detail-item_mobile">
          手机号码：{{ suggestiondetail.mobile }}
        </div>
      </div>
      <div class="detail-item">
        反馈标签：
        <div
          class="detail-item_feedback"
          v-for="(item, index) in feedbackTypeslist"
          :key="index"
        >
          {{ item }}
        </div>
      </div>
      <div class="detail-item">
        <div class="detail-item_question">
          问题描述：{{ suggestiondetail.feedbackDescription }}
        </div>
      </div>
      <div class="detail-item">
        <span style="flex: 2">问题截图：</span>
        <div class="photo-box" v-if="photoarr.length">
          <div
            class="photo-item"
            v-for="(photo, index) in photoarr"
            :key="index"
          >
            <img :src="photo" @click="showImg(index)" />
          </div>
        </div>
        <el-image-viewer
          v-if="showViewer"
          :initial-index="initialIndex"
          :url-list="imgList"
          :z-index="10000"
          :on-close="closeViewer"
        />
      </div>
    </div>

    <template v-slot:footer>
      <el-button type="primary" @click="hideDialog()">关闭</el-button>
    </template>
  </dialog-container>
</template>
<script>
import Dialog from '@/mixin/Dialog'
import ElImageViewer from 'element-ui/packages/image/src/image-viewer'
import { findOssTempAccessUrl } from '@/api/suggestion'
export default {
  mixins: [Dialog],
  components: {
    ElImageViewer
  },
  data() {
    return {
      suggestiondetail: {},
      suggsetiondetailId: '',
      photolist: [],
      photoarr: [],
      showViewer: false,
      initialIndex: 0,
      imgList: [],
      feedbackTypeslist: []
    }
  },
  methods: {
    updateView(row) {
      this.suggestiondetail = row
      this.feedbackTypeslist = this.getfeedbackTypeslist(this.suggestiondetail)
      console.log(this.suggestiondetail.photos, 'this.suggestiondetail.photos')
      findOssTempAccessUrl({ internalUrls: this.suggestiondetail.photos }).then(
        res => {
          const data = res.data
          console.log(data)
          for (let i of this.suggestiondetail.photos) {
            this.photoarr.push(data[i]['url'])
          }
        }
      )
      this.showDialog()
    },
    showImg(initialIndex) {
      this.initialIndex = initialIndex
      this.imgList = this.photoarr.map(item => item)
      this.showViewer = true
    },
    closeViewer() {
      this.showViewer = false
    },
    getfeedbackTypeslist(data) {
      var a = data.feedbackTypesString.split(',')
      return a
    }
  }
}
</script>
<style lang="scss" scoped>
.suggestion-show-detail {
  .photo-box {
    display: flex;
    flex-wrap: wrap;
    flex: 13;
    max-height: 250px;
    overflow: auto;
    .photo-item {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      margin-right: 20px;
      margin-bottom: 10px;
      img {
        width: 90px;
        height: 90px;
      }
    }
  }
  .detail-item {
    display: flex;
    padding: 15px 1px 15px 10px;
    .detail-item_feedback {
      height: 24px;
      font-size: 14px;
      text-align: center;
      width: 68px;
      border-radius: 3px;
      line-height: 24px;
      margin-left: 25px;
      border: 1px solid grey;
    }
  }
  .video-box {
    video {
      width: 1160px;
      height: 600px;
    }
  }
}
</style>
