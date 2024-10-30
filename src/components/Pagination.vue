<template>
  <div class="pagination">
    <button @click="switchPageNo(pageNo - 1)" :disabled="pageNo === 1">
      上一页
    </button>
    <button
      v-if="startAndEndPage.startPage >= 2"
      @click="switchPageNo(1)"
      :class="{ active: pageNo === 1 }"
    >
      1
    </button>
    <button v-if="startAndEndPage.startPage > 2">···</button>

    <button
      v-for="(item, index) in startAndEndPage.endPage"
      :key="index"
      v-if="item >= startAndEndPage.startPage"
      @click="switchPageNo(item)"
      :class="{ active: pageNo === item }"
    >
      {{ item }}
    </button>

    <button v-if="startAndEndPage.endPage < totalPage - 1">···</button>
    <button
      v-if="startAndEndPage.endPage <= totalPage - 1"
      @click="switchPageNo(totalPage)"
      :class="{ active: pageNo === totalPage }"
    >
      {{ totalPage }}
    </button>
    <button @click="switchPageNo(pageNo + 1)" :disabled="pageNo === totalPage">
      下一页
    </button>

    <button style="margin-left: 30px">共 {{ total }} 条</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: ["pageNo", "pageSize", "total", "continues"],
  computed: {
    totalPage() {
      return Math.ceil(this.total / this.pageSize);
    },
    startAndEndPage() {
      let startPage = 0;
      let endPage = 0;
      if (this.totalPage < this.continues) {
        startPage = 1;
        endPage = this.totalPage;
      } else {
        startPage = this.pageNo - Math.floor(this.continues / 2);
        endPage = this.pageNo + Math.floor(this.continues / 2);
        if (startPage < 1) {
          startPage = 1;
          endPage = this.continues;
        } else if (endPage > this.totalPage) {
          endPage = this.totalPage;
          startPage = this.totalPage - this.continues + 1;
        }
      }
      return { startPage, endPage };
    },
  },
  methods: {
    switchPageNo(page) {
      this.$emit("switchPageNo", page);
    },
  },
};
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
.active {
  background-color: skyblue;
}
</style>