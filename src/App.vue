<template>
  <RouterView v-if="isRouterActive" v-slot="{ Component }">
    <KeepAlive include="home">
      <component :is="Component" />
    </KeepAlive>
  </RouterView>
  <!-- <RouterLink to="./home">首页</RouterLink>
  <RouterLink to="./favor">收藏</RouterLink>
  <RouterLink to="./order">订单</RouterLink>
  <RouterLink to="./message">消息</RouterLink> -->
  <!-- <TabBar v-if="!route.meta.hideTabBar" /> -->
  <TabBar />
  <Loading />
</template>

<script setup>
import TabBar from '@/components/TabBar/index.vue';
import Loading from './components/Loading/index.vue';
import { ref, provide, nextTick } from 'vue';
const isRouterActive = ref(true);
provide('reload', () => {
  isRouterActive.value = false;
  nextTick(() => {
    isRouterActive.value = true;
  });
});
</script>

<style scoped></style>
