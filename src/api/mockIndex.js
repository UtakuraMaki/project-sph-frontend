import axios from 'axios'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'

const mockAxios = axios.create({
  baseURL: '/mock',
  timeout: 5000
})

mockAxios.interceptors.request.use(function (config) {
  nprogress.start()
  return config
}, function (error) {
  nprogress.done()
  return Promise.reject(error)
})

mockAxios.interceptors.response.use(function (response) {
  nprogress.done()
  return response.data
}, function (error) {
  nprogress.done()
  return Promise.reject(error)
})

export function getBanners () {
  return mockAxios({
    url: '/banners',
    method: 'GET'
  })
}

export function getFloors () {
  return mockAxios({
    url: '/floors',
    method: 'GET'
  })
}