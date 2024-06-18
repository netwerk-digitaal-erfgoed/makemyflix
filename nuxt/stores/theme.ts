export const useThemeStore = defineStore('theme', () => {
  const useStringToCssVariable = (input: string): string => {
    const output = input.replace(/[A-Z0-9]/, function (match) {
      return `-${match.toLowerCase()}`;
    });
    return `--${output}`;
  };

  const fetchOrCreateElement = (id: string, tag: string) => {
    let style = document.getElementById(id);
    if (!style) {
      style = document.createElement(tag);
      style.id = id;
      document.head.appendChild(style);
    }
    return style;
  };

  const createPreloadLink = (id: string): void => {
    const link = fetchOrCreateElement(id, 'link') as HTMLLinkElement;
    link.rel = 'preconnect';
    link.href = 'https://fonts.gstatic.com';
    document.head.appendChild(link);
  };

  const createFontLink = (id: string, font: string): void => {
    const link = fetchOrCreateElement(id, 'link') as HTMLLinkElement;
    link.rel = 'stylesheet';
    link.href = `https://fonts.googleapis.com/css2?family=${font}:wght@300;500;600;700&display=swap`;
    document.head.appendChild(link);
  };

  const createCssVariables = (theme: Theme): void => {
    const styleObject = fetchOrCreateElement('theme', 'style') as HTMLStyleElement;

    const vars = [] as string[];
    for (const key in theme) {
      const value = theme[key as keyof Theme];
      vars.push(`${useStringToCssVariable(key)}: ${value};`);
    }
    styleObject.innerText = `:root{${vars.join('')}}`;
  };

  const setThemeStyling = () => {
    // Check if we have a currentFlix
    const { currentFlix } = useFlixStore();
    if (!currentFlix?.theme) {
      return;
    }

    // Create the css variables
    createCssVariables(currentFlix.theme);
    createPreloadLink('preload-font');
    createFontLink('theme-font', currentFlix.theme.fontFamily);
  };

  const resetData = () => {
    const style = document.getElementById('theme');
    if (style) {
      style.remove();
    }
    const link = document.getElementById('theme-font');
    if (link) {
      link.remove();
    }
  };

  return {
    setThemeStyling,
    resetData,
  };
});
