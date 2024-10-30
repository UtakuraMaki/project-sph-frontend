<template>
  <div class="spec-preview">
    <img :src="imgObj.imgUrl" />
    <div class="event" @mousemove="fn"></div>
    <div class="big">
      <img :src="imgObj.imgUrl" ref="big"/>
    </div>
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
import Bus from '@/utils/EventBus.js'
  export default {
    name: "Zoom",
    data () {
      return {
        activeIndex: 0
      }
    },
    props: ['skuImageList'],
    computed: {
      imgObj () {
        return this.skuImageList[this.activeIndex] || {}
      },
    },
    created() {
      Bus.$on('changeActiveIndex', (index) => {
        this.activeIndex = index
      })
    },
    methods: {
      fn (e) {
        let mask_x = this.$refs.mask.offsetLeft
        let mask_y = this.$refs.mask.offsetTop
        let mask_w = this.$refs.mask.offsetWidth
        let mask_h = this.$refs.mask.offsetHeight
        let mouse_x = e.offsetX
        let mouse_y = e.offsetY
        
        mask_x = mouse_x - mask_w / 2
        mask_y = mouse_y - mask_h / 2

        if (mask_x < 0) {
          mask_x = 0
        }
        if (mask_x > e.target.offsetWidth - mask_w) {
          mask_x = e.target.offsetWidth - mask_w
        }
        if (mask_y < 0) {
          mask_y = 0
        }
        if (mask_y > e.target.offsetHeight - mask_h) {
          mask_y = e.target.offsetHeight - mask_h
        }
        this.$refs.mask.style.left = `${mask_x}px`
        this.$refs.mask.style.top = `${mask_y}px`

        this.$refs.big.style.left = `-${2 * mask_x}px`
        this.$refs.big.style.top = `-${2 * mask_y}px`
      }
    }
  }
</script>

<style lang="less" scoped>
  .spec-preview {
    position: relative;
    width: 400px;
    height: 400px;
    border: 1px solid #ccc;

    img {
      width: 100%;
      height: 100%;
    }

    .event {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 998;
    }

    .mask {
      width: 50%;
      height: 50%;
      background-color: rgba(0, 255, 0, 0.3);
      position: absolute;
      left: 0;
      top: 0;
      display: none;
    }

    .big {
      width: 100%;
      height: 100%;
      position: absolute;
      top: -1px;
      left: 100%;
      border: 1px solid #aaa;
      overflow: hidden;
      z-index: 998;
      display: none;
      background: white;

      img {
        width: 200%;
        max-width: 200%;
        height: 200%;
        position: absolute;
        left: 0;
        top: 0;
      }
    }

    .event:hover~.mask,
    .event:hover~.big {
      display: block;
    }
  }
</style>