import { usedAgreementId } from '@/apis/taskManage'
import { getByProject } from '@/apis/signManage'

const task = {
  state: {
    canUseAgreements: [], // 可以使用的协议
    projectList: [] // 可以使用的协议
  },
  mutations: {
    SET_CAN_USE_AGREEMENTS(state, data) {
      state.canUseAgreements = data || []
    },
    SET_PROJECT_LIST(state, data) {
      state.projectList = data
    }
  },
  actions: {
    UPDATE_CAN_USE_AGREEMENTS({ getters, commit }) {
      return new Promise(resolve => {
        const allP = Promise.all([usedAgreementId(), getByProject(getters.userInfo.attrs.projectId)])
        allP.then(res => {
          const usedIds = res[0].data
          const projectList = res[1].data
          const agreementIdOptions = projectList.filter(project => !usedIds.includes(project.id))
          commit('SET_CAN_USE_AGREEMENTS', agreementIdOptions)
          commit('SET_PROJECT_LIST', projectList)
          resolve()
        })
      })
    }
  }
}

export default task
