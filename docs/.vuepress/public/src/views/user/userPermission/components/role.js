import StyledTitle from '_c/StyledTitle/index.vue'
import { staticRules } from '@/utils/validate'
import BaseDialog from '@/mixins/BaseDialog'
import { mapState } from 'vuex'
import {
  saveRiskControlToB,
  updateRiskControlToB,
  menuTrees,
  riskControlToBDetail,
  checkMobile
} from '@/apis/userManage'
export default {
  name: 'DialogRole',
  mixins: [BaseDialog],
  components: {
    StyledTitle
  },
  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo,
      userMenus: state => state.user.userMenus,
      disabledFlag() {
        return this.form.name && this.form.mobile && this.form.type && this.form.permissionIds.length > 0
      }
    })
  },
  data() {
    return {
      treeList: [],
      unChangeSelected: [], // 默认勾选
      forbidData: [], // 禁止的
      form: {
        name: '',
        mobile: '',
        permissionIds: [],
        type: ''
      },
      info: {
        title: '',
        actionType: ''
      },
      options: [
        { label: '制单权限', value: 'PREPARE' },
        { label: '审核权限', value: 'AUDIT' },
        { label: '发放权限', value: 'EXECUTE' },
        { label: '查看权限', value: 'VIEW' }
      ],
      rules: {
        mobile: [staticRules('手机号').required, staticRules('手机号').mobile],
        name: [staticRules('姓名').required],
        permissionIds: [staticRules('权限').required],
        type: [staticRules('权限类型', 'change').required]
      }
    }
  },
  methods: {
    async getMenuTrees(roleType, accountId) {
      const { data } = await menuTrees(roleType)
      this.treeList = data || []
      this.unChangeSelected = this.roleTypeSelected(data, 'BINDING')
      this.forbidData = this.roleTypeSelected(data, 'FORBID')
      this.form.permissionIds = this.unChangeSelected
      console.log(this.form.permissionIds)
      if (this.info.actionType === 'edit') {
        // 回显相关信息
        this.getToBDetail(roleType.roleType, accountId)
      }
    },
    updateView(data) {
      this.info.title = data.title
      this.showDialog()
      this.info.actionType = data.actionType
      if (this.info.actionType === 'edit') {
        // 请求不同角色类型的权限
        data.roleType && this.getMenuTrees({ roleType: data.roleType }, Number(data.accountId))
      }
    },
    roleTypeSelected(data, type) {
      const arr = []
      data &&
        data.forEach(item => {
          if (item.constraints === type) {
            arr.push(item.id)
          }
          item.children &&
            item.children.forEach(item1 => {
              if (item1.constraints === type) {
                arr.push(item1.id)
              }
              item1.buttons &&
                item1.buttons.forEach(item2 => {
                  if (item2.constraints === type) {
                    arr.push(item2.id)
                  }
                })
            })
        })
      return arr
    },
    getToBDetail(type, accountId) {
      riskControlToBDetail(type, accountId).then(res => {
        const { accountId, name, mobile } = res.data
        const resPermissionIds = (res.data.permissionIds || []).concat(
          // 回显示的时候  默认加上之前默认勾选的
          this.unChangeSelected
        )
        const permissionIds = []
        resPermissionIds.map(item => {
          permissionIds.push(Number(item))
        })
        this.form = {
          accountId,
          name,
          mobile,
          permissionIds,
          type: type
        }
      })
    },
    selectRoleType() {
      this.getMenuTrees({ roleType: this.form.type })
    },
    selectPhone() {
      checkMobile(this.form.mobile).then(res => {
        const { data } = res
        if (data && data.exist) {
          this.comfirmDialog(data)
        } else {
          saveRiskControlToB(this.form).then(res => {
            if (res.code === 0) {
              this.hidden()
              this.$emit('fetch')
            }
          })
        }
      })
    },
    comfirmDialog(obj) {
      this.$confirm(`<p>姓名:${obj.name}</p><p>手机号码:${obj.mobile}</p>`, '温馨提示', {
        dangerouslyUseHTMLString: true,
        closeOnClickModal: false,
        showClose: false,
        closeOnPressEscape: false,
        confirmButtonText: '确定就是这个人',
        cancelButtonText: '取消,可能写错了'
      })
        .then(() => {
          this.form.name = obj.name
          saveRiskControlToB(this.form).then(res => {
            if (res.code === 0) {
              this.hidden()
              this.$emit('fetch')
            }
          })
        })
        .catch(() => {})
    },
    hidden() {
      this.$refs['form'].resetFields()
      this.treeList = []
      this.unChangeSelected = []
      this.forbidData = []
      this.hideDialog()
    },
    submit() {
      this.$refs['form'].validate(async valid => {
        console.log(this.form)
        if (valid) {
          if (this.info.actionType === 'add') {
            // 调用新增保存的接口
            this.form.accountId && delete this.form.accountId
            this.selectPhone()
          } else {
            // 调用编辑保存的接口
            updateRiskControlToB(this.form).then(res => {
              if (res.code === 0) {
                this.hidden()
                this.$emit('fetch')
              }
            })
          }
        } else {
          return false
        }
      })
    }
  }
}
