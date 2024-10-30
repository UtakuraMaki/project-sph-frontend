import { postSubmitOrder, getCreateNative } from '@/api/index.js'

export default {
  state: {
    orderId: 0,
    createNative: {}
  },
  mutations: {
    submitOrder(state, data) {
      state.orderId = data
    },
    createNative(state, data) {
      state.createNative = data
    }
  },
  actions: {
    async submitOrder(context, obj) {
      const result = await postSubmitOrder(obj)
      if(result.code === 200) {
        context.commit('submitOrder', result.data)
        return Promise.resolve()
      }
      else {
        return Promise.reject(result.message)
      }
    },
    async createNative(context, orderId) {
      const result = await getCreateNative(orderId)
      if(result.code === 200) {
        context.commit('createNative', result.data)
      }
    },
  },
  getters: {}
}