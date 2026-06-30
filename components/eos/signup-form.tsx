"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"

import { Input } from "@/components/ui/input"
import z from "zod"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import {
  ArrowRight,
  Check,
  EyeIcon,
  EyeOffIcon,
  Lock,
  Mail,
  User,
} from "lucide-react"
import { signUpAction } from "@/actions/auth"

const formSchema = z
  .object({
    email: z.email(),
    password: z.string().min(8, "Must contain at least 8 characters"),
    confirm_password: z.string().min(8, "Must match password"),
    name: z.string().min(1, "Name is required"),
  })
  .refine(
    (data) => {
      if (data.password !== data.confirm_password) {
        return false
      }
      return true
    },
    {
      message: "Must match password",
      path: ["confirm_password"],
    }
  )

export function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirm_password: "",
      name: "",
    },
  })
  const { isSubmitting } = form.formState

  async function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data)
    const { success, message } = await signUpAction(
      data.email,
      data.password,
      data.name
    )

    if (success) {
      toast.success(message as string)
      router.push("/dashboard/customer")
    } else {
      form.setError("email", { type: "server", message })
      form.setFocus("email")
      toast.error(message)
    }
  }

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-12 sm:px-6 lg:grid lg:grid-cols-12 lg:items-center lg:gap-8">
      {/* LEFT COLUMN: BRAND VALUE PROPOSITIONS */}
      <div className="hidden space-y-6 pr-4 lg:col-span-5 lg:block">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 xl:text-4xl">
          Provision your secure platform instance
        </h1>
        <p className="text-sm leading-relaxed text-slate-500">
          Set up an isolated enterprise workspace environment matching your
          regional data compliance and structural parameters.
        </p>

        {/* Micro validation items */}
        <ul className="space-y-3 border-t border-slate-200 pt-4">
          {[
            "Isolated multi-tenant container architecture",
            "Instant legal doc framework generation",
            "SOC2 & GDPR compliance tracking layers",
            "Active corporate HRIS directory sync hooks",
          ].map((text, idx) => (
            <li
              key={idx}
              className="flex items-center space-x-2.5 text-xs font-medium text-slate-600"
            >
              <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-teal-500/20 bg-teal-50">
                <Check className="h-3 w-3 text-teal-600" />
              </div>
              <span>{text}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* RIGHT COLUMN: CORE SECURE INTERACTIVE CONTEXT SIGNUP CARD */}
      <div className="mx-auto w-full max-w-md lg:col-span-7">
        <Card className="border-slate-200 bg-white shadow-xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold tracking-tight text-slate-900">
              Create your workspace
            </CardTitle>
            <CardDescription className="text-sm text-slate-500">
              Get started with your corporate email address to claim your
              company profile sub-domain.
            </CardDescription>
          </CardHeader>

          <CardContent className="mt-3 space-y-5">
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel
                      htmlFor="name"
                      className="text-xs font-bold tracking-wider text-slate-600 uppercase"
                    >
                      Enterprise Name
                    </FieldLabel>
                    <div className="relative">
                      <User className="absolute top-2 left-3 h-4 w-4 text-slate-400" />
                      <Input
                        {...field}
                        id="name"
                        type="text"
                        // placeholder="John Doe"
                        className="w-full rounded-md border border-slate-200 bg-white py-2 pr-4 pl-10 text-sm transition-all outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
                        aria-invalid={fieldState.invalid}
                        // autoComplete="off"
                      />
                    </div>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel
                      htmlFor="email"
                      className="text-xs font-bold tracking-wider text-slate-600 uppercase"
                    >
                      Corporate Email
                    </FieldLabel>
                    <div className="relative">
                      <Mail className="absolute top-2 left-3 h-4 w-4 text-slate-400" />
                      <Input
                        {...field}
                        id="email"
                        type="email"
                        // placeholder="m@example.com"
                        className="w-full rounded-md border border-slate-200 bg-white py-2 pr-4 pl-10 text-sm transition-all outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
                        aria-invalid={fieldState.invalid}
                        // autoComplete="off"
                      />
                    </div>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Field>
                <Field className="grid grid-cols-2 gap-4">
                  <Controller
                    name="password"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel
                          htmlFor="password"
                          className="text-xs font-bold tracking-wider text-slate-600 uppercase"
                        >
                          System Password
                        </FieldLabel>
                        <div className="relative">
                          <Lock className="absolute top-2 left-3 h-4 w-4 text-slate-400" />
                          <Input
                            {...field}
                            id="password"
                            type={showPassword ? "text" : "password"}
                            className="w-full rounded-md border border-slate-200 bg-white py-2 pr-4 pl-10 text-sm transition-all outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
                            aria-invalid={fieldState.invalid}
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
                    name="confirm_password"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel
                          htmlFor="confirm_password"
                          className="text-xs font-bold tracking-wider text-slate-600 uppercase"
                        >
                          Confirm Password
                        </FieldLabel>
                        <div className="relative">
                          <Lock className="absolute top-2 left-3 h-4 w-4 text-slate-400" />
                          <Input
                            {...field}
                            id="confirm_password"
                            type={showConfirmPassword ? "text" : "password"}
                            className="w-full rounded-md border border-slate-200 bg-white py-2 pr-4 pl-10 text-sm transition-all outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
                            aria-invalid={fieldState.invalid}
                          />
                          <button
                            type="button"
                            onClick={() =>
                              setShowConfirmPassword((prev) => !prev)
                            }
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
                </Field>
              </Field>
              {/* Terms notification validation */}
              <p className="text-[11px] leading-relaxed text-slate-500">
                By provisioning this system, you authorize automated policy
                synchronization according to our{" "}
                <Link href="#" className="text-teal-600 hover:underline">
                  Data Protection Standard
                </Link>{" "}
                and{" "}
                <Link href="#" className="text-teal-600 hover:underline">
                  Enterprise Agreement Terms
                </Link>
                .
              </p>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="mt-2 w-full bg-linear-to-r from-teal-600 to-emerald-800 py-5 font-semibold text-white shadow-md transition-all hover:from-teal-700 hover:to-emerald-900 disabled:opacity-50"
              >
                {isSubmitting
                  ? "Provisioning Container Instance..."
                  : "Initialize System Provisioning"}
                {!isSubmitting && <ArrowRight className="ml-2 h-4 w-4" />}
              </Button>
              <CardFooter className="flex items-center justify-center gap-1.5 rounded-b-xl border-t border-slate-100 bg-slate-50/50 p-4 text-xs text-slate-500">
                <span>Already have an active workspace container profile?</span>
                <Link
                  href="/eos/signin"
                  className="font-semibold text-teal-600 hover:underline"
                >
                  Sign in
                </Link>
              </CardFooter>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
