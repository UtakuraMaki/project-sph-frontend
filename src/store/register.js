import { getSendCode, postRegister, postLogin, getUserInfo, getLogout } from "@/api/index.js"
export default {
  state: {
    token: localStorage.getItem('token') || '',
    userInfo: {}
  },
  mutations: {
    login(state, token) {
      state.token = token
    },
    userInfo(state, data) {
      state.userInfo = data
    },
    logout(state) {
      state.token = ''
      state.userInfo = {}
    }
  },
  getters: {},
  actions: {
    async sendCode(context, phone) {
      const result = await getSendCode(phone)
      if (result.code === 200) {
        return Promise.resolve(result.data)
      }
      else {
        return Promise.reject(new Error('失败'))
      }
    },
    async register(context, user) {
      const result = await postRegister(user)
      if (result.code === 200) {
        return Promise.resolve()
      }
      else {
        return Promise.reject(result.message)
      }
    },
    async login(context, user) {
      const result = await postLogin(user)
      if (result.code === 200) {
        localStorage.setItem('token', result.data.token)
        context.commit('login', result.data.token)
        return Promise.resolve()
      }
      else {
        return Promise.reject(result.message)
      }
    },
    async userInfo(context) {
      const result = await getUserInfo()
      if(result.code === 200) {
        context.commit('userInfo', result.data)
        return Promise.resolve()
      }
      else {
        return Promise.reject('失败')
      }
    },
    async logout(context) {
      const result = await getLogout()
      if(result.code === 200) {
        localStorage.removeItem('token')
        context.commit('logout')
        return Promise.resolve()
      }
    }
  }
}