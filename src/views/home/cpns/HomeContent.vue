<template>
  <div class="content">
    <h2 class="title">热门精选</h2>

    <div class="list">
      <template v-for="(item, index) in houseList" :key="item.data.houseId">
        <HouseItemV3
          :itemData="item.data"
          v-if="item.discoveryContentType === 3"
          @click="itemClick(item.data.houseId)"
        />
        <HouseItemV9
          :itemData="item.data"
          v-else-if="item.discoveryContentType === 9"
          @click="itemClick(item.data.houseId)"
        />
      </template>
    </div>
  </div>
</template>

<script setup>
import HouseItemV3 from '@/components/HouseItemV3/index.vue';
import HouseItemV9 from '@/components/HouseItemV9/index.vue';
import useHomeStore from '@/stores/modules/home';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';

const homeStore = useHomeStore();
const { houseList } = storeToRefs(homeStore);

const router = useRouter();
//跳转详情页 传递id
const itemClick = (houseId) => {
  router.push(`detail/${houseId}`);
};
</script>

<style lang="less" scoped>
.content {
  .title {
    font-size: 22px;
    margin: 20px 0 10px 10px;
  }
  .list {
    display: flex;
    flex-wrap: wrap;
  }
}
</style>
