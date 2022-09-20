<template>
  <div class="categories">
    <template v-for="(item, index) in categories" :key="item">
      <div class="item">
        <img :src="item.pictureUrl" alt="" />
        <div class="text">{{ item.title }}</div>
      </div>
    </template>
  </div>
</template>

<script setup>
import useHomeStore from '@/stores/modules/home';
import { storeToRefs } from 'pinia';

const homeStore = useHomeStore();
const { categories } = storeToRefs(homeStore);
</script>

<style lang="less" scoped>
.categories {
  display: flex;
  justify-content: space-between;
  overflow-x: auto;
  padding: 0 10px;
  &::-webkit-scrollbar {
    display: none;
  }

  .item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 70px;
    text-align: center;
    flex-shrink: 0;

    img {
      width: 32px;
      height: 32px;
    }
  }
  .text {
    font-size: 12px;
    margin-top: 5px;
  }
}
</style>
