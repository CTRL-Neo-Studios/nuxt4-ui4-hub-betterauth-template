import type { User } from '#shared/types/db'
import { satisfies } from '#shared/utils/functional'

export function userAbilities() {
    const assignRole = defineAbility((user: User) => {
        return satisfies(user, { minRole: 'admin' })
    })

    // Admins can ban/unban users
    const banUser = defineAbility((user: User) => {
        return satisfies(user, { minRole: 'moderator' })
    })

    // Users can update their own profile, Admins can update any
    const updateUser = defineAbility((user: User, targetUserId: string) => {
        return satisfies(user, { minRole: 'admin' }) || user.id === targetUserId
    })

    return {
        assignRole,
        banUser,
        updateUser,
    }
}
