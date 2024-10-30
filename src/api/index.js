import axios from 'axios'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import store from '@/store/index.js'

const customAxios = axios.create({
  // baseURL: 'http://gmall-h5-api.atguigu.cn/api',
  baseURL: '/api',
  timeout: 5000,
})

customAxios.interceptors.request.use(function (config) {
  nprogress.start()
  if (store.state.uuid) {
    config.headers.userTempId = store.state.uuid
  }
  if (store.state.register.token) {
    config.headers.token = store.state.register.token
  }
  return config
}, function (error) {
  nprogress.done()
  return Promise.reject(error)
})

customAxios.interceptors.response.use(function (response) {
  nprogress.done()
  return response.data
}, function (error) {
  nprogress.done()
  return Promise.reject(error)
})

export function getBaseCategoryList() {
  return customAxios({
    url: '/product/getBaseCategoryList',
    method: 'GET'
  })
}

export function getList(data) {
  return customAxios({
    url: '/list',
    method: 'POST',
    data: data || {}
  })
}

export function getItem(skuId) {
  return customAxios({
    url: `/item/${skuId}`,
    method: 'GET',
  })
}

export function postAddToCart(skuId, skuNum) {
  return customAxios({
    url: `/cart/addToCart/${skuId}/${skuNum}`,
    method: 'POST'
  })
}

export function getCartList() {
  return customAxios({
    url: '/cart/cartList',
    method: 'GET'
  })
}

export function deleteCart(skuId) {
  return customAxios({
    url: `/cart/deleteCart/${skuId}`,
    method: 'DELETE'
  })
}

export function getCheckCart(skuID, isChecked) {
  return customAxios({
    url: `/cart/checkCart/${skuID}/${isChecked}`,
    method: 'GET'
  })
}

export function getSendCode(phone) {
  return customAxios({
    url: `/user/passport/sendCode/${phone}`,
    method: 'GET'
  })
}

export function postRegister({ phone, code, password }) {
  return customAxios({
    url: '/user/passport/register',
    method: 'POST',
    data: {
      phone, code, password
    }
  })
}

export function postLogin({ phone, password }) {
  return customAxios({
    url: '/user/passport/login',
    method: 'POST',
    data: {
      phone, password
    }
  })
}

export function getUserInfo() {
  return customAxios({
    url: '/user/passport/auth/getUserInfo',
    method: 'GET'
  })
}

export function getLogout() {
  return customAxios({
    url: '/user/passport/logout',
    method: 'GET'
  })
}

export function getFindUserAddressList() {
  return customAxios({
    url: '/user/userAddress/auth/findUserAddressList',
    method: 'GET'
  })
}

export function getTrade() {
  return customAxios({
    url: '/order/auth/trade',
    method: 'get'
  })
}

export function postSubmitOrder({ tradeNo, consignee, consigneeTel, deliveryAddress, paymentWay, orderComment, orderDetailList }) {
  return customAxios({
    url: `/order/auth/submitOrder?tradeNo=${tradeNo}`,
    method: 'POST',
    data: {
      consignee, consigneeTel, deliveryAddress, paymentWay, orderComment, orderDetailList
    }
  })
}

export function getCreateNative(orderId) {
  return customAxios({
    url: `/payment/weixin/createNative/${orderId}`,
    method: 'GET'
  })
}

export function getQueryPayStatus(orderId) {
  return customAxios({
    url: `/payment/weixin/queryPayStatus/${orderId}`,
    method: 'GET'
  })
}

export function getAuth({page, limit}) {
  return customAxios({
    url: `/order/auth/${page}/${limit}`,
    method: 'GET'
  })
}