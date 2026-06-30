"use server"

import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"

export async function signUpAction(
  email: string,
  password: string,
  name: string
) {

  try {
    await auth.api.signUpEmail({
      body: {
        email,
        password,
        name,
      },
    })

    return {
      success: true,
      message: "To sign up successfully, please verify your email",
    }
  } catch (error) {
    console.error("Auth:Signup Error: ", error)
    const e = error as Error

    return {
      success: false,
      message: e.message || "An unknown error occurred",
    }
  }
}

export async function signInAction(email: string, password: string) {

  try {
    await auth.api.signInEmail({
      body: {
        email,
        password,
      },
    })
    return { success: true, message: "Signed in successfully" }
  } catch (error) {
    console.error("Auth:Signin Error: ", error)
    const e = error as Error

    return {
      success: false,
      message: e.message || "An unknown error occurred",
    }
  }
}

export async function signOutAction() {
  await auth.api.signOut({
    headers: await headers(),
  })
  redirect("/")
}
