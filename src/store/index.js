import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import home from './home.js'
import search from './search.js'
import detail from './detail.js'
import cart from './cart.js'
import register from './register.js'
import trade from './trade.js'
import pay from './pay.js'

import { getBaseCategoryList } from '@/api/index.js'
import { getUUID } from '@/utils/index.js'

const store = new Vuex.Store({
  modules: {
    home, search, detail, cart, register, trade, pay
  },
  state: {
    baseCategoryList: [],
    uuid: getUUID() || ''
  },
  mutations: {
    baseCategoryList (state, data) {
      state.baseCategoryList = data
    }
  },
  actions: {
    baseCategoryList (context) {
      getBaseCategoryList().then(function (response) {
        if (response.code === 200) {
          context.commit('baseCategoryList', response.data)
        }
      })
    }
  }
})

export default store