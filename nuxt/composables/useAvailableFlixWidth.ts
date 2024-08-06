export function useAvailableFlixWidth(): Ref<number> {
  const width = ref(window.innerWidth);

  watchEffect(
    () => {
      const flixBuilderStore = useFlixBuilderStore();
      const route = useRoute();

      if (route.name !== 'create') {
        width.value = window.innerWidth;
        return;
      }

      const preview = document.querySelector(`.${flixBuilderStore.previewMediaQueryClassName}`);
      if (preview) {
        width.value = preview.getBoundingClientRect().width;
        return;
      }

      width.value = window.innerWidth; // fallback
    },
    { flush: 'post' },
  );

  return width;
}
