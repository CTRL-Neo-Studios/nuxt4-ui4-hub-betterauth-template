import {z} from 'zod'
import { useServerUsers } from '#server/utils/core/useServerUsers'

const routeSchema = z.object({
    id: z.coerce.string()
})

const bodySchema = z.object({
    banReason: z.coerce.string(),
    banDuration: z.coerce.number()
})

export default defineEventHandler(async (event) => {
    const { id } = await getValidatedRouterParams(event, routeSchema.parse)
    const { banReason, banDuration } = await readValidatedBody(event, bodySchema.parse)
    const $users = useServerUsers()

    await $users.banUser(event, id, banReason, banDuration)

    return sendNoContent(event)
})