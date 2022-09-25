<template>
  <div class="search-box">
    <!-- 位置信息 -->
    <div class="location">
      <div class="city" @click="cityClick">{{ currentCity.cityName }}</div>
      <div class="position" @click="positionClick">我的位置</div>
      <img src="@/assets/img/home/icon_position.png" alt="" />
    </div>

    <!-- 日期范围 -->
    <div class="data-range" @click="showCalendar = true">
      <div class="start">
        <span class="tip">入住</span>
        <span class="time">{{ startDate }}</span>
      </div>
      <div class="stay">共{{ stayDays }}晚</div>
      <div class="end">
        <span class="tip">离店</span>
        <span class="time">{{ endDate }}</span>
      </div>
    </div>

    <!-- 日历组件 -->
    <van-calendar
      v-model:show="showCalendar"
      type="range"
      @confirm="onConfirm"
      color="var(--primary-color)"
    />

    <!-- 价格/人数选择 -->
    <div class="price-counter">
      <div class="start">价格不限</div>
      <div class="end">人数不限</div>
    </div>

    <!-- 关键字 -->

    <div class="keyword">关键字/位置/民俗名</div>

    <!-- 热门推荐 -->
    <div class="hot-suggest">
      <template v-for="(item, index) in hotSuggests" :key="item">
        <div
          class="text"
          :style="{
            color: item.tagText.color,
            background: item.tagText.background.color,
          }"
        >
          {{ item.tagText.text }}
        </div>
      </template>
    </div>

    <!-- 搜索按钮 -->
    <div class="search-btn">
      <div class="btn" @click="startSearch">开始搜索</div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import useCityStore from '@/stores/modules/city';
import useHomeStore from '@/stores/modules/home';
import { storeToRefs } from 'pinia';
import { ref, computed } from 'vue';
import { formatDate, getDiffDays } from '@/utils/format_date';
import { formatCity } from '@/utils/format_city';
import axios from 'axios';
import useMainStore from '@/stores/modules/main';

//位置/城市
const router = useRouter();
const cityClick = () => {
  router.push('/city');
};
//通过经度纬度请求百度API获取当前位置
const latitude = ref();
const longitude = ref();
const positionClick = () => {
  navigator.geolocation.getCurrentPosition(
    (res) => {
      latitude.value = res.coords.latitude;
      longitude.value = res.coords.longitude;
      axios
        .get(`/api?location=${latitude.value},${longitude.value}&output=json`)
        .then((ress) => {
          const cityStore = useCityStore();
          const city = formatCity(ress.data.result.addressComponent.city);

          cityStore.fetchCurrentLocation(city);
        });
    },
    (err) => {
      console.log(err);
    },
    {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 10000,
    }
  );
};
// 获取当前选中的城市
const cityStore = useCityStore();
const { currentCity } = storeToRefs(cityStore);

// 日期范围的处理
const mainStore = useMainStore();
const { today, tomorrow } = storeToRefs(mainStore);
const startDate = computed(() => formatDate(today.value));
const endDate = computed(() => formatDate(tomorrow.value));
const stayDays = ref(getDiffDays(today.value, tomorrow.value));

// 日历相关
const showCalendar = ref(false);
const onConfirm = (values) => {
  const [start, end] = values;
  showCalendar.value = false;
  mainStore.today = start;
  mainStore.tomorrow = end;
  stayDays.value = getDiffDays(start, end);
};

// 热门建议
const homeStore = useHomeStore();
const { hotSuggests } = storeToRefs(homeStore);

//开始搜索 query传参(能在url看到)
const startSearch = () => {
  router.push({
    path: '/search',
    query: {
      startDate: startDate.value,
      endDate: endDate.value,
      currentCity: currentCity.value.cityName,
    },
  });
};
</script>

<style lang="less" scoped>
.search-box {
  .location {
    display: flex;

    align-items: center;
    height: 44px;
    padding: 20px;
    .city {
      flex: 1;
      font-size: 15px;
    }
    .position {
      width: 65px;
      text-align: center;
      color: #666;
      font-size: 13px;
    }
    img {
      width: 16px;
    }
  }

  .data-range {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 12px;
    padding: 0 55px 0 20px;

    .start {
      display: flex;
      flex-direction: column;

      .tip {
        color: #999999;
        margin-bottom: 3px;
      }
      .time {
        font-weight: 500;
        font-size: 15px;
      }
    }

    .end {
      display: flex;
      flex-direction: column;
      .tip {
        color: #999999;
        margin-bottom: 3px;
      }
      .time {
        font-size: 15px;
      }
    }
  }
  .price-counter {
    color: #999999;
    padding: 0 62px 0 20px;
    display: flex;
    justify-content: space-between;
    margin: 20px 0;
    font-weight: 100;
    font-size: 14px;
    .start {
      border-right: 1px solid #f8f7f6;
    }
  }
  .keyword {
    padding: 0 20px;
    font-size: 14px;
    color: #999999;
  }
  .hot-suggest {
    padding: 0 55px 0 20px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    color: #999;
    margin-top: 20px;

    .text {
      font-size: 12px;
      padding: 4px 8px;
      border-radius: 14px;
      margin: 4px;
    }
  }

  .search-btn {
    display: flex;
    justify-content: center;
    margin: 15px 0;
    .btn {
      text-align: center;
      width: 342px;
      height: 38px;
      max-height: 50px;
      font-size: 18px;
      line-height: 38px;
      border-radius: 20px;
      color: #fff;
      background-image: var(--theme-linear-gradient);
    }
  }
}
</style>
