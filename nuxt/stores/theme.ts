export const useThemeStore = defineStore('theme', () => {
  const styleContent = () => {
    let content = '';
    // Fonts
    const { currentFlix } = useFlixStore();
    if (currentFlix?.fonts) {
      content += `--font: ${currentFlix.fonts.join(',')};`;
    }
    // TODO: For now only background color is added. Add more in the future
    if (currentFlix?.backgroundColor) {
      content += `--bg-color: ${currentFlix.backgroundColor};`;
    }

    return content;
  };

  const setThemeStyling = () => {
    let styleObject = document.getElementById('theme');

    if (!styleObject) {
      const style = document.createElement('style');
      style.id = 'theme';
      const firstStyle = document.head.querySelector('style');
      document.head.insertBefore(style, firstStyle);
      styleObject = document.getElementById('theme');
    }
    // @ts-expect-error - TS thinks styleObject can be null here, which is impossible
    styleObject.innerText = `:root{${styleContent()}}`;
  };


  const setFonts = () => {
    const { currentFlix } = useFlixStore();
    if (currentFlix?.fonts) {
      const fonts = currentFlix.fonts;
      for (const font of fonts) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = `https://fonts.googleapis.com/css2?family=${font}:wght@300;400;600;700&display=swap`;
        document.head.appendChild(link);
      }
    }
  };
  return {
    setFonts,
    setThemeStyling,
  };
});
