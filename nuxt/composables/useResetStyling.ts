export default () => {
  const style = document.getElementById('theme');
  if (style) {
    style.remove();
  }
  const link = document.getElementById('theme-font');
  if (link) {
    link.remove();
  }
};
