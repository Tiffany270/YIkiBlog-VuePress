<template>
  <div class="form-block-container">
    <div class="form-block-header">服务协议</div>
    <div class="form-block-content">
      <template v-if="isEditStatus">
        <el-form ref="form" :model="form" :rules="rules" label-width="140px" inline size="medium">
          <el-form-item label="C端协议：" prop="agreementId">
            <el-select v-model="form.agreementId" placeholder="请选择协议">
              <el-option
                v-for="agreement in agreementIdOptions"
                :key="agreement.id"
                :label="agreement.agreementName"
                :value="agreement.id"
              />
            </el-select>
          </el-form-item>
        </el-form>
      </template>
      <template v-else>
        <el-form ref="form" :model="form" label-width="140px" inline size="medium">
          <el-form-item label="C端协议：">
            <span class="cursor-text" @click="viewContract">
              {{ agreementName }}
            </span>
          </el-form-item>
        </el-form>
      </template>
    </div>
  </div>
</template>

<script>
import { staticRules } from '@/utils/validate'
import mixins from './mixins'
import { mapGetters } from 'vuex'

export default {
  name: 'SeviceAgreement',
  mixins: [mixins],
  data() {
    return {
      form: {
        agreementId: ''
      },
      rules: {
        agreementId: [staticRules('C端协议', 'change').required]
      }
    }
  },
  computed: {
    ...mapGetters(['canUseAgreements', 'projectList']),
    agreementIdOptions() {
      const id = this.$route.query.id
      const curAgreement = this.projectList.filter(item => item.id === this.form.agreementId)
      if (id) {
        return [...this.canUseAgreements, ...curAgreement]
      } else {
        return this.canUseAgreements
      }
    },
    agreementName() {
      if (this.form.agreementId && this.agreementIdOptions.length > 0) {
        return (
          (this.agreementIdOptions.find(item => item.id === this.form.agreementId) &&
            this.agreementIdOptions.find(item => item.id === this.form.agreementId).agreementName) ||
          ''
        )
      } else {
        return ''
      }
    }
  },
  methods: {
    viewContract() {
      const agreementUrl =
        this.agreementIdOptions.find(item => item.id === this.form.agreementId) &&
        this.agreementIdOptions.find(item => item.id === this.form.agreementId).agreementUrl
      agreementUrl && window.open(agreementUrl)
    }
  }
}
</script>
<style lang="scss" scoped>
.cursor-text {
  color: #3360e1;
  cursor: pointer;
}
</style>
