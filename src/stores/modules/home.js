import { defineStore } from 'pinia';
import {
  getCategories,
  getHotSuggests,
  getHouseList,
} from '@/service/api/home';

export const useHomeStore = defineStore('home', {
  state: () => ({
    hotSuggests: [],
    categories: [],
    currentPage: 1,
    houseList: [],
  }),
  actions: {
    async fetchHotSuggests() {
      const res = await getHotSuggests();
      this.hotSuggests = res.data;
    },
    async fetchCategories() {
      const res = await getCategories();
      this.categories = res.data;
    },

    async fetchHouseList() {
      const res = await getHouseList(this.currentPage);
      this.houseList.push(...res.data);
      this.currentPage++;
    },
  },
});

export default useHomeStore;
