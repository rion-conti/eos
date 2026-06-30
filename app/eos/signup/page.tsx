import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"

import { EOSHeader } from "@/components/eos/eos-header"
import { SignUpForm } from "@/components/eos/signup-form"
import { EOSFooter2 } from "@/components/eos/eos-footer-2"

export default async function SignUpPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })
  if (session) {
    redirect("/dashboard/customer")
  }

  return (
    <div className="flex min-h-screen flex-col justify-between bg-slate-50 font-sans text-slate-900 antialiased selection:bg-teal-500 selection:text-white">
      <EOSHeader />
      <SignUpForm />
      <EOSFooter2 />
    </div>
  )
}
