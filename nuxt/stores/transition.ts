export const useTransitionStore = defineStore('transition', () => {
  // State
  const transition = ref('');

  // Action
  function changeTransition(direction: string) {
    transition.value = direction;
  }

  return { transition, changeTransition };
});
