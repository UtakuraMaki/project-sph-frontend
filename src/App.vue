<template>
  <div>
    <Header></Header>
    <router-view></router-view>
    <Footer v-show="$route.meta.footerShow"></Footer>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
export default {
  components: {
    Header, Footer
  },
  created () {
    this.$store.dispatch('baseCategoryList')
  }
}
</script>

<style scoped>

</style>