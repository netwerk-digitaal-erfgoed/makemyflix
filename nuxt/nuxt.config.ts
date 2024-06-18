import svgLoader from 'vite-svg-loader';

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  ssr: false,
  devtools: {
    enabled: false,
  },
  css: ['ress/ress.css', '@/assets/scss/main.scss', '@/assets/scss/transitions.scss'],
  modules: ['@pinia/nuxt'],
  vite: {
    plugins: [svgLoader()],
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
