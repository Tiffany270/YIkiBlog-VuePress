<template>
  <dialog-container :ref="DIALOG_REF" :title="info.title" width="800px" @closed="hidden">
    <el-form ref="form" :model="form" :rules="rules" class="role-modify-style" label-width="100px">
      <styled-title>基本信息</styled-title>
      <el-form-item label="姓名:" prop="name">
        <el-input
          v-model="form.name"
          :disabled="info.actionType === 'edit'"
          clearable
          size="medium"
          maxlength="30"
          style="width: 260px"
          placeholder="请输入姓名"
          show-word-limit
        />
      </el-form-item>
      <el-form-item label="手机账号:" prop="mobile">
        <el-input
          v-model="form.mobile"
          clearable
          size="medium"
          maxlength="11"
          style="width: 260px"
          placeholder="请输入手机账号"
          :disabled="info.actionType === 'edit'"
          show-word-limit
        />
        <span class="tips">注:账号的密码为手机的后6位数</span>
      </el-form-item>
      <el-form-item label="权限类型:" prop="type">
        <el-select
          v-model="form.type"
          style="width: 260px"
          placeholder="请选择权限"
          :disabled="info.actionType === 'edit'"
          @change="selectRoleType"
        >
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
        </el-select>
      </el-form-item>
      <styled-title>权限分配</styled-title>
      <el-form-item label="" class="tree-permission-form-item" prop="permissionIds">
        <div class="tree-permission">
          <tree-permission
            ref="tree-permission"
            :tree-list="treeList"
            :un-change-selected="unChangeSelected"
            :forbid-data="forbidData"
            v-model="form.permissionIds"
          />
        </div>
      </el-form-item>
    </el-form>
    <div slot="footer">
      <el-button @click="hidden">取消</el-button>
      <el-button type="primary" @click="submit" :disabled="!disabledFlag"> 确定 </el-button>
    </div>
  </dialog-container>
</template>

<script>
export { default } from './role'
</script>

<style lang="scss" scoped>
.tree-permission {
  max-height: 750px;
  overflow: auto;
}
.tree-permission-form-item {
  /deep/ {
    .el-form-item__content {
      margin-left: 0 !important;
    }
  }
}
.tips {
  font-size: 12px;
  color: red;
  margin-left: 10px;
}
.role-modify-style {
  /deep/ .el-form-item {
    margin-bottom: 18px;
  }
}
</style>
