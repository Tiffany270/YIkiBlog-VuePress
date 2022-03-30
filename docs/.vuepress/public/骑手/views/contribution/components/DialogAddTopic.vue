<template>
  <dialog-container
    :ref="DIALOG_REF"
    title="设置主题"
    width="600px"
    class="dialog-add-topic"
  >
    <div class="topic-item" v-for="topic in topicList" :key="topic.id">
      <div class="topic-item__left">
        <h4>{{ topic.topicName }}</h4>
        <p>{{ topic.topicDescribe }}</p>
      </div>
      <div class="topic-item__right">
        <el-button type="danger" @click="deleteTopicById(topic.id)">
          删除
        </el-button>
      </div>
    </div>
    <div class="topic-add">
      <div class="topic-add__left">
        <el-form ref="form" :model="form" label-width="60px" :rules="rules">
          <el-form-item label="标题" prop="topicName">
            <el-input
              v-model.trim="form.topicName"
              style="width: 350px"
            ></el-input>
          </el-form-item>
          <el-form-item label="描述" prop="topicDescribe">
            <el-input
              v-model.trim="form.topicDescribe"
              style="width: 350px"
            ></el-input>
          </el-form-item>
          <el-form-item label="规则" prop="topicExample">
            <el-input
              type="textarea"
              v-model.trim="form.topicExample"
              :rows="5"
              style="width: 350px"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="topic-add__right">
        <el-button type="primary" @click="addTopic">保存</el-button>
      </div>
    </div>
  </dialog-container>
</template>
<script>
import Dialog from '@/mixin/Dialog'
import { addTopic, getTopic, deleteTopicById } from '@/api/contribution'
import { statusOptions } from '../index/config'
export default {
  name: 'DialogAddTopic',
  mixins: [Dialog],
  data() {
    return {
      topicList: [],
      form: {
        topicName: '',
        topicDescribe: '',
        topicExample: ''
      },
      rules: {
        topicName: [{ required: true, message: '请输入标题', trigger: 'blur' }],
        topicDescribe: [
          { required: true, message: '请输入描述', trigger: 'blur' }
        ],
        topicExample: [
          { required: true, message: '请输入规则', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    options() {
      return statusOptions.slice(0)
    }
  },
  methods: {
    updateView() {
      this.getTopic()
      this.showDialog()
    },
    getTopic() {
      getTopic().then(res => {
        this.topicList = res.data
      })
    },
    addTopic() {
      this.$refs.form.validate().then(() => {
        addTopic(this.form).then(res => {
          if (res && res.data) {
            this.$message.success('添加成功')
            this.$emit('add-success')
            this.hideDialog()
            this.$refs.form.resetFields()
          }
        })
      })
    },
    deleteTopicById(id) {
      this.$confirm('确定要删除该主题吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteTopicById(id).then(res => {
          if (res && res.data) {
            this.$message.success('删除成功')
            this.getTopic()
          }
        })
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.dialog-add-topic {
  .topic-item,
  .topic-add {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid #ccc;
    padding: 0 20px;
    margin-bottom: 20px;
    border-radius: 8px;
  }
  .topic-add {
    padding: 20px 20px 0;
  }
}
</style>
