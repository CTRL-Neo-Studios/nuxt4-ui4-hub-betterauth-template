import { user, account, session, article, paper, volume, issue, reviewerToPaper, userToPaper, file, message, comment } from "@nuxthub/db/schema"
import type { InferInsertModel, InferSelectModel } from 'drizzle-orm'

export type User = InferSelectModel<typeof user>
export type UserInsert = InferInsertModel<typeof user>
export type Account = InferSelectModel<typeof account>
export type AccountInsert = InferInsertModel<typeof account>
export type Session = InferSelectModel<typeof session>
export type Article = InferSelectModel<typeof article>
export type ArticleInsert = InferInsertModel<typeof article>
export type File = InferSelectModel<typeof file>
export type FileInsert = InferInsertModel<typeof file>
