import z from "zod"

export const accountSchemaName = z.object({
  name: z.string().min(1, "Must contain at least 1 character"),
})

export const accountSchemaDelete = z.object({
  deletePassword: z.string().min(1, "Must contain at least 1 character"),
})

export const accountSchemaPassword = z
  .object({
    currentPassword: z.string().min(1, "Must contain at least 1 character"),
    newPassword: z.string().min(8, "Must contain at least 8 characters"),
    confirmPassword: z.string().min(8, "Must contain at least 8 characters"),
  })
  .refine((data) => data.newPassword !== data.currentPassword, {
    message: "New password cannot be the same as your current password",
    path: ["newPassword"],
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "New password must be the same with confirm password",
    path: ["confirmPassword"],
  })