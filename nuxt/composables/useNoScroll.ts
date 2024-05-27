export const useNoScroll = () => {
  const htmlElement = document.querySelector('html');
  htmlElement.style.setProperty('--scroll-offset', `${htmlElement.scrollTop}px`);
  if (!htmlElement.classList.contains('no-scroll')) {
    htmlElement.classList.add('no-scroll');
  }
}
