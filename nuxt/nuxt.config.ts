import svgLoader from 'vite-svg-loader'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    layoutTransition: { name: 'layout', mode: 'out-in' }
  },
  ssr: false,
  css: [
    '@/assets/scss/main.scss',
    '@/assets/scss/transitions.scss'
  ],
  modules: [
    '@nuxt/content',
    '@nuxtjs/google-fonts',
    '@nuxtjs/i18n',
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt'
  ],
  vite: {
    plugins: [svgLoader()],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/scss/variables.scss" as *;'
        },
      },
    },
  },
  googleFonts: {
    families: {
      Poppins: [300, 400, 600, 700]
    }
  },
  i18n: {
    langDir: 'locales',
    locales: [
      {
        code: 'nl',
        file: 'nl.json',
        name: 'Nederlands'
      },
    ],
    defaultLocale: 'nl',
    strategy: 'no_prefix'
  },
  content: {
    experimental: {
       clientDB: true
    }
  }
});
