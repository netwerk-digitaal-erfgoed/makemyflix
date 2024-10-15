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

const createCssVariables = (theme: Theme, preview = false): void => {
  const styleObject = fetchOrCreateElement('theme', 'style') as HTMLStyleElement;

  const vars = [] as string[];
  for (const key in theme) {
    const value = theme[key as keyof Theme];
    vars.push(`${useStringToCssVariable(key)}: ${value};`);
  }
  styleObject.innerText = `${preview ? '#preview' : ':root'}{${vars.join('')}}`;
};

export default (theme: Theme) => {
  if (!theme) {
    return;
  }

  // Create the css variables
  createCssVariables(theme);
  createPreloadLink('preload-font');
  createFontLink('theme-font', theme.fontFamily);
};
