<template>
  <div class="city hide-tabbar">
    <div class="top">
      <van-search
        v-model="serachValue"
        placeholder="请输入城市"
        shape="round"
        show-action
        @cancel="onCancel"
      />
      <van-tabs v-model:active="active" color="var(--primary-color)">
        <template v-for="(value, key, index) in allCities" :key="key">
          <van-tab :title="value.title" :name="key"></van-tab>
        </template>
      </van-tabs>
    </div>
    <div class="content">
      <template v-for="(value, key, index) in allCities" :key="key">
        <CityGroup v-show="active === key" :groupData="value" />
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import useCityStore from '@/stores/modules/city';
import { storeToRefs } from 'pinia';

import CityGroup from './cpns/CityGroup.vue';
//搜索框功能
const serachValue = ref('');
const router = useRouter();
const onCancel = () => {
  router.push('/home');
};

// tab切换
const active = ref('cityGroup');

//请求城市数据 默认最好为空 没有数据时不会报错
const cityStore = useCityStore();
cityStore.fetchAllCitiesAction();
const { allCities } = storeToRefs(cityStore);

//获取选中标签后的数据 computed动态计算
// const currentGroup = computed(() => allCities.value[active.value]);
</script>

<style lang="less" scoped>
.city {
  // top固定定位
  padding-top: 98px;
  .top {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    // position: relative;
    z-index: 9;
  }
  //设置局部滚动 要设置高度
  .content {
    height: calc(100vh - 98px);
    overflow-y: auto;
  }
}
</style>
