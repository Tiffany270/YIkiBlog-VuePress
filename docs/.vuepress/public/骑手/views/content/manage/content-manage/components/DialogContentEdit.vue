<template>
  <dialog-container
    class="dialog-content-edit"
    :ref="DIALOG_REF"
    title="编辑"
    width="600px"
    @closed="resetDialog"
    center
  >
    <page-container>
      <div class="">
        <block-container>
          <el-form
            ref="editForm"
            :rules="recommendedIndexRule"
            :model="editForm"
            label-width="100px"
          >
            <el-form-item label="推荐值" prop="recommendedIndex">
              <el-input
                clearable
                placeholder="请输入0~10000正整数"
                v-model.number="editForm.recommendedIndex"
              ></el-input>
            </el-form-item>
          </el-form>
        </block-container>
      </div>
    </page-container>
    <template v-slot:footer class="el-dialog__footer center-button">
      <el-button type="primary" @click="submitForm">保存</el-button>
      <el-button @click="resetForm">取消</el-button>
    </template>
  </dialog-container>
</template>

<script>
import Table from '@/mixin/Table'
import Dialog from '@/mixin/Dialog'
import BasePage from '@/mixin/BasePage'
import { getContentEdit } from '@/api/contentMange'
export default {
  name: 'DialogContentEdit', // 内容编辑
  inject: ['fatherMethod'],
  components: {},
  mixins: [Table, Dialog, BasePage],
  data() {
    return {
      editForm: {
        recommendedIndex: ''
      },
      recommendedIndexRule: {
        recommendedIndex: [
          {
            required: true,
            type: 'number',
            trigger: 'blur',
            validator(rule, value, callback) {
              if (value === '') {
                callback(
                  new Error(
                    `提示：推荐值在内容推荐排序上有关键作用，推荐值越高，内容越靠前`
                  )
                )
              } else if (!/(?=^\d*[0-9]\d*$)(^[0-9]{0,5}$)/.test(value)) {
                console.log('value', value)
                callback(
                  new Error(
                    `提示：推荐值在内容推荐排序上有关键作用，推荐值越高，内容越靠前`
                  )
                )
              } else {
                callback()
              }
            }
          }
        ]
      }
    }
  },
  computed: {},
  watch: {},
  mounted() {
    // this.findContentEdit()
  },
  methods: {
    updateView(row) {
      this.row = row
      this.id = this.row.id
      this.recommendedIndex = this.row.recommendedIndex
      this.editForm.recommendedIndex = this.recommendedIndex
      this.findContentEditList()
      this.showDialog()
    },
    // 内容管理-编辑-设置推荐值
    async findContentEditList() {
      const res = await getContentEdit({
        id: this.id,
        recommendedIndex: this.recommendedIndex
      })
      console.log('res', res)
    },
    // 保存
    async submitForm() {
      this.$refs.editForm.validate(async vaild => {
        if (vaild) {
          const editData = {
            id: this.id,
            recommendedIndex: this.editForm.recommendedIndex
          }
          try {
            const res = await getContentEdit(editData)
            if (res && res.code === 0) {
              this.$message.success('保存成功')
              this.fatherMethod()
              this.hideDialog()
              this.$refs.editForm.resetFields()
            }
          } catch (e) {
            console.log(e)
          }
        }
      })
    },
    resetForm() {
      this.hideDialog()
      this.$refs.editForm.resetFields()
    }
  }
}
</script>
<style lang="scss"></style>
