export const useNoScroll = () => {
  const htmlElement = document.querySelector('html');
  if (!htmlElement) return;
  htmlElement.style.setProperty('--scroll-offset', `${htmlElement.scrollTop}px`);
  if (!htmlElement.classList.contains('no-scroll')) {
    htmlElement.classList.add('no-scroll');
  }
};
