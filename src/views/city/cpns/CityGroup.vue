<template>
  <div class="city-group">
    <van-index-bar :sticky="false" :index-list="indeList">
      <van-index-anchor index="热门" />
      <div class="hot-city">
        <template v-for="item in groupData.hotCities" :key="item">
          <div class="city" @click="cityClick(item)">
            {{ item.cityName }}
          </div>
        </template>
      </div>
      <template v-for="item in groupData.cities" :key="item">
        <van-index-anchor :index="item.group" />
        <div class="list">
          <template v-for="city in item.cities" :key="city">
            <van-cell @click="cityClick(city)" :title="city.cityName" />
          </template>
        </div>
      </template>
    </van-index-bar>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useCityStore } from '@/stores/modules/city';
const props = defineProps({
  groupData: {
    type: Object,
    default: () => ({}),
  },
});

const indeList = computed(() => {
  const list = props.groupData.cities.map((item) => item.group);
  list.unshift('#');
  return list;
});

const router = useRouter();
// 改变当前城市并跳回首页
const cityStore = useCityStore();
const cityClick = (city) => {
  cityStore.currentCity = city;
  router.push('/home');
};
</script>

<style lang="less" scoped>
.city-group {
  .hot-city {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 10px;
    padding-right: 25px;
    .city {
      width: 70px;
      height: 28px;
      border-radius: 14px;
      background-color: #fff4ec;
      font-size: 12px;
      text-align: center;
      line-height: 28px;
      margin: 5px 0;
    }
  }
}
</style>
