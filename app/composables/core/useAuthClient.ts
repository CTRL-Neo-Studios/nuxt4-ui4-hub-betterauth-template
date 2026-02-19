import { createAuthClient } from 'better-auth/vue'
import { adminClient, emailOTPClient } from "better-auth/client/plugins"
import { definedRoles } from '#shared/utils/roles'

export function useAuthClient() {
    const $rc = useRuntimeConfig()
    return createAuthClient({
        baseURL: $rc.public.siteUrl,
        basePath: `/api/v1/auth/handler`,
        plugins: [
            adminClient({
                ac: definedRoles().accessControl,
                roles: definedRoles().roles
            }),
            emailOTPClient(),
        ]
    })
}