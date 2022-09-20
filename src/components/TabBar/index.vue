<template>
  <div class="tab-bar">
    <template v-for="(item, index) in TabBarList">
      <div
        class="tab-bar-item"
        @click="itemClick(index)"
        :class="{ active: index === currentIndex }"
      >
        <img
          v-if="index !== currentIndex"
          :src="getAssetUrl(item.image)"
          alt=""
        />
        <img v-else :src="getAssetUrl(item.imageActive)" alt="" />
        <span class="text">{{ item.title }}</span>
      </div>
    </template>
  </div>
</template>

<script setup>
import TabBarList from '@/assets/data/TabBarList';
import { getAssetUrl } from '@/utils/load_assets_img';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const currentIndex = ref(0);
const router = useRouter();
const itemClick = (index) => {
  currentIndex.value = index;
  router.push(TabBarList[index].path);
};
</script>

<style lang="less" scoped>
.tab-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50px;
  display: flex;
  justify-content: center;
  border-top: 1px solid #f3f3f3;
  background: #fff;
  .tab-bar-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    &.active {
      color: var(--primary-color);
    }
    img {
      width: 35px;
    }
    .text {
      font-size: 12px;
      margin-top: 2px;
    }
  }
}
</style>
