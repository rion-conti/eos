"use client"

import { useState } from "react"
import Link from "next/link"
import { ShieldCheck, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import z from "zod"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { useRouter, useSearchParams } from "next/navigation"
import { authClient } from "@/lib/auth-client"
import { EyeIcon, EyeOffIcon } from "lucide-react"

const formSchema = z
  .object({
    password: z.string().min(8, "Must contain at least 8 characters"),
    confirmPassword: z.string().min(8, "Must match password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "New password must be the same with confirm password",
    path: ["confirmPassword"],
  })

export function ResetPasswordForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get("token") as string

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  })

  const { isSubmitting } = form.formState

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (values.password !== values.confirmPassword) {
      toast.error("Passwords do not match")
      return
    }

    const { error } = await authClient.resetPassword({
      newPassword: values.password,
      token,
    })

    if (error) {
      toast.error(error.message)
    } else {
      toast.success("Password reset successfully")
      router.push("/eos/signin")
    }
  }
  return (
    <main className="mx-auto w-full max-w-md px-4 py-16 sm:px-6">
      <Card className="border-slate-200 bg-white shadow-xl">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold tracking-tight text-slate-900">
            Forgot Password
          </CardTitle>
          <CardDescription className="text-sm text-slate-500">
            Enter your enterprise email to reset your gateway directory.
          </CardDescription>
        </CardHeader>

        <CardContent className="mt-3 space-y-6">
          {/* TRADITIONAL ACCOUNT INITIALIZATION FORM */}
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-1.5">
              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <div className="relative">
                      <Input
                        {...field}
                        id="password"
                        type={showPassword ? "text" : "password"}
                        aria-invalid={fieldState.invalid}
                        // autoComplete="off"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute top-1/2 right-2 -translate-y-1/2 text-muted-foreground"
                        tabIndex={-1}
                      >
                        {showPassword ? (
                          <EyeIcon className="h-4 w-4" />
                        ) : (
                          <EyeOffIcon className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="confirmPassword"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="confirmPassword">
                      Confirm Password
                    </FieldLabel>
                    <div className="relative">
                      <Input
                        {...field}
                        id="confirmPassword"
                        type={showPassword ? "text" : "password"}
                        aria-invalid={fieldState.invalid}
                        // autoComplete="off"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                        className="absolute top-1/2 right-2 -translate-y-1/2 text-muted-foreground"
                        tabIndex={-1}
                      >
                        {showConfirmPassword ? (
                          <EyeIcon className="h-4 w-4" />
                        ) : (
                          <EyeOffIcon className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between"></div>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="mt-2 w-full bg-linear-to-r from-teal-600 to-emerald-800 py-5 font-semibold text-white shadow-md transition-all hover:from-teal-700 hover:to-emerald-900 disabled:opacity-50"
            >
              {isSubmitting ? "Validating Credentials..." : "Reset Password"}
              {!isSubmitting && <ArrowRight className="ml-2 h-4 w-4" />}
            </Button>

            <FieldDescription className="text-center text-xs">
              Don&apos;t have an account?{" "}
              <Link
                href="/eos/signup"
                className="font-medium text-teal-600 hover:underline"
              >
                Sign up
              </Link>
            </FieldDescription>
          </form>
        </CardContent>

        <CardFooter className="flex items-center justify-center gap-2 rounded-b-xl border-t border-slate-100 bg-slate-50/50 p-6 text-xs text-slate-500">
          <ShieldCheck className="h-4 w-4 shrink-0 text-teal-600" />
          <span>
            Enforced with ironclad zero-trust infrastructure protocols.
          </span>
        </CardFooter>
      </Card>
    </main>
  )
}
