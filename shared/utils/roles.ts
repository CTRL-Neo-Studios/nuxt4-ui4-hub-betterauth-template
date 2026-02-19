import { createAccessControl } from "better-auth/plugins/access";
import { defaultStatements, adminAc } from "better-auth/plugins/admin/access";

const statement = {
    ...defaultStatements
} as const;

const ac = createAccessControl(statement)

const user = ac.newRole({
    user: [],
    session: []
})

const moderator = ac.newRole({
    user: ['ban', 'set-role', 'list'],
    session: []
})

const admin = ac.newRole({
    ...adminAc.statements
})

export function definedRoles() {
    return {
        accessControl: ac,
        roles: {
            user,
            moderator,
            admin
        }
    }
}