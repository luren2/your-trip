import { defineStore } from 'pinia';
import { getDetailById } from '@/service/api/detail';

const useDetailStore = defineStore('detail', {
  state: () => ({
    detail: {},
  }),
  actions: {
    async feachDetails(houseId) {
      const res = await getDetailById(houseId);
      this.detail = res.data;
    },
  },
});

export default useDetailStore;
