<template>
  <div class="upload-img-container">
    <div class="upload-img-content">
      <div class="upload-img">
        <div v-for="(item, index) in displayUrlList" :key="index" class="upload-img-box">
          <div class="upload-bg preview-img">
            <i v-if="!notUploadImg" class="el-icon-error" @click.stop="removeFile(index)" />
            <img
              :src="fileTypeIcon[getExtNameFromUrl(item)] ? fileTypeIcon[getExtNameFromUrl(item)].icon : item"
              alt=""
            />
            <div class="upload-bg-back" @click="showPreviewBigImg(item, index)">
              <i class="el-icon-zoom-in" />
            </div>
          </div>
          <div class="box-title">{{ getUploadFileName(item) }}</div>
        </div>
        <div v-if="displayUrlList.length < limitCount">
          <el-upload
            v-loading="loading"
            v-if="!notUploadImg"
            :auto-upload="false"
            :on-change="handleChange"
            :show-file-list="false"
            :accept="acceptType"
            class="upload-drag"
            drag
            action=""
            multiple
          >
            <div class="upload-bg">
              <img class="upload-cloud" src="./img/icon_cloud.png" alt="" />
              <div class="upload-tips">拖拽或<span>点击上传</span></div>
            </div>
          </el-upload>
          <div v-if="hint" class="box-title hint">
            {{ hint }}
          </div>
        </div>
      </div>
    </div>
    <preview-big-img ref="PreviewBigImg" />
  </div>
</template>

<script>
import PreviewBigImg from '@/components/PreviewBigImg/index'
import { fileTypeIcon } from '_c/UploadImgList/config'
import { OSSFileTypeEnum } from '@/maps/enums/OSSFileType'
import { getOssTempAccessUrl } from '@/apis/oss'
import { isImage } from '@/utils/util'
import { ossUploader } from '@/utils/oss-uploader'
import { getUploadFileName } from '@/utils/oss-uploader/utilities/get-upload-file-name'
import { getExtNameFromUrl } from '@/utils/oss-uploader/utilities/get-ext-name-from-url'
import { getFileIdFromUrl } from '@/utils/oss-uploader/utilities/get-file-id-from-url'

export default {
  name: 'UploadImgList',
  components: { PreviewBigImg },
  model: {
    prop: 'urlList',
    event: 'update'
  },
  props: {
    urlList: {
      // 图片列表
      type: [Array, String],
      default: () => {
        return []
      }
    },
    hint: {
      // 上传的格式提示
      type: String,
      default: ''
    },
    acceptType: {
      // 上传接受的类型
      type: String,
      default: 'image/*'
    },
    notUploadImg: {
      // 不可以上传
      type: Boolean,
      default: false
    },
    limitCount: {
      // 上传限制的张数
      type: [Number, String],
      default: 9
    },
    limitSize: {
      // 限制上传文件的大小
      type: Number,
      default: 10
    },
    ossFileType: {
      // 上传oss的类型
      type: String,
      default: '',
      validator(val) {
        return Object.values(OSSFileTypeEnum).includes(val)
      }
    }
  },
  data() {
    return {
      lockUpload: false,
      loading: false,
      fileTypeIcon,
      getUploadFileName,
      getExtNameFromUrl
    }
  },
  watch: {
    displayUrlList: {
      deep: true,
      immediate: true,
      async handler() {
        this.lockNumber = this.displayUrlList.length
      }
    }
  },
  computed: {
    displayUrlList() {
      if (Array.isArray(this.urlList)) {
        return this.urlList
      } else if (typeof this.urlList === 'string' && this.urlList) {
        return [this.urlList]
      } else {
        return []
      }
    }
  },
  methods: {
    handleChange(file) {
      // 判断文件类型是否匹配
      const fileName = file.name.substring(file.name.lastIndexOf('.') + 1)
      const typeList = this.acceptType.split(',')
      let tempStr = ''
      typeList.map(item => {
        if (item === 'image/*') {
          tempStr += '.tig,.pjp,.xbm,.jxl,.jpg,.jpeg,.ico,.tiff,.gif,.svg,.svgz,.jfif,.webp,.png,.bmp,.pjpeg,.avif'
        } else {
          tempStr += item
        }
      })
      getExtNameFromUrl()
      const extension = tempStr.includes(fileName)
      if (!extension) {
        return this.$message.warning('请上传类型符合的文件')
      }
      // 正常上传
      if (file.size <= 1024 * 1024 * this.limitSize) {
        this.lockNumber++
        if (this.lockNumber <= this.limitCount || this.lockUpload) {
          this.loading = true
          ossUploader(file.raw, this.ossFileType)
            .then(tempUrl => {
              if (this.displayUrlList.length < this.limitCount) {
                this.displayUrlList.push(tempUrl)
                this.loading = false
                this.updateUrlList()
              }
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          this.$msgbox({
            title: '提醒',
            message: `最多只能导入${this.limitCount}张文件，已为您导入！请检查附件内容`
          }).then(() => {
            this.lockUpload = true
          })
        }
      } else {
        this.$message.error(`请上传不超过${this.limitSize}M的文件`)
      }
    },
    removeFile(index) {
      this.displayUrlList.splice(index, 1)
      this.lockUpload = false
      this.updateUrlList()
    },
    updateUrlList() {
      this.$emit(
        'update',
        this.limitCount === 1 ? (this.displayUrlList.length ? this.displayUrlList[0] : null) : this.displayUrlList
      )
    },
    async showPreviewBigImg(tempUrl, index) {
      const updateTempUrlList = await getOssTempAccessUrl(this.displayUrlList)
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

<style lang="scss" scoped>
@import '~@/styles/variable.scss';

.upload-img-container {
  max-width: 450px;
  .box-title {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    line-height: 22px;
    color: #666666;
    text-align: left;
    &.hint {
      margin-top: -8px;
    }
  }
  .upload-img-content,
  .upload-img {
    display: flex;
    flex-wrap: wrap;
    .upload-img-box {
      max-width: 120px;
      margin: 0 30px 30px 0;
    }
    /deep/ .el-upload-dragger {
      width: 120px !important;
      height: 120px !important;
      border: 1px dashed #dcdfe6;
    }
    .upload-bg {
      background: #f5f7fa;
      border-radius: 4px;
      width: 120px;
      height: 120px;
      font-size: 14px;
      color: #666666;
      margin: 0 30px 5px 0;
      .upload-cloud {
        width: 54px;
        height: 54px;
        background-size: 100%;
        margin-top: 10px;
      }
      .upload-tips {
        font-size: 12px;
        margin-top: -10px;
        span {
          color: $color-blue;
        }
      }
      img {
        width: calc(100% - 12px);
        height: calc(100% - 12px);
        object-fit: cover;
        padding: 6px;
      }
      &.preview-img {
        position: relative;
        margin-right: 30px;
        border: 1px solid rgba(0, 0, 0, 0.15);
        background-color: transparent;
        .el-icon-error {
          position: absolute;
          right: -10px;
          top: -10px;
          font-size: 18px;
          cursor: pointer;
          z-index: 100;
        }
        &:hover {
          .upload-bg-back {
            display: block;
            cursor: pointer;
          }
        }
      }
      &:nth-child(3n) {
        margin-right: 0;
      }
    }
    .upload-bg-back {
      display: none;
      border-radius: 4px;
      width: 120px;
      height: 120px;
      line-height: 120px;
      background: #333333;
      opacity: 0.7;
      position: absolute;
      left: 0;
      top: 0;
      color: #fff;
      font-size: 18px;
      text-align: center;
      .el-icon-zoom-in {
        cursor: pointer;
      }
    }
  }
}
</style>
