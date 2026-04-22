import { defineNuxtPlugin, useRequestEvent } from '#imports'
import { useAuthSession } from '~/composables/core/useAuthSession'

export default defineNuxtPlugin({
	name: 'session-fetch-plugin',
	enforce: 'pre',
	async setup(nuxtApp) {
		// Flag if request is cached
		const $as = useAuthSession()
		nuxtApp.payload.isCached = Boolean(useRequestEvent()?.context.cache)
		if (nuxtApp.payload.serverRendered && !nuxtApp.payload.prerenderedAt && !nuxtApp.payload.isCached) {
			await $as.fetch()
		}
	},
})
