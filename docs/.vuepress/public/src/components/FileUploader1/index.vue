<template>
  <div>
    <el-upload
      v-if="!disabled"
      ref="elUpload"
      :disabled="btnDisabled"
      :with-credentials="true"
      :multiple="false"
      :accept="accept"
      :on-remove="handleRemove"
      :on-exceed="handleExceed"
      :before-upload="uploadCheck"
      :http-request="upload"
      :limit="1"
      list-type="text"
      action=""
    >
      <el-button
        :loading="btnLoading"
        :disabled="btnDisabled"
        icon="el-icon-upload2"
        size="mini"
        type="primary"
        plain
        >{{ againFile }}</el-button
      >
      <span v-if="tip" class="inline-hint">{{ tip }}</span>
      <!--<div slot="tip" class="el-upload__tip">{{ tip }}</div>-->
    </el-upload>
    <div v-if="fileUrl" :class="!disabled && 'has-upload'" class="result-container">
      <img v-if="urlType" :src="fileUrl" alt="" width="400px" />
      <template v-else>
        <span v-if="undownloadable" class="download">{{ filenameGen }}</span>
        <a v-else :href="fileUrl" :download="filenameGen" class="download" target="_blank"
          >{{ filenameGen }} (点击下载)</a
        >
      </template>
    </div>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'
import { Message } from 'element-ui'
// import md5 from 'md5'
// import { uploadFile } from '@/utils/uploadFile'

/**
 * 生成文件名
 * @param filename
 * @param specific
 * @returns {String|Ident|string}
 */
// const generateFilename = filename => {
//   const pos = filename.lastIndexOf('.')
//   let suffix = ''
//   if (pos !== -1) {
//     suffix = filename.substring(pos)
//   }

//   let output = ''
//   let timestamp = new Date().getTime()
//   timestamp += Math.random().toString(36).substr(2, 6)
//   timestamp += suffix
//   output = md5(timestamp).substr(0, 20)
//   if (suffix) {
//     output += suffix
//   }
//   return {
//     output,
//     suffix
//   }
// }

export default {
  name: 'FileUploader',
  model: {
    prop: 'fileUrl',
    event: 'upload'
  },
  props: {
    fileUrl: {
      type: String,
      default: ''
    },
    tip: {
      type: String,
      default: '只能上传图片文件'
    },
    accept: {
      type: String,
      default: 'image/*'
    },
    size: {
      type: Number,
      default: 0
    },
    filename: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    normalMethod: {
      type: Function,
      default: null
    },
    noSuccessHint: {
      type: Boolean,
      default: false
    },
    undownloadable: {
      type: Boolean,
      default: false
    },
    btnDisabled: {
      type: Boolean,
      default: false
    },
    isCduan: {
      type: Boolean,
      default: false
    },
    againFile: {
      type: String,
      default: '点击上传'
    }
  },
  data() {
    return {
      urlType: false,
      file: null,
      btnLoading: false
    }
  },
  computed: {
    // ...mapGetters(['client']),
    // eslint-disable-next-line vue/return-in-computed-property
    filenameGen() {
      if (this.file) {
        return this.file.name
      } else if (this.filename) {
        return this.filename
      } else if (this.fileUrl) {
        return this.getFileName(this.fileUrl)
      }
    }
  },
  watch: {
    fileUrl(val) {
      this.getUrlType(val)
    }
  },
  mounted() {
    this.getUrlType(this.fileUrl)
  },
  methods: {
    upload({ file }) {
      this.uploadMethod(file)
    },
    uploadMethod(file) {
      this.file = file
      this.btnLoading = true
      // const filenameObj = generateFilename(file.name)
      // const filename = filenameObj.output
      const msg = Message({
        message: '正在上传中……',
        type: 'info',
        duration: 0
      })
      const methodResult = this.normalMethod(file)
      methodResult
        .then(url => {
          msg.close()
          this.btnLoading = false
          !this.noSuccessHint &&
            Message({
              message: '上传成功！',
              type: 'success'
            })
          this.$emit('upload', url)
        })
        .catch(error => {
          msg.close()
          this.btnLoading = false
          console.warn('file-uploader: ', error)
        })
    },
    handleExceed(file) {
      this.$refs.elUpload.clearFiles()
      this.uploadMethod(file[0])
    },
    handleRemove() {
      this.$emit('upload', '')
    },
    uploadCheck(file) {
      if (this.size > 0) {
        const isSize = file.size / 1024 / 1024 < this.size
        if (!isSize) {
          Message.error(`上传大小不能超过${this.size}MB`)
        }
      }
    },
    getUrlType(val) {
      this.urlType = false
      if (val) {
        const imgObj = new Image()
        imgObj.src = val
        imgObj.onload = () => {
          this.urlType = imgObj.height > 0 && imgObj.width > 0
        }
      }
    },
    getFileName(val) {
      const urlSplit = val.split('/')
      return urlSplit[urlSplit.length - 1]
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
// @import '~@styles/variables';

/deep/ .el-upload-list {
  display: none;
}
.inline-hint {
  margin-left: 20px;
  color: #999;
}

.result-container.has-upload {
  margin-top: 10px;
}
</style>
