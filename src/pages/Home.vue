<template>
  <div>
    <TypeNav></TypeNav>
    <ListContainer></ListContainer>
    <TodayRecommend></TodayRecommend>
    <Rank></Rank>
    <Like></Like>
    <Floor v-for="item in $store.state.home.floors" :key="item.id" :floor="item"></Floor>
    <Brand></Brand>
  </div>
</template>

<script>
import ListContainer from "@/components/Home/ListContainer.vue";
import TodayRecommend from "@/components/Home/TodayRecommend.vue";
import Rank from "@/components/Home/Rank.vue";
import Like from "@/components/Home/Like.vue";
import Floor from "@/components/Home/Floor.vue";
import Brand from "@/components/Home/Brand.vue";
export default {
  components: {
    ListContainer,
    TodayRecommend,
    Rank,
    Like,
    Floor,
    Brand,
  },
  mounted () {
    this.$store.dispatch('floors')
  }
};
</script>

<style>
</style>