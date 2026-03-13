import { useAuthSession } from '~/composables/core/useAuthSession'

export default defineNuxtPlugin(async (nuxtApp) => {
	const $as = useAuthSession()
	if (!nuxtApp.payload.serverRendered) {
		await $as.fetch()
	}
	else if (Boolean(nuxtApp.payload.prerenderedAt) || Boolean(nuxtApp.payload.isCached)
		|| nuxtApp.$config.public.auth.loadStrategy === 'client-only'
	) {
		// To avoid hydration mismatch
		nuxtApp.hook('app:suspense:resolve', async () => {
			await $as.fetch()
		})
	}
})
