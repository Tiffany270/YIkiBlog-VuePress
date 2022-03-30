<template>
  <div class="file-preview">
    <!-- 展示列表 -->
    <ul class="file-list">
      <template v-for="(url, index) in urlList">
        <li :key="url" class="file-item">
          <div class="file-item__img">
            <!-- 展示缩略图 -->
            <img
              :src="getShowImg(url)"
              alt=""
              :class="{
                'is-real-img':
                  getShowImg(url).indexOf('.png') > -1 ||
                  getShowImg(url).indexOf('.jpg') > -1 ||
                  getShowImg(url).indexOf('.jpeg') > -1
              }"
            />
            <!-- 操作遮罩 -->
            <div class="file-item__img--action" v-show="url">
              <i
                v-show="
                  (url && getShowImg(url).indexOf('.png') > -1) ||
                  getShowImg(url).indexOf('.jpg') > -1 ||
                  getShowImg(url).indexOf('.jpeg') > -1 ||
                  url.indexOf('.pdf') > -1
                "
                class="iconfont icon-nav-display"
                @click="handlePreview(index)"
              ></i>
              <i class="el-icon-download" @click="handleDownload(url)"></i>
            </div>
          </div>
          <!-- 文件名称 -->
          <div class="file-item__name">{{ getUploadFileName(url) }}</div>
        </li>
      </template>
    </ul>
    <!-- 预览 -->
    <div class="image-view">
      <el-image-viewer
        v-if="showViewer"
        :on-close="closeViewer"
        :initial-index="initialIndex"
        :url-list="imgList"
        :z-index="10000"
      />
    </div>
  </div>
</template>

<script>
import icon_preview_pdf from '@/assets/images/icon-preview-pdf@2x.png'
import icon_preview_doc from '@/assets/images/icon-preview-doc@2x.png'
import icon_preview_xls from '@/assets/images/icon-preview-xls@2x.png'
import icon_preview_zip from '@/assets/images/icon-preview-zip@2x.png'
import {
  getUploadFileName,
  getExtNameFromUrl,
  getOssTempAccessUrl,
  getInternalUrlFromTempUrl
} from '@/utils/oss/index'
import ElImageViewer from 'element-ui/packages/image/src/image-viewer'
import { isImage } from '@/utils/util'
import { downloadFileFromOss } from '@utils/oss'
export default {
  name: 'FilePreview',
  components: {
    ElImageViewer
  },
  props: {
    urlList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      getUploadFileName,
      // 预览的图片列表
      imgList: [],
      // 指定当前预览的为第一张
      initialIndex: 1,
      showViewer: false
    }
  },

  methods: {
    getShowImg(url) {
      let fileType = getExtNameFromUrl(url)
      let res = ''
      switch (fileType) {
        case '.pdf':
          res = icon_preview_pdf
          break
        case '.zip':
          res = icon_preview_zip
          break
        case '.rar':
          res = icon_preview_zip
          break
        case '.doc':
          res = icon_preview_doc
          break
        case '.docx':
          res = icon_preview_doc
          break
        case '.xlsx':
          res = icon_preview_xls
          break
        case '.xls':
          res = icon_preview_xls
          break
        case '.png':
          res = url
          break
        case '.jpg':
          res = url
          break
        case '.jpeg':
          res = url
          break
        default:
          res = ''
          break
      }
      return res
    },
    async handlePreview(index) {
      /**
       * 思路：筛选url => 图片-预览，其他文件浏览器打开
       */
      // 根据旧的url获取最新的临时url
      const newTempUrlList = await getOssTempAccessUrl(this.urlList)
      // 把图片筛选出来
      const imgList = []
      for (let i = 0; i < newTempUrlList.length; i++) {
        const isPic = await isImage(newTempUrlList[i])
        if (isPic) {
          imgList.push(newTempUrlList[i])
        }
      }
      // 当前预览的是不是图片
      const isCurrentPic = await isImage(newTempUrlList[index])
      if (!isCurrentPic) {
        // 不是图片浏览器打开
        window.open(newTempUrlList[index], '_blank')
      } else {
        // 图片直接预览
        // 确定当前预览图片在图片列表中的位置 => 比对fileId
        const currentFileId = getInternalUrlFromTempUrl(newTempUrlList[index])
        this.imgList = imgList
        this.initialIndex = imgList.findIndex(
          item => getInternalUrlFromTempUrl(item) === currentFileId
        )
        this.showViewer = true
      }
    },
    closeViewer() {
      this.showViewer = false
    },
    handleDownload(url) {
      downloadFileFromOss([url])
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss">
.file-preview {
  .file-list {
    display: flex;
    flex-wrap: wrap;
    .file-item {
      display: flex;
      flex-direction: column;
      width: 124px;
      margin-right: 15px;
      margin-bottom: 15px;
      &__img {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 124px;
        height: 124px;
        border: 1px solid #c0ccda;
        border-radius: 5px;
        position: relative;
        box-sizing: border-box;
        margin-bottom: 5px;
        img {
          width: 100px;
          // height: 100px;
          border-radius: 5px;
        }
        .is-real-img {
          width: 124px;
          height: 124px;
        }
        &--action {
          display: none;
          width: 100%;
          height: 100%;
          position: absolute;
          border-radius: 5px;
          left: 0;
          top: 0;
          background: #000;
          opacity: 0.6;
          text-align: center;
          line-height: 124px;
          i {
            font-size: 26px;
            color: #fff;
            cursor: pointer;
            margin-right: 15px;
          }
        }
      }
      &__name {
        font-size: 12px;
        word-wrap: break-word;
        word-break: break-all;
        line-height: 1.5;
      }
      &:hover {
        .file-item__img--action {
          display: block;
        }
      }
    }
  }
}
</style>
