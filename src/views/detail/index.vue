<template>
  <div class="detail hide-tabbar">
    <van-nav-bar
      title="房屋详情"
      left-text="your trip"
      left-arrow
      @click-left="onClickLeft"
    />
    <DetailSwiper
      :swipeData="detail.mainPart?.topModule.housePicture.housePics"
    />
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import useDetailStore from '@/stores/modules/detail';
import { storeToRefs } from 'pinia';
import DetailSwiper from './cpns/DetailSwiper.vue';

//返回首页
const route = useRoute();
const router = useRouter();
const onClickLeft = () => {
  router.push('/home');
};

//请求详情页数据
const detailStore = useDetailStore();
detailStore.feachDetails(route.params.id);
const { detail } = storeToRefs(detailStore);
</script>

<style lang="less" scoped>
.detail {
  --van-nav-bar-title-text-color: var(--primary-color);
}
</style>
