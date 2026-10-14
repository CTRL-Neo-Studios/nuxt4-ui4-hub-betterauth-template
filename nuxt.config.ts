// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: '2026-03-03',
	devtools: { enabled: true },
	css: ['~/assets/css/main.css'],
	experimental: {
		typescriptPlugin: true,
	},

	hub: {
		db: 'postgresql',
		blob: true,
	},

	modules: [
		'@nuxt/ui',
		'@type32/nuxt-ui-extras',
		'@nuxt/image',
		'@nuxt/scripts',
		'nuxt-umami',
		'@nuxt/icon',
		'@nuxt/fonts',
		'nuxt-authorization',
		'@nuxthub/core',
		'@vueuse/nuxt',
		'motion-v/nuxt',
		'@type32/nuxt-cs-utils',
	],

	vite: {
		optimizeDeps: {
			include: [
				'better-auth/vue',
				'better-auth/client/plugins',
				'better-auth/plugins/access',
				'better-auth/plugins/admin/access',
				'better-auth/client/plugins',
				'zod',
				'@internationalized/date',
			],
		},
	},

	runtimeConfig: {
		public: {
			siteUrl: '',
		},
		resend: {
			apiKey: '',
		},
		session: {
			password: '',
		},
	},
})
