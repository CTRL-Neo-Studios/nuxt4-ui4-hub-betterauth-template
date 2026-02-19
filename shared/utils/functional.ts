import type { User } from '#shared/types/db'

// Ordered from least to most privileged
const userRoleSequence = [
    'user',
    'moderator',
    'admin'
] as const

export type UserRole = (typeof userRoleSequence)[number]

const roleLevelMap = new Map<string, number>(
    userRoleSequence.map((role, index) => [role, index])
)

export interface RoleCheckOptions {
    /** Minimum role in the hierarchy (inclusive and above). */
    minRole?: UserRole
    /** Exact set of allowed roles (overrides minRole). */
    roles?: UserRole[]
    /** Require email to be verified? Default: false */
    verified?: boolean
    /** Allow banned users? Default: false */
    banned?: boolean
}

/**
 * Get the numeric privilege level of a role.
 * Returns -1 for unknown roles (treated as unprivileged).
 */
export function getRoleLevel(role?: string | null): number {
    return roleLevelMap.get(role || '') ?? -1
}

/**
 * Check if a user's role meets or exceeds the minimum required role.
 */
export function hasMinRole(user: User, minRole: UserRole): boolean {
    return getRoleLevel(user.role) >= getRoleLevel(minRole)
}

/**
 * Check if a user has exactly one of the specified roles.
 */
export function hasRole(user: User, ...roles: UserRole[]): boolean {
    return roles.includes(user.role as UserRole)
}

/**
 * Single function to check if a user satisfies role + verified requirements.
 *
 * @example
 * satisfies(user)                                    // just authenticated
 * satisfies(user, { minRole: 'moderator' })          // moderator or above
 * satisfies(user, { roles: ['auditor', 'admin'] })   // exactly one of these
 * satisfies(user, { minRole: 'admin', verified: true }) // verified admin
 */
export function satisfies(user: User, opts?: RoleCheckOptions): boolean {
    // Banned check (default: reject banned)
    if (opts?.banned !== true && user.banned) return false

    // Role check
    if (opts?.roles) {
        if (!hasRole(user, ...opts.roles)) return false
    } else if (opts?.minRole) {
        if (!hasMinRole(user, opts.minRole)) return false
    }

    // Verified check
    if (opts?.verified !== false && !user.emailVerified) return false

    return true
}

export const isAuthenticated = (user?: User) => !!(user?.id)