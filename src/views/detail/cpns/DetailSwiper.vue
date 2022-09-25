<template>
  <div>
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="(item, index) in swipeData" :key="item">
        <img :src="item.url" alt="" />
      </van-swipe-item>
      <template #indicator="{ active, total }">
        <div class="custom-indicator">
          <template v-for="(value, key, index) in swiperGroup" :key="key">
            <span
              class="item"
              :class="{
                active: swipeData[active]?.enumPictureCategory == key,
              }"
            >
              <span class="text">
                {{ getName(value[0].title) }}
              </span>
              <span
                class="count"
                v-if="swipeData[active]?.enumPictureCategory == key"
              >
                {{ getCategoryIndex(swipeData[active]) }} / {{ value.length }}
              </span>
            </span>
          </template>
          <span class="total-count">{{ active + 1 }}/{{ total }}</span>
        </div>
      </template>
    </van-swipe>
  </div>
</template>

<script setup>
import { onMounted, watchEffect } from 'vue';

const props = defineProps({
  swipeData: {
    type: Array,
    default: () => [],
  },
});

//对数据进行转换

const swiperGroup = {};
watchEffect(() => {
  for (const item of props.swipeData) {
    swiperGroup[item.enumPictureCategory] = swiperGroup[
      item.enumPictureCategory
    ]
      ? swiperGroup[item.enumPictureCategory]
      : [];
    swiperGroup[item.enumPictureCategory].push(item);
  }
});
// bug 刷新页面才行
onMounted(() => {
  if (window.location.href.indexOf('#reloaded') == -1) {
    window.location.href = window.location.href + '#reloaded';
    window.location.reload();
  }
});

// 正则处理文字
const nameReg = /【(.*?)】/i;
const getName = (name) => {
  const results = nameReg.exec(name);
  return results[1];
};

const getCategoryIndex = (currentItem) => {
  for (const key in swiperGroup) {
    const index = swiperGroup[key].findIndex((item) => item === currentItem);
    if (index !== -1) return index + 1;
  }
};
</script>

<style lang="less" scoped>
.my-swipe {
  img {
    width: 100%;
  }
  .custom-indicator {
    height: 25px;
    display: flex;
    align-items: center;
    position: absolute;
    right: 5px;
    bottom: 5px;
    padding: 2px 5px;
    font-size: 12px;
    color: #fff;
    background: rgba(0, 0, 0, 0.8);
    .item {
      // height: 16px;
      // line-height: 16px;
      margin: 0 3px;
      padding: 0 4px;
      color: #fff;
      display: flex;
      text-align: center;
      &.active {
        border-radius: 10px;
        background-color: #fff;
        color: #111;
        font-weight: 600;
      }
      .text {
        padding-right: 3px;
      }
    }

    .total-count {
      text-align: center;
      margin: 0 3px;
      // padding: 0 4px;
      display: inline-block;
      width: 30px;
    }
  }
}
</style>
