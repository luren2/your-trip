<template>
  <div class="search">
    <div class="search-bar">
      <div class="select-time">
        <div class="item start">
          <div class="name">住</div>
          <div class="date">{{ startDate }}</div>
        </div>
        <div class="item end">
          <div class="name">离</div>
          <div class="date">{{ endDate }}</div>
        </div>
      </div>
      <div class="content">
        <div class="keyword">关键字/位置/民宿</div>
      </div>
      <div class="right">
        <i class="icon-search"></i>
      </div>
    </div>
  </div>
</template>

<script setup>
import useMainStore from '@/stores/modules/main';
import { formatDate } from '@/utils/format_date';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

const mainStore = useMainStore();
const { today, tomorrow } = storeToRefs(mainStore);
const startDate = computed(() => formatDate(today.value, 'MM.DD'));
const endDate = computed(() => formatDate(tomorrow.value, 'MM.DD'));
</script>

<style lang="less" scoped>
.search {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 71px;
  background: #fff;
  z-index: 100;
  opacity: 1;
  transition: all 2s linear;

  padding: 16px 16px 10px;
}
.search-bar {
  display: flex;
  height: 45px;
  width: 100%;
  line-height: 45px;
  padding: 6px 10px;
  align-items: center;
  border-radius: 8px;
  background: var(--primary-color);

  .select-time {
    font-size: 14px;
    display: flex;
    flex-direction: column;
    padding-right: 5px;
    .item {
      display: flex;
      flex-direction: row;
      align-items: center;
      padding-right: 5px;
      font-size: 10px;
      line-height: normal;
      .name {
        padding-right: 2px;
      }
      .date {
        margin-top: 1px;
      }
    }
  }

  .content {
    position: relative;
    flex: 1;
    padding: 0 8px;

    border-left: 1px solid pink;
    display: flex;
    align-items: center;

    .keyword {
      padding-left: 10px;
      font-size: 12px;
      color: #999;
      width: 100%;
      text-align: left;
      height: 30px;
      line-height: 30px;
      background: white;
      opacity: 0.9;
      border-radius: 20px;
      color: black;
    }
  }
  .right {
    display: flex;
    .icon-search {
      width: 24px;
      height: 24px;
      background-image: url(../../assets/img/home/home-sprite.png);
      background-position: -29px -151px;
      background-size: 207px 192px;
    }
  }
}
</style>
