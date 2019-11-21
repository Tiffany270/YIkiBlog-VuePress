import vuex from 'vuex'
import vue from 'vue'

// Vuex

vue.use(vuex)

const state = {
  count: 0,
  disableScrollBehavior: false

}
const mutations = {
}

const actions = {
}

const getters = {

  addCount (state) {
    return state.count++
  }
}

export default new vuex.Store({
  state,
  mutations,
  actions,
  getters
})

