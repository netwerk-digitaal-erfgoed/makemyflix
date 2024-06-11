export default defineNuxtPlugin(() => {
  return {
    provide: {
      navigate: (to: object, direction: string = '') => {
        const { changeTransition } = useTransitionStore();
        changeTransition(direction);
        return navigateTo(to);
      },
    },
  };
});
