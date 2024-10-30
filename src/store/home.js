import { getBanners, getFloors } from '@/api/mockIndex.js'
export default {
  state: {
    banners: [],
    floors: []
  },
  mutations: {
    banners (state, data) {
      state.banners = data
    },
    floors (state, data) {
      state.floors = data
    }
  },
  actions: {
    banners (context) {
      getBanners().then(function (response) {
        if (response.code === 200) {
          context.commit('banners', response.data)
        }
      })
    },
    floors (context) {
      getFloors().then(function (response) {
        if (response.code === 200) {
          context.commit('floors', response.data)
        }
      })
    }
  },
}