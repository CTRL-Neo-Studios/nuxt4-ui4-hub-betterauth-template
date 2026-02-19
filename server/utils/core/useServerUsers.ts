import { db, schema } from '@nuxthub/db'
import { useServerAuth } from '#server/utils/core/useServerAuth'
import { type EventHandlerRequest, H3Event } from 'h3'
import { satisfies, type UserRole } from '#shared/utils/functional'
import { and, eq, ilike, SQL } from 'drizzle-orm'
import { userAbilities } from '#shared/abilities/userAbilities'
import { GetUsersOptions } from '#shared/types/fetch'

export function useServerUsers() {
    const $auth = useServerAuth()

    // Handlers/ Getters & Setters

    async function getUsers(options?: GetUsersOptions): Promise<User[]> {
        const conditions: SQL[] = []

        if (options) {
            if (options.banned !== undefined)
                conditions.push(eq(schema.user.banned, options.banned))

            if (options.name !== undefined)
                conditions.push(ilike(schema.user.name, options.name))

            if (options.role !== undefined)
                conditions.push(eq(schema.user.role, options.role))

            if (options.email !== undefined)
                conditions.push(eq(schema.user.email, options.email))
        }

        return await db.query.user.findMany({
            where: and(...conditions)
        })
    }

    async function getUser(userId: string): Promise<User | undefined> {
        return await db.query.user.findFirst({
            where: eq(schema.user.id, userId)
        })
    }

    async function getUserDetailed(userId: string) {
        return await db.query.user.findFirst({
            where: eq(schema.user.id, userId),
            with: {
				// Or your respective clauses
                files: true
            }
        })
    }

    async function getUserBasedOnRole(userId: string) {
        const user = await getUser(userId)
        return await db.query.user.findFirst({
            where: eq(schema.user.id, userId),
            with: {
				// Or your respective clauses
                files: true
            }
        })
    }

    async function updateMyUser(event: H3Event<EventHandlerRequest>, targetUserId: string, values: UserInsert): Promise<User | undefined> {
        const user = await $auth.requireUser(event)
        if (!satisfies(user as User, { minRole: 'admin' }) && targetUserId !== user.id) {
            throw createError({
                status: 403,
                statusText: 'You are unauthorized to edit other users\' profile; This attempt will be logged'
            })
        } else {
            const { id, role, createdAt, updatedAt, banned, banReason, banExpires, emailVerified, reviewWithoutInvite, ...safeValues } = values
            const [result] = await db.update(schema.user)
                .set(values)
                .where(eq(schema.user.id, targetUserId))
                .returning()

            return result
        }
    }

    async function banUser(event: H3Event<EventHandlerRequest>, targetUserId: string, banReason: string, banDurationInDays: number) {
        const user = await $auth.requireUser(event, { minRole: 'moderator' })
        const targetUser = await authorizeUserExists(targetUserId)
        if (satisfies(user as User, { minRole: 'admin' })) {
            if (satisfies(targetUser as User, { minRole: 'admin' }))
                throw createError({
                    status: 403,
                    statusText: 'You are unauthorized to ban another admin; this attempt will be recorded'
                })
            await auth.api.banUser({
                body: {
                    userId: targetUser.id,
                    banReason: banReason,
                    banExpiresIn: 60 * 60 * 24 * banDurationInDays
                },
                headers: event.headers
            })
        } else {
            if (satisfies(targetUser as User, { minRole: 'moderator' }))
                throw createError({
                    status: 403,
                    statusText: 'You are unauthorized to ban another admin/moderator; this attempt will be recorded'
                })

            await auth.api.banUser({
                body: {
                    userId: targetUser.id,
                    banReason: banReason,
                    banExpiresIn: 60 * 60 * 24 * banDurationInDays
                },
                headers: event.headers
            })
        }
    }

    /**
     * Updates the role of a target user and returns the admin user who performed the update - **for admin usage.**
     *
     * @param event - The H3 event context used for authentication and request handling.
     * @param targetUserId - The ID of the user whose role needs to be updated.
     * @param role - The new role to assign to the target user.
     * @returns The admin user who performed the role update.
     */
    async function setUserRole(event: H3Event<EventHandlerRequest>, targetUserId: string, role: UserRole) {
        const user = await $auth.requireUser(event, { minRole: 'admin' })
        const [targetUser] = await db.update(schema.user)
            .set({ role: role })
            .where(eq(schema.user, targetUserId))
            .returning()

        if (!targetUser)
            throw createError({
                status: 404,
                statusText: 'Target user does not exist'
            })

        return user
    }

    // Clauses

    async function userExists(userId: string) {
        const user = await db.query.user.findFirst({
            where: eq(schema.user.id, userId)
        })

        return !!user
    }

    // Authorizations Clauses

    async function authorizeUserExists(userId: string): Promise<User> {
        const user = await getUser(userId)
        if (!user)
            throw createError({
                status: 404,
                statusText: 'User not found'
            })

        return user
    }

    return {
        getUsers,
        getUser,
        getUserDetailed,
        getUserBasedOnRole,
        updateMyUser,
        setUserRole,
        userExists,
        banUser,
    }
}
