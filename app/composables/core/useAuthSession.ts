import { useAuthClient } from '~/composables/core/useAuthClient'

export function useAuthSession() {
    const $auth = useAuthClient()
    const session = $auth.useSession()

    async function clear() {
        await $auth.signOut()
    }

    async function refresh() {
        await unref(session)?.refetch()
    }

    return {
        session,
        error: computed(() => unref(session)?.error),
        pending: computed(() => unref(session)?.isPending || unref(session)?.isRefetching),
        loggedIn: computed(() => !!unref(session)?.data),
        user: computed(() => unref(session)?.data?.user),
        clear,
        refresh
    }
}