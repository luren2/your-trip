<template>
  <RouterView />
  <!-- <RouterLink to="./home">首页</RouterLink>
  <RouterLink to="./favor">收藏</RouterLink>
  <RouterLink to="./order">订单</RouterLink>
  <RouterLink to="./message">消息</RouterLink> -->
  <!-- <TabBar v-if="!route.meta.hideTabBar" /> -->
  <TabBar />
</template>

<script setup>
import TabBar from '@/components/TabBar/index.vue';
import { useRoute } from 'vue-router';
const route = useRoute();
</script>

<style scoped></style>
