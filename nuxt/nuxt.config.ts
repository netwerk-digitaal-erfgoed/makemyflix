import svgLoader from 'vite-svg-loader';

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    layoutTransition: { name: 'layout', mode: 'out-in' },
  },
  ssr: false,
  devtools: {
    enabled: false,
  },
  css: ['ress/ress.css', '@/assets/scss/main.scss', '@/assets/scss/transitions.scss'],
  modules: ['@nuxtjs/i18n', '@pinia/nuxt'],
  vite: {
    plugins: [svgLoader()],
  },
  i18n: {
    langDir: 'locales',
    locales: [
      {
        code: 'nl',
        file: 'nl.json',
        name: 'Nederlands',
      },
    ],
    defaultLocale: 'nl',
    strategy: 'no_prefix',
  },
  runtimeConfig: {
    app: {
      backendUrl: '',
      token: '',
    },
  },
});
