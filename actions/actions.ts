"use server"

import {
  createCustomerService,
  deleteCustomerByIdService,
  deleteCustomersService,
  FiltersProps,
  getCustomerByIdService,
  purgeFilteredRecordsService,
  updateCustomerByIdService,
} from "@/services/customer-service"
import { CustomerEssentials } from "@/lib/types"
import { CustomerTable } from "@/components/table-customer/columns"
import { Customer, User } from "@/generated/prisma/client"
import { ActionResult } from "@/components/customer-form"
import {
  deleteUserByIdService,
  getUserByIdService,
  updateUserByIdService,
} from "@/services/user-service"
import { revalidatePath } from "next/cache"
import { utcOffsetToDB } from "@/lib/utils"
import { redirect } from "next/navigation"
import { UnauthenticatedError } from "@/lib/exceptions"

// Customer Action
export async function createCustomerAction(
  data: CustomerEssentials,
  offset: number
): Promise<ActionResult<CustomerTable>> {
  const utcBirthDate = utcOffsetToDB(data.birthDate, offset)
  const utcSpouseBirthdate = data.spouseBirthdate
    ? utcOffsetToDB(data.spouseBirthdate, offset)
    : null
  const utcReferenceDate = data.referenceDate
    ? utcOffsetToDB(data.referenceDate, offset)
    : null

  data = {
    ...data,
    birthDate: utcBirthDate,
    spouseBirthdate: utcSpouseBirthdate,
    referenceDate: utcReferenceDate,
  }

  const [result, error] = await createCustomerService(data)
  if (error) {
    return { error: error.message, success: false }
  }
  revalidatePath("/dashboard/customer")
  revalidatePath("/dashboard/summary")
  return { data: result, success: true }
}

export async function getCustomerByIdAction(
  id: string
): Promise<ActionResult<Customer>> {
  const [result, error] = await getCustomerByIdService(id)
  if (error) {
    return { error: error.message, success: false }
  }
  return { data: result, success: true }
}

export async function updateCustomerByIdAction(
  id: string,
  data: CustomerEssentials,
  offset: number
): Promise<ActionResult<CustomerTable>> {
  const utcBirthDate = utcOffsetToDB(data.birthDate, offset)
  const utcSpouseBirthdate = data.spouseBirthdate
    ? utcOffsetToDB(data.spouseBirthdate, offset)
    : null
  const utcReferenceDate = data.referenceDate
    ? utcOffsetToDB(data.referenceDate, offset)
    : null

  data = {
    ...data,
    birthDate: utcBirthDate,
    spouseBirthdate: utcSpouseBirthdate,
    referenceDate: utcReferenceDate,
  }

  const [result, error] = await updateCustomerByIdService(id, data)
  if (error) {
    return { error: error.message, success: false }
  }
  revalidatePath("/dashboard/customer")
  revalidatePath("/dashboard/summary")
  return { data: result, success: true }
}

export async function deleteCustomerByIdAction(id: string) {
  const [result, error] = await deleteCustomerByIdService(id)
  if (error) {
    return { error: error.message, success: false }
  }
  revalidatePath("/dashboard/customer")
  revalidatePath("/dashboard/summary")
  return { data: result, success: true }
}

export async function deleteCustomersAction(ids: string[]) {
  const [result, error] = await deleteCustomersService(ids)
  if (error) {
    return { error: error.message, success: false }
  }
  revalidatePath("/dashboard/customer")
  revalidatePath("/dashboard/summary")
  return { data: result, success: true }
}

// User Actions
export async function getUserByIdAction(
  id: string
): Promise<ActionResult<User>> {
  const [result, error] = await getUserByIdService(id)
  if (error) {
    return { error: error.message, success: false }
  }
  return { data: result, success: true }
}

type UserEssentials = {
  name: string
}
export async function updateUserByIdAction(
  id: string,
  data: { name: string }
): Promise<ActionResult<UserEssentials>> {
  const [result, error] = await updateUserByIdService(id, data)
  if (error) {
    return { error: error.message, success: false }
  }
  revalidatePath("/dashboard/settings")
  return { data: result, success: true }
}

export async function deleteUserByIdAction(id: string) {
  const [result, error] = await deleteUserByIdService(id)
  if (error) {
    return { error: error.message, success: false }
  }
  revalidatePath("/dashboard/settings")
  return { data: result, success: true }
}

// Purge Records
export async function purgeFilteredRecordsAction(filters: FiltersProps) {
  try {
    await purgeFilteredRecordsService(filters)
    revalidatePath("/dashboard/purge")
    return
  } catch (error) {
    if (error instanceof UnauthenticatedError) {
      throw new Error("AUTH_REQUIRED")
    }
    throw new Error("DATABASE_ERROR")
  }
}
