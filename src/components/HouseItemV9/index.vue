<template>
  <div class="house-item">
    <div class="item-inner">
      <div class="cover">
        <img :src="itemData.image.url" alt="" />
      </div>
      <div class="info">
        <div class="summary">{{ itemData.summaryText }}</div>
        <div class="name">{{ itemData.houseName }}</div>
        <div class="bottom">
          <van-rate
            :model-value="itemScore"
            color="#fff"
            :size="15"
            readonly
            allow-half
          />
          <div class="price">¥{{ itemData.finalPrice }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  itemData: {
    type: Object,
    default: () => ({}),
  },
});

// 转为Number类型
const itemScore = computed(() => Number(props.itemData.commentScore));
</script>

<style lang="less" scoped>
.house-item {
  width: 50%;
  .item-inner {
    position: relative;
    margin: 5px;
    background-color: #fff;

    // overflow: hidden;
    .cover {
      img {
        width: 100%;
        border-radius: 6px;
      }
    }

    .info {
      position: absolute;
      bottom: 0;
      padding: 8px 10px;
      color: #fff;

      .summary {
        font-size: 12px;
      }
      .name {
        margin: 5px 0;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      .bottom {
        display: flex;
        justify-content: space-between;
        margin-top: 10px;
      }
    }
  }
}
</style>
