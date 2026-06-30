"use client"

import Link from "next/link"
import { Mail, ShieldCheck, ArrowRight } from "lucide-react"
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
import { useRouter } from "next/navigation"
import { authClient } from "@/lib/auth-client"

const formSchema = z.object({
  email: z.email(),
})

export function ForgotPasswordForm() {
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  })

  // Authentication loading state machine
  const { isSubmitting } = form.formState

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { error } = await authClient.requestPasswordReset({
      email: values.email,
      redirectTo: "/eos/reset-password",
    })

    if (error) {
      toast.error(error.message)
    } else {
      toast.success("Password reset email sent")
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
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-1.5">
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="email" className="uppercase">
                      Work Email
                    </FieldLabel>
                    <div className="relative">
                      <Mail className="absolute top-2 left-3 h-4 w-4 text-slate-400" />
                      <Input
                        {...field}
                        id="email"
                        type="email"
                        aria-invalid={fieldState.invalid}
                        className="rounded-md border-slate-200 py-2 pr-4 pl-10 text-sm transition-all focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
                        // autoComplete="off"
                      />
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
              {isSubmitting ? "Validating Credentials..." : "Reset Credentials"}
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
