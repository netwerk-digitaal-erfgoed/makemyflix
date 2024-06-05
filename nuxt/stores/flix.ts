import { defineStore } from 'pinia';

export const useFlixStore = defineStore('flix', () => {
  const path = ref<string>();
  return { path };
});
