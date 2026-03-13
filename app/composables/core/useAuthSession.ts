import { useState, useRequestHeaders } from '#imports'
import { useAuthClient } from '~/composables/core/useAuthClient'

interface SessionFetchError {
	code?: string | undefined
	message?: string | undefined
	status: number
	statusText: string
}

export function useAuthSession() {
	const $auth = useAuthClient()

	const userState = useState<User | undefined>('auth.user', () => undefined)
	const sessionState = useState('auth.session')
	const authReadyState = useState<boolean>('auth.ready', () => false)
	const errorState = useState<SessionFetchError | undefined>('auth.error', () => undefined)

	async function fetch() {
		const { data, error } = await $auth.getSession({
			fetchOptions: {
				// IMPORTANT: In SSR mode, forward the cookie headers to the auth endpoint
				headers: import.meta.server ? useRequestHeaders() as HeadersInit : undefined
			}
		})

		sessionState.value = data || undefined
		userState.value = data?.user as (User | undefined) || undefined
		errorState.value = error || undefined

		if (!authReadyState.value) {
			authReadyState.value = true
		}
		return {
			data,
			error
		}
	}

	async function clear() {
		await $auth.signOut()
		userState.value = undefined
		sessionState.value = undefined
		errorState.value = undefined
	}

	async function refresh() {
		await fetch()
	}

	return {
		session: computed(() => unref(sessionState)),
		user: computed(() => unref(userState)),
		loggedIn: computed(() => Boolean(unref(userState))),
		error: computed(() => unref(errorState)),

		ready: computed(() => authReadyState.value),

		// Expose functions
		fetch,
		clear,
		refresh
	}
}
