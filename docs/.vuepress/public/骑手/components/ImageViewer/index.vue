<template>
  <div>
    <el-image-viewer
      v-if="showViewer"
      :initial-index="initialIndex"
      :url-list="imgList"
      :z-index="10000"
      :on-close="closeViewer"
    />
  </div>
</template>
<script>
import ElImageViewer from 'element-ui/packages/image/src/image-viewer'
export default {
  name: 'ElImageViewer1',
  components: {
    ElImageViewer
  },
  data() {
    return {
      showViewer: false,
      imgList: [],
      initialIndex: 0
    }
  },
  methods: {
    viewImg(imgList, initialIndex = 0) {
      if (!Array.isArray(imgList) || imgList.length === 0) return
      this.imgList = imgList
      this.initialIndex = initialIndex
      this.showViewer = true
      console.log(this.showViewer)
    },
    closeViewer() {
      this.showViewer = false
    }
  }
}
</script>
