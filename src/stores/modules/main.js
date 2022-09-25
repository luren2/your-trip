import { defineStore } from 'pinia';

const today = new Date();
const tomorrow = new Date().setDate(today.getDate() + 1);

export const useMainStore = defineStore('main', {
  state: () => ({
    today: today,
    tomorrow: tomorrow,
    isLoading: false,
  }),
});

export default useMainStore;
