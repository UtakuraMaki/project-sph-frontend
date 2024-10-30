import { getItem, postAddToCart } from '@/api/index.js'

export default {
  state: {
    item: {}
  },
  mutations: {
    item (state, data) {
      state.item = data
    }
  },
  actions: {
    item (context, skuId) {
      getItem(skuId).then(function (result) {
        if (result.code === 200) {
          context.commit('item', result.data)
        }
      })
    },
    async addToCart (context, obj) {
      const result = await postAddToCart(obj.skuId, obj.skuNum)
      if (result.code === 200) {
        return Promise.resolve()
      }
      else {
        return Promise.reject(new Error('失败'))
      }
    }
  },
  getters: {
    categoryView (state) {
      return state.item.categoryView || {}
    },
    skuInfo (state) {
      return state.item.skuInfo || {}
    },
    spuSaleAttrList (state) {
      return state.item.spuSaleAttrList || []
    }
  }
}