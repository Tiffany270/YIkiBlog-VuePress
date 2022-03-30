<template>
  <div class="preview-img">
    <el-image-viewer v-if="showViewer" :on-close="closeViewer" :url-list="imgList" :z-index="10000" />
  </div>
</template>
<script>
// 导入组件
import ElImageViewer from 'element-ui/packages/image/src/image-viewer'

export default {
  name: 'PreviewBigImg',
  components: { ElImageViewer },
  data() {
    return {
      showViewer: false, // 显示查看器
      imgList: []
    }
  },
  methods: {
    handleImgClick(imgList, index) {
      // 打开对应位置的图片
      const temp = []
      const tempImgList = [...imgList]
      for (let i = 0; i < index; i++) {
        temp.push(tempImgList.shift())
      }
      this.imgList = [...tempImgList, ...temp]
      this.showViewer = true
    },
    // 预览图片
    onPreview(imgList) {
      this.imgList = [...imgList]
      this.showViewer = true
    },
    // 关闭查看器
    closeViewer() {
      this.showViewer = false
    }
  }
}
</script>

<style lang="scss">
.el-icon-circle-close {
  color: #fff;
}
</style>
