<template>
  <div>
    <div class="file-btn-upload">
      <el-upload
        ref="elUpload"
        action=""
        :accept="accept"
        :auto-upload="false"
        :show-file-list="false"
        :on-change="handleChange"
      >
        <el-button size="small" type="primary">点击上传</el-button>
      </el-upload>
      <div class="hint">{{ hint }}</div>
    </div>
    <div class="file-list" v-for="(item, idx) in fileList" :key="idx">
      {{ item.name }}
      <i class="el-icon-close" @click="handleClearFiles" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'FileBtnUpload',
  model: {
    prop: 'fileUrl',
    event: 'upload'
  },
  props: {
    fileUrl: {
      type: [Object, String, File],
      default: () => {
        return {}
      }
    },
    accept: {
      // 上传的类型
      type: String,
      default: 'image/*'
    },
    hint: {
      // 提示语
      type: String,
      default: ''
    }
  },
  data() {
    return {
      fileList: []
    }
  },
  methods: {
    handleChange(file, fileList) {
      this.fileList = fileList.splice(0, 1)
      this.$emit('upload', file.raw)
    },
    handleClearFiles() {
      this.fileList = []
      this.$emit('upload', '')
    }
  }
}
</script>

<style lang="scss" scoped>
.file-btn-upload {
  position: relative;
  .hint {
    position: absolute;
    top: 0;
    left: 100px;
  }
}
.file-list {
  display: flex;
  justify-content: space-between;
  line-height: 20px;
  padding: 5px;
  align-items: center;
  &:hover {
    background-color: #cdeed5;
    border-radius: 2px;
  }
  i {
    cursor: pointer;
  }
}
</style>
