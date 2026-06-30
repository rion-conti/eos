import { betterAuth } from "better-auth"
import { nextCookies } from "better-auth/next-js"
import { prismaAdapter } from "better-auth/adapters/prisma"
// If your Prisma file is located elsewhere, you can change the path
import { prisma } from "./prisma"
import { Resend } from "resend"
import ForgotPasswordEmail from "../components/emails/reset-password"
import VerifyEmail from "../components/emails/verify-email"

const trustedOrigins = process.env.TRUSTED_ORIGINS?.split(",") || []
const resend = new Resend(process.env.RESEND_API_KEY)

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  user: {
    additionalFields: {
      role: {
        type: ["user", "admin"],
        required: false,
        defaultValue: "user",
        input: false,
      },
    },
    trustedOrigins: trustedOrigins,
    deleteUser: {
      enabled: true,
    },
  },
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    sendResetPassword: async ({ user, url }) => {
      await resend.emails.send({
        from: `${process.env.EMAIL_FROM}`,
        to: `${process.env.EMAIL_TO}`,
        subject: "Reset your password",
        react: ForgotPasswordEmail({ username: user.name, resetUrl: url }),
      })
    },
  },
  emailVerification: {
    autoSignInAfterVerification: true,
    sendOnSignUp: true,
    sendVerificationEmail: async ({ user, url }) => {
      await resend.emails.send({
        from: `${process.env.EMAIL_FROM}`,
        to: `${process.env.EMAIL_TO}`,
        subject: "Verify your email address",
        react: VerifyEmail({ username: user.name, verifyUrl: url }),
      })
    },
  },
  plugins: [nextCookies()],
})

// Infer the session type
export type Session = typeof auth.$Infer.Session
