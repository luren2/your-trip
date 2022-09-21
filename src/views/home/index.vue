<template>
  <div class="home">
    <HomeNavBar />
    <div class="banner">
      <img src="@/assets/img/home/banner.webp" alt="" />
    </div>
    <HomeSearchBox />
    <HomeCategories />
    <div class="search-bar" v-if="isShowSearchBar">搜索框</div>
    <HomeContent />
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue';
import HomeNavBar from './cpns/HomeNavBar.vue';
import HomeSearchBox from './cpns/HomeSearchBox.vue';
import HomeCategories from './cpns/HomeCategories.vue';
import HomeContent from './cpns/HomeContent.vue';
import useHomeStore from '@/stores/modules/home';
import useScroll from '@/hooks/useScroll.js';

// 请求数据 热门建议/类别
const homeStore = useHomeStore();
homeStore.fetchHotSuggests();
homeStore.fetchCategories();
homeStore.fetchHouseList();

//监听是否滚动到底部
const { isReachBottom, scrollTop } = useScroll();
watch(isReachBottom, (newValue) => {
  if (newValue) {
    // 数据加载出来再赋值
    homeStore.fetchHouseList().then(() => {
      isReachBottom.value = false;
    });
  }
});

// 搜索框显示的控制
// const isShowSearchBar = ref(false);
// watch(scrollTop, (newValue) => {
//   isShowSearchBar.value = newValue >= 100;
// });
const isShowSearchBar = computed(() => {
  return scrollTop.value >= 100;
});
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
