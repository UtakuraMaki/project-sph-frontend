import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store/index.js'

const originPush = VueRouter.prototype.push
VueRouter.prototype.push = function (location, onComplete, onAbort) {
  if (onComplete && onAbort) {
    originPush.call(this, location, onComplete, onAbort)
  }
  else {
    originPush.call(this, location, () => { }, () => { })
  }
}
const originReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function (location, onComplete, onAbort) {
  if (onComplete && onAbort) {
    originReplace.call(this, location, onComplete, onAbort)
  }
  else {
    originReplace.call(this, location, () => { }, () => { })
  }
}

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      name: 'home',
      path: '/home',
      component: () => import('@/pages/Home.vue'),
      meta: {
        footerShow: true,
      }
    },
    {
      name: 'search',
      path: '/search/:keyword?',
      component: () => import('@/pages/Search.vue'),
      meta: {
        footerShow: true,
      },
    },
    {
      name: 'login',
      path: '/login',
      component: () => import('@/pages/Login.vue'),
      meta: {
        footerShow: false,
      }
    },
    {
      path: '/register',
      component: () => import('@/pages/Register.vue'),
      meta: {
        footerShow: false,
      }
    },
    {
      path: '/detail/:skuId',
      component: () => import('@/pages/Detail.vue'),
      meta: {
        footerShow: true
      }
    },
    {
      name: 'addcartsuccess',
      path: '/addcartsuccess',
      component: () => import('@/pages/AddCartSuccess.vue'),
      meta: {
        footerShow: true
      }
    },
    {
      name: 'shopcart',
      path: '/shopcart',
      component: () => import('@/pages/ShopCart.vue'),
      meta: {
        footerShow: true,
      }
    },
    {
      name: 'trade',
      path: '/trade',
      component: () => import('@/pages/Trade.vue'),
      meta: {
        footerShow: true,
        needToken: true,
      },
      beforeEnter: (to, from, next) => {
        if(from.path === '/shopcart') {
          next()
        }
        else {
          next(false)
        }
      }
    },
    {
      name: 'pay',
      path: '/pay',
      component: () => import('@/pages/Pay.vue'),
      meta: {
        footerShow: true,
        needToken: true
      },
      beforeEnter: (to, from, next) => {
        if(from.path === '/trade') {
          next()
        }
        else {
          next(false)
        }
      }
    },
    {
      name: 'paysuccess',
      path: '/paysuccess',
      component: () => import('@/pages/PaySuccess.vue'),
      meta: {
        footerShow: true,
        needToken: true
      },
      beforeEnter: (to, from, next) => {
        if(from.path === '/pay') {
          next()
        }
        else {
          next(false)
        }
      }
    },
    {
      name: 'center',
      path: '/center',
      component: () => import('@/pages/Center.vue'),
      meta: {
        footerShow: true,
        needToken: true,
      },
      children: [
        {
          path: '/center/myorder',
          component: () => import('@/pages/MyOrder.vue'),
          meta: {
            needToken: true,
          }
        },
        {
          path: '/center/grouporder',
          component: () => import('@/pages/GroupOrder.vue'),
          meta: {
            needToken: true
          }
        },
      ],
      redirect: '/center/myorder'
    },
  ],
  scrollBehavior() {
    return {
      x: 0,
      y: 0
    }
  }
})

router.beforeEach((to, from, next) => {
  if (store.state.register.token) {
    if (to.path === '/login') {
      next('/home')
    }
    else {
      if (store.state.register.userInfo.name) {
        next()
      }
      else {
        store.dispatch('userInfo').then(() => {
          next()
        }).catch((error) => {
          console.log(error)
          store.dispatch('logout').then(() => {
            next('/home')
          })
        })
      }
    }
  }
  else {
    if(to.meta.needToken) {
      next(`/login?redirect=${to.path}`)
    }
    else {
      next()
    }
  }
})

export default router