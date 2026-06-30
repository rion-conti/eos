"use client"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EyeIcon, EyeOffIcon, RefreshCw, Trash2 } from "lucide-react"
import { useState } from "react"
import { User } from "@/generated/prisma/client"
import z from "zod"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { Spinner } from "./ui/spinner"
import { updateUserByIdAction } from "@/actions/actions"
import { Field, FieldError, FieldLabel } from "./ui/field"
import { authClient } from "@/lib/auth-client"
import {
  accountSchemaDelete,
  accountSchemaName,
  accountSchemaPassword,
} from "@/schemas/user"

type AccountFormProps = {
  data: User
}

export default function AccountForm({ data }: AccountFormProps) {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [showPasswordDelete, setShowPasswordDelete] = useState(false)

  const router = useRouter()
  const currentName = data?.name || "Batman"
  const sessionUserId = data?.id
  const formName = useForm<z.infer<typeof accountSchemaName>>({
    resolver: zodResolver(accountSchemaName),
    defaultValues: {
      name: "",
    },
  })

  const formPassword = useForm<z.infer<typeof accountSchemaPassword>>({
    resolver: zodResolver(accountSchemaPassword),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  })
  const formDelete = useForm<z.infer<typeof accountSchemaDelete>>({
    resolver: zodResolver(accountSchemaDelete),
    defaultValues: {
      deletePassword: "",
    },
  })

  const { isSubmitting: isSubmittingName } = formName.formState
  const { isSubmitting: isSubmittingPassword } = formPassword.formState
  const { isSubmitting: isSubmittingDelete } = formDelete.formState

  async function onSubmitUser(data: z.infer<typeof accountSchemaName>) {
    let result
    try {
      result = await updateUserByIdAction(sessionUserId, data)
      if (!result.success) {
        console.log(result.error)
        toast.error("Update failed", {
          description: result.error,
        })
        return
      }
      toast.success("User updated", {
        description: `${result.data.name} was updated successfully.`,
      })
    } catch (error) {
      console.log(error)
      toast.error("Update failed", {
        description: "Something went wrong while updating the user.",
      })
    } finally {
      formName.reset()
      router.push("/dashboard/settings")
      return
    }
  }
  function handleReset() {
    formDelete.reset()
    formPassword.reset()
    formName.reset()
  }

  async function onSubmitPassword(
    value: z.infer<typeof accountSchemaPassword>
  ) {
    const { data, error } = await authClient.changePassword({
      currentPassword: value.currentPassword,
      newPassword: value.newPassword,
      revokeOtherSessions: true, // Optional: logs out other devices
    })

    if (error) {
      console.log(error)
      formPassword.setError("currentPassword", {
        type: "server",
        message: error.message,
      })
      toast.error("Changed password failed", {
        description: error.message,
      })

      return
    }
    toast.success("Changed password updated", {
      description: `${data.user.name}'s password was updated successfully.`,
    })
    formPassword.reset()
    router.push("/dashboard/settings")
  }

  async function onSubmitDelete(value: z.infer<typeof accountSchemaDelete>) {
    const { data, error } = await authClient.deleteUser({
      password: value.deletePassword,
    })

    if (error) {
      console.log(error)
      formDelete.setError("deletePassword", {
        type: "server",
        message: error.message,
      })
      toast.error("Delete failed", {
        description: error.message,
      })
      return
    }

    toast.success("Deleted user", {
      description: `${currentName} was deleted successfully.`,
    })
    router.push("/signin")
  }

  return (
    <Card className="rounded-2xl shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl">Account Settings</CardTitle>
        <CardDescription>Manage your account settings</CardDescription>
      </CardHeader>

      <CardContent>
        <Tabs defaultValue="password" className="w-full">
          <TabsList className="mb-5 flex w-full gap-2">
            <TabsTrigger
              value="password"
              id="trigger-password"
              aria-controls="content-password"
            >
              Change Password
            </TabsTrigger>
            <TabsTrigger
              value="username"
              id="trigger-username"
              aria-controls="content-username"
            >
              Change Username
            </TabsTrigger>
            <TabsTrigger
              value="delete"
              id="trigger-delete"
              aria-controls="content-delete"
            >
              Delete Account
            </TabsTrigger>
          </TabsList>

          <div className="mb-5">
            <Button variant="outline" onClick={handleReset}>
              <RefreshCw /> Reset
            </Button>
          </div>

          <TabsContent
            value="password"
            id="content-password"
            aria-labelledby="trigger-password"
          >
            <form
              onSubmit={formPassword.handleSubmit(onSubmitPassword)}
              className="space-y-4"
            >
              <Controller
                name="currentPassword"
                control={formPassword.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="currentPassword">
                      Current Password
                    </FieldLabel>
                    <div className="relative">
                      <Input
                        {...field}
                        id="currentPassword"
                        type={showCurrentPassword ? "text" : "password"}
                        aria-invalid={fieldState.invalid}
                      />

                      <button
                        type="button"
                        onClick={() => setShowCurrentPassword((prev) => !prev)}
                        className="absolute top-1/2 right-2 -translate-y-1/2 text-muted-foreground"
                        tabIndex={-1}
                      >
                        {showCurrentPassword ? (
                          <EyeOffIcon className="h-4 w-4" />
                        ) : (
                          <EyeIcon className="h-4 w-4" />
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
                name="newPassword"
                control={formPassword.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="newPassword">New Password</FieldLabel>
                    <div className="relative">
                      <Input
                        {...field}
                        id="newPassword"
                        type={showNewPassword ? "text" : "password"}
                        aria-invalid={fieldState.invalid}
                      />

                      <button
                        type="button"
                        onClick={() => setShowNewPassword((prev) => !prev)}
                        className="absolute top-1/2 right-2 -translate-y-1/2 text-muted-foreground"
                        tabIndex={-1}
                      >
                        {showNewPassword ? (
                          <EyeOffIcon className="h-4 w-4" />
                        ) : (
                          <EyeIcon className="h-4 w-4" />
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
                control={formPassword.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="confirmPassword">
                      Confirm Password
                    </FieldLabel>
                    <div className="relative">
                      <Input
                        {...field}
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        aria-invalid={fieldState.invalid}
                      />

                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                        className="absolute top-1/2 right-2 -translate-y-1/2 text-muted-foreground"
                        tabIndex={-1}
                      >
                        {showConfirmPassword ? (
                          <EyeOffIcon className="h-4 w-4" />
                        ) : (
                          <EyeIcon className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Button
                type="submit"
                className="w-full"
                disabled={isSubmittingPassword}
              >
                {isSubmittingPassword ? <Spinner /> : "Update Password"}
              </Button>
            </form>
          </TabsContent>

          <TabsContent
            value="username"
            id="content-username"
            aria-labelledby="trigger-username"
          >
            <form
              onSubmit={formName.handleSubmit(onSubmitUser)}
              className="space-y-4"
            >
              <div className="space-y-2">
                <div>
                  {`Current Username:`}
                  <span className="ml-2 text-lg">{currentName}</span>
                </div>
                <Controller
                  name="name"
                  control={formName.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <div className="flex items-center">
                        <FieldLabel htmlFor="name">New Username</FieldLabel>
                      </div>
                      <div className="relative">
                        <Input
                          {...field}
                          id="name"
                          type="text"
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
              </div>
              <Button
                type="submit"
                className="w-full"
                disabled={isSubmittingName}
              >
                {isSubmittingName ? <Spinner /> : "Save Username"}
              </Button>
            </form>
          </TabsContent>

          <TabsContent
            value="delete"
            id="content-delete"
            aria-labelledby="trigger-delete"
          >
            <form onSubmit={formDelete.handleSubmit(onSubmitDelete)}>
              <div className="space-y-6">
                <div className="rounded-lg border border-red-200 bg-red-50 p-4">
                  <p className="font-medium text-red-600">
                    Warning: This action cannot be undone.
                  </p>
                </div>

                <div className="space-y-2">
                  <Controller
                    name="deletePassword"
                    control={formDelete.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <div className="flex items-center">
                          <FieldLabel htmlFor="deletePassword">
                            Enter your password to confirm deletion
                          </FieldLabel>
                        </div>
                        <div className="relative">
                          <Input
                            {...field}
                            id="deletePassword"
                            type={showPasswordDelete ? "text" : "password"}
                            aria-invalid={fieldState.invalid}
                            // autoComplete="off"
                          />
                          <button
                            type="button"
                            onClick={() =>
                              setShowPasswordDelete((prev) => !prev)
                            }
                            className="absolute top-1/2 right-2 -translate-y-1/2 text-muted-foreground"
                            tabIndex={-1}
                          >
                            {showPasswordDelete ? (
                              <EyeOffIcon className="h-4 w-4" />
                            ) : (
                              <EyeIcon className="h-4 w-4" />
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

                <Button
                  type="submit"
                  variant="destructive"
                  className="flex w-full items-center gap-2"
                  disabled={isSubmittingDelete}
                >
                  {isSubmittingDelete ? (
                    <Spinner />
                  ) : (
                    <>
                      <Trash2 size={16} /> Delete Account
                    </>
                  )}
                </Button>
              </div>
            </form>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
