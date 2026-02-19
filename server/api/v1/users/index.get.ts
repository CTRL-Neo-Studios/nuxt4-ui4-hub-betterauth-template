import {z} from 'zod'
import { useServerAuth } from '#server/utils/core/useServerAuth'
import { useServerUsers } from '#server/utils/core/useServerUsers'
import { GetUsersOptions } from '#shared/types/fetch'
import { useServerOffsetPagination } from '#server/utils/utility/useServerOffsetPagination'

const querySchema = z.custom<GetUsersOptions>()

export default defineEventHandler(async (event) => {
    const data = await getValidatedQuery(event, querySchema.parse)
    const $pagi = useServerOffsetPagination(event, { defaultLimit: 30 })
    const $auth = useServerAuth()
    const $users = useServerUsers()
    const user = await $auth.requireUser(event, { minRole: 'moderator' })

    return $pagi.paginate(await $users.getUsers(data))
})