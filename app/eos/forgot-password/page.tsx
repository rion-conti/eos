import { EOSFooter } from "@/components/eos/eos-footer"
import { EOSHeader } from "@/components/eos/eos-header"
import { ForgotPasswordForm } from "@/components/eos/forgot-password-form"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"

export default async function ForgotPasswordPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })
  if (session) {
    redirect("/dashboard/customer")
  }

  return (
    <div className="flex min-h-screen flex-col justify-between bg-slate-50 font-sans text-slate-900 antialiased selection:bg-teal-500 selection:text-white">
      <EOSHeader />
      <ForgotPasswordForm />
      <EOSFooter />
    </div>
  )
}
