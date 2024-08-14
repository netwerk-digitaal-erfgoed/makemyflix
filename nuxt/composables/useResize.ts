export function useResize(fn: (event: Event) => void | (() => void), target: Window | Element | Ref<Element | undefined> = window) {
  let cleanup: (() => void) | undefined;

  const listener = (event: Event) => {
    const result = fn(event);

    if (result) {
      cleanup = result;
    }
  };

  onMounted(() => {
    unref(target)?.addEventListener('resize', listener);
  });

  const removeListener = () => {
    unref(target)?.removeEventListener('resize', listener);
  };

  onBeforeUnmount(() => {
    cleanup?.();
    removeListener();
  });

  return removeListener;
}
