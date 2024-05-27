export const useScroll = () => {
  const htmlElement = document.querySelector('html');
  htmlElement.style.removeProperty('--scroll-offset');
  if (htmlElement.classList.contains('no-scroll')) {
    htmlElement.classList.remove('no-scroll');
  }
}
