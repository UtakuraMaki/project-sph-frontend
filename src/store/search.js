import { getList } from '@/api/index.js'

export default {
  state: {
    list: {}
  },
  mutations: {
    list (state, data) {
      state.list = data
    }
  },
  actions: {
    list (context, data) {
      getList(data).then(function (result) {
        if (result.code === 200) {
          context.commit('list', result.data)
        }
      })
    }
  },
  getters: {
    attrsList (state) {
      return state.list.attrsList || []
    },
    goodsList (state) {
      return state.list.goodsList || []
    },
    trademarkList (state) {
      return state.list.trademarkList || []
    }
  }
}