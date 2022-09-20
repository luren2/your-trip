<template>
  <div class="home">
    <HomeNavBar />
    <div class="banner">
      <img src="@/assets/img/home/banner.webp" alt="" />
    </div>
    <HomeSearchBox />
    <HomeCategories />
    <HomeContent />
  </div>
</template>

<script setup>
import HomeNavBar from './cpns/HomeNavBar.vue';
import HomeSearchBox from './cpns/HomeSearchBox.vue';
import HomeCategories from './cpns/HomeCategories.vue';
import HomeContent from './cpns/HomeContent.vue';
import useHomeStore from '@/stores/modules/home';

// 请求数据 热门建议/类别
const homeStore = useHomeStore();
homeStore.fetchHotSuggests();
homeStore.fetchCategories();
homeStore.fetchHouseList();
</script>

<style lang="less" scoped>
.home {
  padding-bottom: 50px;
  .banner {
    img {
      width: 100%;
    }
  }
}
</style>
