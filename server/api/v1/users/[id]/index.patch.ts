import {z} from 'zod'
import { useServerUsers } from '#server/utils/core/useServerUsers'

const bodySchema = z.custom<UserInsert>()

const routeSchema = z.object({
    id: z.coerce.string()
})

export default defineEventHandler(async (event) => {
    const { id } = await getValidatedRouterParams(event, routeSchema.parse)
    const data = await readValidatedBody(event, bodySchema.parse)
    const $users = useServerUsers()

    return await $users.updateMyUser(event, id, data)
})