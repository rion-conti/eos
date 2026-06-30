import { headers } from "next/headers"
import { auth } from "./auth"
import { redirect } from "next/navigation"
import { cache } from "react"

export const checkAuth = cache(async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    redirect("/signin")
  }
  return session
})
