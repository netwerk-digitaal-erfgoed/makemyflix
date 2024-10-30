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
  const href = 'https://fonts.gstatic.com';
  const link = fetchOrCreateElement(id, 'link') as HTMLLinkElement;
  if (link.href === href) {
    return;
  }
  link.rel = 'preconnect';
  link.href = href;
  document.head.appendChild(link);
};

const createFontLink = (id: string, font: string): void => {
  const href = `https://fonts.googleapis.com/css2?family=${font}:wght@300;500;600;700&display=swap`;
  const link = fetchOrCreateElement(id, 'link') as HTMLLinkElement;
  if (link.href === href) {
    return;
  }
  link.rel = 'stylesheet';
  document.head.appendChild(link);
};

const createCssVariables = (id: string, theme: Record<string, string>): void => {
  const styleObject = fetchOrCreateElement('theme', 'style') as HTMLStyleElement;

  const vars = [] as string[];
  for (const key in theme) {
    const value = theme[key as keyof Theme];
    vars.push(`${useStringToCssVariable(key)}: ${value};`);
  }
  styleObject.innerText = `${id}{${vars.join('')}}`;
};

export default (theme: Theme) => {
  if (!theme) {
    return;
  }

  const { isPreview } = useFlixStore();
  const cssId = isPreview ? '.preview' : ':root';
  const fontId = isPreview ? 'preview-font' : 'theme-font';
  createPreloadLink('preload-font');
  createFontLink(fontId, theme.font);
  createCssVariables(cssId, {
    primaryColor: theme.primary,
    secondaryColor: theme.secondary,
    tertiaryColor: theme.tertiary,
    fontFamily: theme.font,
  });
};
