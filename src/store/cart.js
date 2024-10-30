import { getCartList, deleteCart, getCheckCart } from "@/api/index.js"

export default {
  state: {
    cartList: []
  },
  mutations: {
    cartList(state, data) {
      state.cartList = data
    },
  },
  actions: {
    cartList(context) {
      getCartList().then(function(result) {
        if(result.code === 200) {
          context.commit('cartList', result.data)
        }
      })
    },
    async delCart(context, skuId) {
      const result = await deleteCart(skuId)
      if(result.code === 200) {
        Promise.resolve(result.message)
      }
      else {
        Promise.reject('失败')
      }
    },
    async checkCart(context, obj) {
      const result = await getCheckCart(obj.skuID, obj.isChecked)
      if(result.code === 200) {
        return Promise.resolve(result.message)
      }
      else {
        return Promise.reject('失败')
      }
    }
  },
  getters: {
    cartList(state) {
      return state.cartList[0] || {}
    }
  }
}