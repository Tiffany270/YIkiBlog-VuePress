<template>
  <div>
    <ul class="file-list">
      <template v-for="(item, index) in fildUrlData">
        <li class="file-list__item" :key="index">
          <div class="item-img">
            <!-- 预览图片 -->
            <img
              v-if="item.fileUrl && item.fileUrl.indexOf('.pdf') > -1"
              src="./img/upload-pdf-01.png"
              class="item-img__pdf"
            />
            <img
              v-else-if="item.fileUrl && (item.fileUrl.indexOf('.zip') > -1 || item.fileUrl.indexOf('.rar') > -1)"
              src="./img/upload-zip.png"
              class="item-img__pdf"
            />
            <img
              v-else-if="
                (item.fileUrl && item.fileUrl.indexOf('.png') > -1) ||
                (item.fileUrl && item.fileUrl.indexOf('.jpg') > -1) ||
                (item.fileUrl && item.fileUrl.indexOf('.jpeg') > -1)
              "
              :src="item.fileUrl"
              alt=""
              class="item-img__images"
            />
            <!-- 遮罩操作 -->
            <span class="item-img__action" v-show="item.fileUrl">
              <!-- 预览 -->
              <i class="el-icon-zoom-in item-img__action--preview" @click="handlePreview(index)"></i>
            </span>
          </div>
          <div class="item-name" v-if="showName">{{ item.fileName || getUploadFileName(item.fileUrl) || '' }}</div>
        </li>
      </template>
      <li class="file-list__item" v-if="!fildUrlData.length">
        <div class="item-img">
          <img class="item-img__images" src="../../assets/images/icon-no-data.png" alt="" />
        </div>
      </li>
    </ul>
    <preview-big-img ref="PreviewBigImg" />
  </div>
</template>

<script>
import PreviewBigImg from '_c/PreviewBigImg/index'
import { getFileIdFromUrl } from '@/utils/oss-uploader/utilities/get-file-id-from-url'
import { getUploadFileName } from '@/utils/oss-uploader/utilities/get-upload-file-name'
import { getOssTempAccessUrl } from '@/apis/oss'
import { isImage } from '@/utils/util'
export default {
  name: 'FilePreviewList',
  components: { PreviewBigImg },
  props: {
    fileIdData: {
      type: Array,
      default: () => []
    },
    showName: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      fildUrlData: [],
      getUploadFileName
    }
  },
  watch: {
    fileIdData: {
      deep: true,
      immediate: true,
      handler(val) {
        val.length && this.getFileUrlByFileId()
      }
    }
  },
  methods: {
    // 根据fileId获取url和name
    async getFileUrlByFileId() {
      const promise = this.fileIdData.map(async item => {
        const tempObj = {
          fileName: item.fileName,
          fileUrl: ''
        }
        if (item.fileId) {
          const tempUrl = await getOssTempAccessUrl([item.fileId])
          tempObj.fileUrl = tempUrl.join()
        }
        return tempObj
      })
      Promise.all(promise).then(res => {
        this.fildUrlData = res.filter(item => item.fileUrl)
      })
    },
    async handlePreview(index) {
      const updateTempUrlList = await getOssTempAccessUrl(this.fileIdData.map(item => item.fileId))
      const filterOnlyImgList = []
      for (let i = 0; i < updateTempUrlList.length; i++) {
        const isPic = await isImage(updateTempUrlList[i])
        if (isPic) {
          filterOnlyImgList.push(updateTempUrlList[i])
        }
      }
      const isPic = await isImage(updateTempUrlList[index])
      if (!isPic) {
        window.open(updateTempUrlList[index], '_blank')
      } else {
        const fileId = getFileIdFromUrl(updateTempUrlList[index])
        this.$refs.PreviewBigImg.handleImgClick(
          filterOnlyImgList,
          filterOnlyImgList.findIndex(item => getFileIdFromUrl(item) === fileId)
        )
      }
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss">
@import '@/styles/mixin';
@include b(file-list) {
  display: flex;
  flex-wrap: wrap;
  @include e(item) {
    display: flex;
    flex-direction: column;
    width: 146px;
    margin-right: 15px;
    margin-bottom: 15px;
    @include b(item-img) {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 146px;
      height: 146px;
      border: 1px solid #c0ccda;
      border-radius: 5px;
      position: relative;
      box-sizing: border-box;
      margin-bottom: 5px;
      @include e(pdf) {
        width: 146px;
        height: 146px;
      }
      @include e(images) {
        width: 138px;
        height: 138px;
      }
      @include e(action) {
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
        line-height: 148px;
        @include m(preview) {
          font-size: 26px;
          color: #fff;
          cursor: pointer;
          margin-right: 15px;
        }
      }
    }
    @include b(item-name) {
      font-size: 12px;
      word-wrap: break-word;
      word-break: break-all;
      line-height: 1;
    }
  }
  .item-img:hover {
    .item-img__action {
      display: block;
    }
  }
}
</style>
