<template>
  <div class="file-uploader">
    <!-- 按钮上传 -->
    <div class="file-uploader__button" v-if="showType === UploadTypesEnum.BUTTON">
      <el-upload
        class="upload-button"
        action=""
        :accept="acceptType"
        :auto-upload="false"
        :show-file-list="false"
        :on-change="handleChange"
      >
        <el-button size="mini" type="primary" plain>
          <i class="iconfont xbicon-Import"></i> {{ buttonText ? buttonText : '导入' }}</el-button
        >
      </el-upload>
    </div>
    <!-- 图片和PDF上传，预览 -->
    <div class="file-uploader__preview" v-else-if="showType === UploadTypesEnum.PREVIEW">
      <ul class="file-list" v-if="onlyNeedUrl">
        <li class="file-list__item" v-for="(item, index) in fileList" :key="index">
          <!-- 预览图片 -->
          <img v-if="item && item.indexOf('.pdf') > -1" src="./img/upload-pdf-01.png" class="file-list__item--pdf" />
          <img
            v-else-if="item && (item.indexOf('.zip') > -1 || item.indexOf('.rar') > -1)"
            src="./img/upload-zip.png"
            class="file-list__item--pdf"
          />
          <img
            v-else-if="item && (item.indexOf('.xls') > -1 || item.indexOf('xlsx') > -1)"
            src="./img/excel.png"
            class="file-list__item--pdf"
          />
          <img v-else :src="item" alt="" class="file-list__item--img" />
          <!-- 遮罩操作 -->
          <span class="file-list__item--action">
            <!-- 预览 -->
            <i class="el-icon-zoom-in file-list__item--preview" @click="handlePreview(fileList, item)"></i>
            <i class="el-icon-delete file-list__item--delete" @click="handleRemove(index)"></i>
          </span>
        </li>
        <el-upload
          class="upload-preview"
          action=""
          drag
          :auto-upload="false"
          :show-file-list="false"
          :accept="acceptType"
          :disabled="fileList.length >= limitCount"
          :on-change="handleChange"
        >
          <div class="upload-preview__img">
            <img src="./img/upload-png.png" alt="" style="width: 60px; height: 60px" />
            <img src="./img/upload-pdf-02.png" alt="" style="width: 60px; height: 60px" />
          </div>
          <div class="upload-preview__text">
            <div class="upload-preview__text--tip" style="margin-bottom: 10px">
              拖拽或<em style="color: #03a92c">点击上传</em>
            </div>
            <div class="upload-preview__text--tip" style="font-size: 12px">
              {{ acceptTip ? acceptTip : '仅支持.jpg，.jpeg，.png，.gif，.pdf，zip格式文件' }}
            </div>
          </div>
        </el-upload>
      </ul>
      <ul class="file-list" v-else>
        <li class="file-list__item" v-for="(item, index) in fileList" :key="index">
          <!-- 预览图片 -->
          <img
            v-if="item && item.url.indexOf('.pdf') > -1"
            src="./img/upload-pdf-01.png"
            class="file-list__item--pdf"
          />
          <img
            v-else-if="item && (item.url.indexOf('.zip') > -1 || item.url.indexOf('.rar') > -1)"
            src="./img/upload-zip.png"
            class="file-list__item--pdf"
          />
          <img
            v-else-if="item && (item.url.indexOf('.doc') > -1 || item.url.indexOf('.docx') > -1)"
            src="./img/upload-doc.png"
            class="file-list__item--pdf"
          />
          <img
            v-else-if="item && (item.url.indexOf('.xls') > -1 || item.url.indexOf('xlsx') > -1)"
            src="./img/excel.png"
            class="file-list__item--pdf"
          />
          <img v-else :src="item.url" alt="" class="file-list__item--img" />
          <p class="file-list__item--name" :title="item.name">{{ item.name }}</p>
          <!-- 遮罩操作 -->
          <span class="file-list__item--action">
            <!-- 预览 -->
            <!-- <i class="el-icon-zoom-in file-list__item--preview" @click="handlePreview([item.url], item.url)"></i> -->
            <i class="el-icon-download file-list__item--preview" @click="handleDownLoad(item.fileId, item.name)"></i>
            <i class="el-icon-delete file-list__item--delete" @click="handleRemove(index)" v-show="showDelete"></i>
          </span>
        </li>
        <el-upload
          class="upload-preview"
          action=""
          drag
          :multiple="multiple"
          :auto-upload="false"
          :show-file-list="false"
          :accept="acceptType"
          v-if="fileList.length < limitCount"
          :on-change="handleChange"
        >
          <div class="upload-preview__img">
            <img src="./img/upload-png.png" alt="" style="width: 60px; height: 60px" />
            <img src="./img/upload-pdf-02.png" alt="" style="width: 60px; height: 60px" />
          </div>
          <div class="upload-preview__text">
            <div class="upload-preview__text--tip" style="margin-bottom: 10px">
              拖拽或<em style="color: #03a92c">点击上传</em>
            </div>
            <div class="upload-preview__text--tip" style="font-size: 12px">
              {{ acceptTip ? acceptTip : '仅支持.jpg，.jpeg，.png，.gif，.pdf，zip格式文件' }}
            </div>
          </div>
        </el-upload>
      </ul>
    </div>
    <!-- 面板拖拽上传 -->
    <div class="file-uploader__panel" v-else-if="showType === UploadTypesEnum.PANEL">
      <el-upload
        class="upload-panel"
        action=""
        drag
        :accept="acceptType"
        :auto-upload="false"
        :show-file-list="false"
        :on-change="handleChange"
        :disabled="isPanelDisabled"
      >
        <img src="./img/excel.png" alt="" style="width: 128px; height: 128px" />
        <div class="upload-panel__text">
          <div class="upload-panel__text--tip" style="margin-bottom: 10px">
            请将文件拖到此区域，或<em style="color: #03a92c">点击上传</em>
          </div>
          <div class="upload-panel__text--tip" style="font-size: 12px">
            {{ acceptTip ? acceptTip : '仅支持.xls格式的文件上传' }}
          </div>
        </div>
      </el-upload>
    </div>
    <!-- 单个上传 -->
    <div class="file-uploader__single" v-else-if="showType === UploadTypesEnum.SINGLE">
      <el-upload
        class="upload-single"
        action=""
        drag
        :accept="acceptType"
        :auto-upload="false"
        :show-file-list="false"
        :on-change="handleChange"
        v-if="!fileList.length"
      >
        <img src="./img/icon_cloud.png" class="upload-single__img" alt="" style="width: 60px; height: 60px" />
        <div class="upload-single__text">
          <div class="upload-single__text--tip" style="margin-bottom: 10px">
            拖拽或<em style="color: #03a92c">点击上传</em>
          </div>
          <div class="upload-single__text--tip" style="font-size: 12px">
            {{ acceptTip ? acceptTip : '仅支持.jpg,.jpeg,.png,.gif格式的图片文件' }}
          </div>
        </div>
      </el-upload>
      <div v-else class="upload-preview">
        <i class="el-icon-error upload-preview__icon" @click.stop="handleRemove(0)" />
        <img :src="fileList[0]" class="upload-preview__img" />
      </div>
    </div>
    <p class="upload-tip" v-if="limitTip">{{ limitTip }}</p>
    <preview-big-img ref="PreviewBigImg" />
  </div>
