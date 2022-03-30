<template>
  <dialog-container
    :ref="DIALOG_REF"
    title="视频/图片"
    width="1200px"
    class="dialog-show-pic"
  >
    <div class="photo-box" v-if="photoUrls.length">
      <div
        class="photo-item"
        v-for="(photo, index) in photoUrls"
        :key="photo.url"
      >
        <img :src="photo.url" @click="showImg(index)" />
        <el-button
          style="width: 80px"
          type="primary"
          @click="downloadFileFromOss([photo.internalUrl], photo.name)"
        >
          下载
        </el-button>
      </div>
    </div>
    <div class="video-box" v-if="contributeVideo.url">
      <video :src="contributeVideo.url" controls></video>
    </div>
    <el-image-viewer
      v-if="showViewer"
      :initial-index="initialIndex"
      :url-list="imgList"
      :z-index="10000"
      :on-close="closeViewer"
    />
  </dialog-container>
</template>
<script>
import Dialog from '@/mixin/Dialog'
import { getUrlByInternalUrl } from '@/utils/oss/utils/get-url-from-internal-url'
import { downloadFileFromOss } from '@/utils/oss/utils/download-file-from-oss'
import ElImageViewer from 'element-ui/packages/image/src/image-viewer'
export default {
  name: 'DialogShowPic',
  mixins: [Dialog],
  components: {
    ElImageViewer
  },
  data() {
    return {
      photoUrls: [],
      contributeVideo: {
        url: ''
      },
      showViewer: false,
      initialIndex: 0,
      imgList: []
    }
  },
  methods: {
    updateView(row) {
      this.photoUrls = []
      this.contributeVideo = {
        url: ''
      }
      row.photoUrls.length &&
        getUrlByInternalUrl(
          row.photoUrls.map(url => {
            return {
              internalUrl: url
            }
          })
        ).then(res => {
          this.photoUrls = res
        })

      row.contributeVideo &&
        getUrlByInternalUrl([{ internalUrl: row.contributeVideo }]).then(
          res => {
            this.contributeVideo = (res.length && res[0]) || { url: '' }
          }
        )

      this.showDialog()
    },
    downloadFileFromOss(internalUrls, name) {
      downloadFileFromOss(internalUrls, name)
    },
    showImg(initialIndex) {
      this.initialIndex = initialIndex
      this.imgList = this.photoUrls.map(item => item.url)
      this.showViewer = true
    },
    closeViewer() {
      this.showViewer = false
    }
  }
}
</script>
<style lang="scss" scoped>
.dialog-show-pic {
  .photo-box {
    display: flex;
    flex-wrap: wrap;
    .photo-item {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      height: 300px;
      margin-right: 30px;
      margin-bottom: 30px;
      img {
        width: 200px;
        height: 250px;
      }
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
