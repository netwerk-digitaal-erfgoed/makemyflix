import { useTransitionStore } from '@/stores/transition';

export default defineNuxtPlugin(() => {
  return {
    provide: {
      navigate: (to: Object, direction: string = '') => {
        const { changeTransition } = useTransitionStore();
        changeTransition(direction);
        return navigateTo(to);
      }
    }
  }
})
