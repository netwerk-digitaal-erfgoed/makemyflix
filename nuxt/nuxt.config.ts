import svgLoader from 'vite-svg-loader';

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  css: [
    'ress/ress.css',
    '@/assets/scss/defaults.scss',
    '@/assets/scss/theme.scss',
    '@/assets/scss/main.scss',
    '@/assets/scss/transitions.scss',
  ],
  devtools: {
    enabled: false,
  },
  googleFonts: {
    families: {
      Poppins: true,
    },
    download: false,
    useStylesheet: true,
  },
  modules: ['@pinia/nuxt', '@nuxtjs/google-fonts'],
  runtimeConfig: {
    token: '',
    public: {
      backendUrl: '',
    },
  },
  ssr: false,
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
  vue: {
    compilerOptions: {
      isCustomElement: tag => tag.startsWith('swiper-'),
    },
  },
});
