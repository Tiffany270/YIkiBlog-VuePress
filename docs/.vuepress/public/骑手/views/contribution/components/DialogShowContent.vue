<template>
  <dialog-container
    :ref="DIALOG_REF"
    title="投稿内容"
    width="600px"
    class="dialog-show-pic"
  >
    <div v-html="contributeContent"></div>
  </dialog-container>
</template>
<script>
import Dialog from '@/mixin/Dialog'
export default {
  name: 'DialogShowPic',
  mixins: [Dialog],
  data() {
    return {
      contributeContent: ''
    }
  },
  methods: {
    updateView(contributeContent) {
      this.contributeContent = contributeContent
      this.showDialog()
    }
  }
}
</script>
<style lang="sass" scoped></style>
