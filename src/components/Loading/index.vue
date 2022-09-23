<template>
  <div class="loading" v-show="isLoading" @click="() => (isLoading = false)">
    <van-loading :size="30" type="spinner" color="var(--primary-color)" />
  </div>
</template>

<script setup>
import useMainStore from '@/stores/modules/main';
import { storeToRefs } from 'pinia';

const mainStore = useMainStore();
const { isLoading } = storeToRefs(mainStore);
</script>

<style lang="less" scoped>
.loading {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
