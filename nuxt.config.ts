// https://nuxt.com/docs/api/configuration/nuxt-config
import 'reflect-metadata';

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/ui"],
  dir: {
    pages: 'ui/pages',
  },
  components: [
    {
      path: '~/ui/components',
    }
  ]
})