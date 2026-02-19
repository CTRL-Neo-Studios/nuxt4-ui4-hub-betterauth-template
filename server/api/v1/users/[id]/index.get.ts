import {z} from 'zod'
import { useServerUsers } from '#server/utils/core/useServerUsers'
import { useServerAuth } from '#server/utils/core/useServerAuth'

const routeSchema = z.object({
    id: z.coerce.string()
})

export default defineEventHandler(async (event) => {
    const { id } = await getValidatedRouterParams(event, routeSchema.parse)
    const $auth = useServerAuth()
    const $users = useServerUsers()
    await $auth.requireUser(event, { verified: false })

    return await $users.getUserBasedOnRole(id)
})