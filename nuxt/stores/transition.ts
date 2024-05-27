import { defineStore } from 'pinia'

export const useTransitionStore = defineStore('transition', () => {
  // State
  const transition = ref('');

  // Action
  function changeTransition (direction: string) {
    this.transition = direction;
  }

  return { transition, changeTransition }
});
