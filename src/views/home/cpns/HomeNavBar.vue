<template>
  <div class="nav-bar">
    <div class="title">Your trip</div>
  </div>
</template>

<script setup></script>

<style lang="less" scoped>
.nav-bar {
  height: 46px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #f2f2f2;

  .title {
    font-size: 18px;
    font-weight: bold;
    color: var(--primary-color);
  }
}
</style>