</template>

<script>
import { getOssTempAccessUrl } from '@/apis/oss'
import { getOssFileListByIds } from '@/utils/oss-uploader/utilities/get-file-url-from-id'
import PreviewBigImg from '_c/PreviewBigImg/index'
import { typeUrl } from './config'
import { ossUploader, ossUploader1 } from '@/utils/oss-uploader'
import { UploadTypesEnum, UploadFileTypes } from '@/maps/enums/UploadTypes'
import { downloadFileFromOss } from '@/utils/oss-uploader/utilities/download-file-from-oss'
export default {
  name: 'FileUploader',
  components: { PreviewBigImg },
  props: {
    // 上传组件类型
    showType: {
      type: String,
      default: 'BUTTON',
      validator: value => {
        return ['BUTTON', 'PREVIEW', 'PANEL', 'SINGLE'].indexOf(value) !== -1
      }
    },
    // 按钮显示文字
    buttonText: {
      type: String,
      default: ''
    },
    // 接受文件格式要求提示语
    acceptTip: {
      type: String,
      default: ''
    },
    // 是否是oss上传
    isOss: {
      type: Boolean,
      default: false
    },
    // 接收上传文件类型
    acceptType: {
      type: String,
      default: 'image/*'
    },
    // 限制文件数量
    limitCount: {
      type: Number,
      default: 9
    },
    // 限制上传文件大小
    limitSize: {
      type: Number,
      default: 9
    },
    // 非oss请求方法
    requestMethod: {
      type: Function,
      default: () => {}
    },
    // 自定义请求参数
    requestParams: {
      type: Object,
      default: () => {}
    },
    // 编辑时回显数据
    editList: {
      type: Array,
      default: () => []
    },
    // 是否需要回传数据
    hasReturn: {
      type: Boolean,
      default: false
    },
    // oss上传类型
    ossFileType: {
      type: String,
      default: ''
    },
    // 是否能多选
    multiple: {
      type: Boolean,
      default: false
    },
    // 只要url
    onlyNeedUrl: {
      type: Boolean,
      default: true
    },
    // 提示上传文件数量和大小限制
    limitTip: {
      type: String,
      default: ''
    },
    isPanelDisabled: {
      type: Boolean,
      default: false
    },
    // 是否显示删除图标
    showDelete: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      fileList: [],
      UploadTypesEnum,
      UploadFileTypes: Object.freeze(UploadFileTypes),
      lockNum: 0
    }
  },
  watch: {
    editList: {
      handler(val) {
        if (!this.onlyNeedUrl) {
          this.fileList = val
        } else {
          getOssFileListByIds(val, res => {
            this.fileList = res
          })
        }
      }
    },
    fileList(newList) {
      this.lockNum = newList.length
    }
  },
  methods: {
    async handleChange(file) {
      // 验证文件格式
      if (this.acceptType.indexOf(file.name.substring(file.name.lastIndexOf('.'))) === -1) {
        this.$message({
          type: 'warning',
          message: `只能上传${this.acceptType}格式的文件！`
        })
        return
      }
      // 验证文件大小
      if (file.size >= 1024 * 1024 * this.limitSize) {
        this.$message.error(`请上传不超过${this.limitSize}M的文件`)
        return
      }

      this.lockNum++

      if (this.lockNum > this.limitCount) {
        this.$msgbox({
          title: '提醒',
          message: `最多只能导入${this.limitCount}份文件，已为您导入！请检查附件内容`
        })
        return
      }

      this.$loading({ text: '上传中...' })
      // 不用走oss
      if (!this.isOss) {
        this.requestMethod({
          file: file.raw,
          ...this.requestParams
        })
          // eslint-disable-next-line space-before-function-paren
          .then(async res => {
            this.$loading().close()
            // 回传上传后的id|url
            if (this.hasReturn) {
              const response = await getOssTempAccessUrl([res.data])
              this.fileList = [...this.fileList, ...response]
              this.$emit('on-success', this.fileList)
            } else {
              // 只是上传不需要回传数据
              this.$message({
                message: '上传成功',
                type: 'success'
              })
              this.$emit('on-success', res.data)
            }
          })
          .catch(() => {
            this.$loading().close()
          })
      } else {
        const uploaderApi = this.onlyNeedUrl ? ossUploader : ossUploader1
        // 需要走oss上传
        uploaderApi(file.raw, this.ossFileType).then(urlOrFile => {
          // 回显
          this.fileList.push(urlOrFile)
          // 抛出
          this.$emit('on-success', this.fileList)
          this.$loading().close()
        })
      }
    },
    handleRemove(index) {
      if (!this.onlyNeedUrl) {
        this.lockNum--
      }
      this.fileList.splice(index, 1)
      this.$emit('on-success', this.fileList)
    },
    getName(name) {
      if (name) {
        const splitNameArr = name.split('.')
        return splitNameArr[splitNameArr.length - 1]
      }
    },
    handleDownLoad(fileIdOrUrl, fileName) {
      downloadFileFromOss(fileIdOrUrl, fileName)
    },
    handlePreview(imgList, fileUrl) {
      const array = []
      if (fileUrl) {
        let imgObj = new Image()
        imgObj.src = fileUrl
        if (typeUrl[this.getName(fileUrl)] || !(imgObj.height > 0 && imgObj.width > 0)) {
          window.open(fileUrl)
          imgObj = null
        } else {
          imgList.forEach(item => {
            const itemUrl = new Image()
            itemUrl.src = item
            if (!typeUrl[this.getName(item)] && itemUrl.height > 0 && itemUrl.width > 0) {
              array.push(item)
            }
          })
          this.$refs.PreviewBigImg.handleImgClick(array, array.indexOf(fileUrl))
        }
      }
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss">
@import '@/styles/mixin';
@include b(file-uploader) {
  @include e(panel) {
    .upload-panel {
      position: relative;
      box-sizing: border-box;
      .el-upload {
        .el-upload-dragger {
          padding-top: 12px;
          width: 405px !important;
          height: 232px !important;
          .upload-panel__text {
            font-size: 14px;
            font-weight: 400;
          }
        }
      }
      .upload-panel__tip {
        width: 100%;
        position: absolute;
        left: 0;
        bottom: 20px;
        right: 0;
        text-align: center;
      }
    }
  }
  @include e(preview) {
    display: flex;
    flex-wrap: wrap;
    .el-upload-dragger {
      width: 155px;
      height: 166px;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    @include b(file-list) {
      display: flex;
      flex-wrap: wrap;
      @include e(item) {
        border: 1px solid #c0ccda;
        border-radius: 5px;
        position: relative;
        box-sizing: border-box;
        margin-right: 15px;
        margin-bottom: 20px;
        @include m(pdf) {
          width: 155px;
          height: 166px;
        }
        @include m(img) {
          width: 155px;
          height: 166px;
        }
        @include m(action) {
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
          line-height: 166px;
        }
        @include m(preview) {
          font-size: 26px;
          color: #fff;
          cursor: pointer;
          margin-right: 15px;
        }
        @include m(delete) {
          font-size: 26px;
          color: #fff;
          cursor: pointer;
          margin-left: 15px;
        }
      }
      .file-list__item:hover {
        .file-list__item--action {
          display: block;
        }
      }
      .file-list__item--name {
        position: absolute;
        bottom: -20px;
        width: 155px;
        font-size: 12px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin: 0;
        line-height: 14px;
        margin-bottom: 5px;
      }
      img {
        display: block;
      }
    }
    @include b(upload-preview) {
      @include e(img) {
        display: flex;
        margin: 10px 0;
      }
      @include e(text) {
        width: 155px;
        box-sizing: border-box;
        padding: 0 10px;
        @include m(tip) {
          line-height: 14px;
          word-break: break-all;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      }
    }
  }
  @include e(single) {
    .el-upload-dragger {
      width: 155px;
      height: 160px;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    @include b(upload-single) {
      @include e(img) {
        margin: 10px 0;
      }
      @include e(text) {
        box-sizing: border-box;
        padding: 0 10px;
        @include m(tip) {
          line-height: 16px;
          word-break: break-all;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      }
    }
    @include b(upload-preview) {
      position: relative;
      width: 155px;
      height: 160px;
      @include e(icon) {
        cursor: pointer;
        position: absolute;
        top: -2px;
        right: -4px;
        font-size: 16px;
      }
      @include e(img) {
        width: 155px;
        height: 160px;
      }
    }
  }
}
</style>
