import svgLoader from 'vite-svg-loader';

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  ssr: false,
  devtools: {
    enabled: false,
  },
  sourcemap: {
    server: true,
    client: true,
  },
  css: [
    'ress/ress.css',
    '@/assets/scss/defaults.scss',
    '@/assets/scss/theme.scss',
    '@/assets/scss/main.scss',
    '@/assets/scss/transitions.scss',
  ],
  modules: ['@pinia/nuxt'],
  vite: {
    plugins: [svgLoader()],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "./assets/scss/mixins";`,
        },
      },
    },
  },
  runtimeConfig: {
    app: {
      backendUrl: '',
      token: '',
    },
  },
  vue: {
    compilerOptions: {
      isCustomElement: tag => tag.startsWith('swiper-'),
    },
  },
});
