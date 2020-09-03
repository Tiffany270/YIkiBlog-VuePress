import vuex from 'vuex'
import vue from 'vue'

// Vuex

vue.use(vuex)

const state = {
  count: 0,
  disableScrollBehavior: false

}
const mutations = {
  addCount(state) {
    return state.count++
  }
}

const actions = {
}

const getters = {

}

export default new vuex.Store({
  state,
  mutations,
  actions,
  getters
})

