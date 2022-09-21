import { onActivated, onDeactivated, onMounted, onUnmounted, ref } from 'vue';
import { throttle } from 'underscore';

export default function useScroll() {
  const isReachBottom = ref(false);
  const scrollTop = ref(0);

  // 节流
  const scrollListenerHandler = throttle(() => {
    scrollTop.value = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;
    // 有误差 取整 精度问题
    if (parseInt(scrollHeight - scrollTop.value) <= clientHeight) {
      // console.log('滚到底部了!!!');
      isReachBottom.value = true;
    }
  }, 100);

  onMounted(() => {
    window.addEventListener('scroll', scrollListenerHandler);
  });

  onUnmounted(() => {
    window.removeEventListener('scroll', scrollListenerHandler);
  });

  // keep-live
  onActivated(() => {
    window.addEventListener('scroll', scrollListenerHandler);
  });
  onDeactivated(() => {
    window.removeEventListener('scroll', scrollListenerHandler);
  });

  return { isReachBottom, scrollTop };
}
