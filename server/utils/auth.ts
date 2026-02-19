import { type Auth, betterAuth } from 'better-auth'
import { db } from "@nuxthub/db"
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { useServerMailing } from '#server/utils/utility/useServerMailing'
import { admin, emailOTP } from 'better-auth/plugins'
import { definedRoles } from '#shared/utils/roles'

const $sm = useServerMailing()

export const auth = betterAuth({
    experimental: { joins: true },
    database: drizzleAdapter(db, {
        provider: "pg"
    }),
    emailAndPassword: {
        enabled: true,
        autoSignIn: true,
        minPasswordLength: 8,
        requireEmailVerification: true,
        async sendResetPassword({ user, url, token }, request) {
            $sm.sendResetPassword(user.email, url).then() // No await for prevent timing attacks
        }
    },
    socialProviders: {
        github: {
            clientId: process.env.NUXT_OAUTH_GITHUB_CLIENT_ID || '',
            clientSecret: process.env.NUXT_OAUTH_GITHUB_CLIENT_SECRET || '',
        },
        google: {
            prompt: "select_account",
            clientId: process.env.NUXT_OAUTH_GOOGLE_CLIENT_ID || '',
            clientSecret: process.env.NUXT_OAUTH_GOOGLE_CLIENT_SECRET || ''
        }
    },
    baseURL: process.env.NUXT_PUBLIC_SITE_URL || '',
    account: {
        accountLinking: {
            enabled: true,
            trustedProviders: ["google", "github"]
        }
    },
    user: {
        additionalFields: {
            role: {
                type: ['user', 'moderator', 'admin'],
                required: true,
                defaultValue: 'user',
                input: false
            }
        }
    },
    emailVerification: {
        async sendVerificationEmail({ user, url, token }, request) {
            $sm.sendVerifyEmail(user.email, url).then() // No await for prevent timing attacks
        }
    },
    plugins: [
        admin({
            ac: definedRoles().accessControl,
            roles: definedRoles().roles
        }),
        emailOTP({
            overrideDefaultEmailVerification: true,
            async sendVerificationOTP({ email, otp, type }) {
                if (type === 'sign-in') { // No await for prevent timing attacks
                    $sm.sendSignInEmailOtp(email, otp).then((response) => console.log(response))
                } else if (type === 'email-verification') {
                    $sm.sendVerifyEmailOtp(email, otp).then((response) => console.log(response))
                } else {
                    $sm.sendForgotPasswordEmailOtp(email, otp).then((response) => console.log(response))
                }
            },
            otpLength: 8
        })
    ],
    advanced: {
        disableCSRFCheck: false,
        disableOriginCheck: false,
    },
    basePath: '/api/v1/auth/handler'
})
