<template>
  <div class="upload-img-container">
    <div class="upload-img-content">
      <div class="upload-img">
        <div v-if="file" class="upload-img-box">
          <div class="upload-bg preview-img">
            <i v-if="!notUploadImg" class="el-icon-error" @click.stop="removeFile()" />
            <img :src="fileTypeIcon[fileType]" alt="" />
          </div>
          <!-- <div class="box-title">{{ file.name }}</div> -->
        </div>
        <div v-if="!file">
          <el-upload
            v-loading="loading"
            v-if="!notUploadImg"
            :auto-upload="false"
            :on-change="handleChange"
            :on-remove="removeFile"
            :show-file-list="false"
            :accept="acceptType"
            :disabled="disabled"
            class="upload-drag"
            drag
            action=""
            multiple
          >
            <div class="upload-bg" :class="{ uploadDisable: disabled }">
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
  </div>
</template>

<script>
import { fileTypeIcon } from '_c/UploadImgList/config'
import { fileType } from '@/utils/util'

export default {
  name: 'CommonUpload',
  model: {
    prop: 'file',
    event: 'inside-update'
  },
  props: {
    urlList: {
      // 图片列表
      type: [Array, String],
      default: () => {
        return []
      }
    },
    disabled: {
      // 是否禁用
      type: Boolean,
      default: false
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
    }
  },
  data() {
    return {
      lockUpload: false,
      loading: false,
      fileTypeIcon,
      file: null,
      fileType: ''
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
      this.fileType = fileType(file.name)
      console.log(this.fileType)
      console.log(fileTypeIcon)
      this.loading = true
      if (file.size <= 1024 * 1024 * this.limitSize) {
        this.file = file.raw
        this.loading = false
        this.lockUpload = true
        this.updateUrlList()
      } else {
        this.loading = false
        this.$message.error(`请上传不超过${this.limitSize}M的文件`)
      }
    },
    removeFile() {
      this.lockUpload = false
      this.file = null
      this.updateUrlList()
      this.$emit('on-remove', this.file)
    },
    updateUrlList() {
      this.$emit('on-update', this.file)
      this.$emit('inside-update', this.file)
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
  .uploadDisable {
    cursor: not-allowed;
  }
  .upload-img-content,
  .upload-img {
    display: flex;
    flex-wrap: wrap;
    .upload-img-box {
      max-width: 120px;
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
