import { defineStore } from 'pinia';
import { getCityAll } from '@/service/api/city';

export const useCityStore = defineStore('city', {
  state: () => ({
    allCities: {},
    currentCity: { cityName: '上海' },
  }),
  actions: {
    async fetchAllCitiesAction() {
      const res = await getCityAll();
      this.allCities = res.data;
    },
    fetchCurrentLocation(city) {
      this.currentCity = { cityName: city };
    },
  },
});

export default useCityStore;
