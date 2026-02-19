// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2026-02-19',
    devtools: {enabled: true},
    css: ['~/assets/css/main.css'],

    hub: {
        db: 'postgresql',
        blob: true
    },

    modules: [
      '@nuxt/ui',
      '@nuxt/image',
      '@nuxt/scripts',
      'nuxt-umami',
      '@nuxt/icon',
      '@nuxt/fonts',
      'nuxt-authorization',
      '@nuxthub/core',
      '@vueuse/nuxt'
    ],

    vite: {
        optimizeDeps: {
            include: [
                'better-auth/vue',
                'better-auth/client/plugins',
                'zod'
            ]
        }
    },

    runtimeConfig: {
        public: {
            siteUrl: ''
        },
        resend: {
            apiKey: ''
        },
        session: {
            password: ''
        }
    }
})