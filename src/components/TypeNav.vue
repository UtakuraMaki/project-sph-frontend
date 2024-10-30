<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <div
        @mouseleave="
          (activeIndex = -1),
            $route.path === '/home' ? sortShow : (sortShow = false)
        "
        @mouseenter="sortShow = true"
      >
        <h2 class="all">全部商品分类</h2>
        <transition>
          <div class="sort" v-show="sortShow">
            <div class="all-sort-list2" @click.prevent="navToSearch">
              <div
                class="item"
                v-for="(l1, index) in $store.state.baseCategoryList"
                :key="l1.categoryId"
                @mouseenter="updateActiveIndex(index)"
                :class="{ active: index === activeIndex }"
              >
                <h3>
                  <a
                    href=""
                    :data-categoryName="l1.categoryName"
                    :data-category1Id="l1.categoryId"
                    >{{ l1.categoryName }}</a
                  >
                </h3>
                <div
                  class="item-list clearfix"
                  :style="{ display: activeIndex === index ? 'block' : 'none' }"
                >
                  <div
                    class="subitem"
                    v-for="l2 in l1.categoryChild"
                    :key="l2.categoryId"
                  >
                    <dl class="fore">
                      <dt>
                        <a
                          href=""
                          :data-categoryName="l2.categoryName"
                          :data-category2Id="l2.categoryId"
                          >{{ l2.categoryName }}</a
                        >
                      </dt>
                      <dd>
                        <em v-for="l3 in l2.categoryChild" :key="l3.categoryId">
                          <a
                            href=""
                            :data-categoryName="l3.categoryName"
                            :data-category3Id="l3.categoryId"
                            >{{ l3.categoryName }}</a
                          >
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
const throttle = require("lodash/throttle.js");
export default {
  name: "TypeNav",
  data() {
    return {
      activeIndex: -1,
      sortShow: true,
    };
  },
  methods: {
    updateActiveIndex: throttle(function (index) {
      this.activeIndex = index;
    }, 50),
    navToSearch(e) {
      let { categoryname, category1id, category2id, category3id } =
        e.target.dataset;
      if (categoryname) {
        // this.$router.push({
        //   name: 'search',
        //   query: {
        //     category1Id: category1id,
        //     category2Id: category2id,
        //     category3Id: category3id,
        //     categoryName: categoryname
        //   },
        //   params: this.$route.params
        // })
        if (category1id) {
          this.$router.push({
            name: "search",
            query: {
              categoryName: categoryname,
              category1Id: category1id,
            },
            params: this.$route.params
          });
        } else if (category2id) {
          this.$router.push({
            name: "search",
            query: {
              categoryName: categoryname,
              category2Id: category2id,
            },
            params: this.$route.params
          });
        } else {
          this.$router.push({
            name: "search",
            query: {
              categoryName: categoryname,
              category3Id: category3id,
            },
            params: this.$route.params
          });
        }
      }
    },
  },
  created() {
    // this.$store.dispatch("baseCategoryList");
    if (this.$route.path !== "/home") {
      this.sortShow = false;
    }
  },
};
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          // &:hover {
          //   .item-list {
          //     display: block;
          //   }
          // }

          &.active {
            background-color: skyblue;
          }
        }
      }
    }
    .v-enter {
      opacity: 0;
    }
    .v-enter-to {
      opacity: 1;
    }
    .v-enter-active {
      transition: all 0.5s linear;
    }
    .v-leave {
      opacity: 1;
    }
    .v-leave-to {
      opacity: 0;
    }
    .v-leave-active {
      transition: all 0.5s linear;
    }
  }
}
</style>