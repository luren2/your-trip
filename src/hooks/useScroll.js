import { onActivated, onDeactivated, onMounted, onUnmounted, ref } from 'vue';

export default function useScroll() {
  const isReachBottom = ref(false);

  const listenScroll = () => {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;
    // 有误差 取整 精度问题
    if (parseInt(scrollHeight - scrollTop) <= clientHeight) {
      console.log('滚到底部了!!!');
      isReachBottom.value = true;
    }
  };

  onMounted(() => {
    window.addEventListener('scroll', listenScroll);
  });

  onUnmounted(() => {
    window.removeEventListener('scroll', listenScroll);
  });

  // keep-live
  onActivated(() => {
    window.addEventListener('scroll', listenScroll);
  });
  onDeactivated(() => {
    window.removeEventListener('scroll', listenScroll);
  });

  return { isReachBottom };
}
