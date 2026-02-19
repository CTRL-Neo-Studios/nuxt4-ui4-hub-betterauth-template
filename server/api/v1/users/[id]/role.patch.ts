import {z} from 'zod'
import { useServerUsers } from '#server/utils/core/useServerUsers'

const bodySchema = z.object({
    role: z.custom<UserRole>()
})

const routeSchema = z.object({
    id: z.coerce.string()
})

export default defineEventHandler(async (event) => {
    const { id } = await getValidatedRouterParams(event, routeSchema.parse)
    const { role } = await readValidatedBody(event, bodySchema.parse)
    const $users = useServerUsers()

    return await $users.setUserRole(event, id, role)
})