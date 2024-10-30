import { getFindUserAddressList, getTrade } from "@/api/index.js"

export default {
  state: {
    userAddressList: [],
    trade: {}
  },
  mutations: {
    findUserAddressList(state, data) {
      state.userAddressList = data
    },
    trade(state, data) {
      state.trade = data
    }
  },
  actions: {
    async findUserAddressList(context) {  
      const result = await getFindUserAddressList()
      if(result.code === 200) {
        context.commit('findUserAddressList', result.data)
      }
    },
    async trade(context) {
      const result = await getTrade()
      if(result.code === 200) {
        context.commit('trade', result.data)
      }
    }
  },
  getters: {
    detailArrayList(state) {
      return state.trade.detailArrayList || []
    }
  }
}