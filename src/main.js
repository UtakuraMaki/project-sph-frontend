import Vue from 'vue'
import App from './App.vue'
import TypeNav from '@/components/TypeNav.vue'
import Carousel from '@/components/Carousel.vue'
import Pagination from '@/components/Pagination.vue'
import router from './router/index.js'
import store from './store/index.js'
import './mock/mockServer.js'
import VueLazyload from 'vue-lazyload'

import { Button, MessageBox } from 'element-ui'

Vue.component(TypeNav.name, TypeNav)
Vue.component(Carousel.name, Carousel)
Vue.component(Pagination.name, Pagination)
Vue.component(Button.name, Button)
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
import atm from '@/assets/1.gif'
Vue.use(VueLazyload, {
  loading: atm
})

// 使用vue-validate进行表单验证
import VeeValidate, { Validator } from 'vee-validate'
Vue.use(VeeValidate)
import zh_CN from 'vee-validate/dist/locale/zh_CN.js'
Validator.localize('zh_CN', {
  messages: {
    ...zh_CN.messages,
    is: (field) => `${field}必须与密码相同`,
    required: (field) => `${field}是必填项`
  },
  attributes: {
    phone: '手机号',
    vcode: '验证码',
    password: '密码',
    confirmPassword: '确认密码',
    agreement: '用户协议'
  }
})
Validator.extend('agree', {
  validate: (value) => {
    return value
  },
  getMessage: (field) => {
    return `${field}必须同意`
  }
})

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
