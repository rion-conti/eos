import { FormValues } from "@/components/customer-form"
import { Customer } from "@/generated/prisma/client"

export type CustomerEssentials = Omit<
  Customer,
  "id" | "createdAt" | "updatedAt"
>

export type CustomerFormWithId = FormValues & { id: string }
