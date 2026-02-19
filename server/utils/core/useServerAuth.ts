import { type EventHandlerRequest, H3Event } from 'h3'
import { auth } from '#server/utils/auth'
import { satisfies } from '#shared/utils/functional'
import type { RoleCheckOptions } from '#shared/utils/functional'
import type { User } from '#shared/types/db'

export function useServerAuth() {

    async function getUserSession(event: H3Event<EventHandlerRequest>) {
        return await auth.api.getSession({ headers: event.headers })
    }

    async function getUser(event: H3Event<EventHandlerRequest>) {
        return (await getUserSession(event))?.user
    }

    async function isSessionAuthenticated(event: H3Event<EventHandlerRequest>) {
        return !!(await getUserSession(event))
    }

    async function requireSession(event: H3Event<EventHandlerRequest>, opts?: RoleCheckOptions) {
        const session = await getUserSession(event)

        if (!session) {
            throw createError({ statusCode: 403, statusMessage: 'Unauthorized' })
        }

        if (opts && !satisfies(session.user as User, opts)) {
            throw createError({
                statusCode: 403,
                statusMessage: opts.verified && !session.user.emailVerified
                    ? 'Email not verified'
                    : 'Unauthorized'
            })
        }

        return session
    }

    async function requireUser(event: H3Event<EventHandlerRequest>, opts?: RoleCheckOptions) {
        return (await requireSession(event, opts)).user
    }

    async function isSession(event: H3Event<EventHandlerRequest>, opts?: RoleCheckOptions): Promise<boolean> {
        const user = await getUser(event)
        if (!user) return false
        return opts ? satisfies(user as User, opts) : true
    }

    return {
        getUserSession,
        getUser,
        isSessionAuthenticated,
        requireSession,
        requireUser,
        isSession,
    }
}