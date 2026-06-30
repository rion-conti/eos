import {
  deleteUserById,
  getUserTableById,
  updateUserById,
} from "@/dal/user-dal"

import { Prisma, User } from "@/generated/prisma/client"
import { checkAuth } from "@/lib/checkAuth"
import { Result } from "./customer-service"

export async function getUserTableByIdService(id: string) {
  await checkAuth()
  return await getUserTableById(id)
}

export async function getUserByIdService(id: string): Promise<Result<User>> {
  await checkAuth()

  let user
  try {
    user = await getUserTableById(id)

    if (!user) {
      console.error("Validation Error: No user record found")
      return [null, { message: "No user record found" }]
    }
    return [user, null]
  } catch (error) {
    console.error("Validation Error: Could not get user details:", error)
    return [null, { message: "Could not get user details" }]
  }
}

type AccountEmail = {
  name: string
  email: string
}

export async function deleteUserByIdService(
  id: string
): Promise<Result<AccountEmail>> {
  await checkAuth()

  const [_user, error] = await getUserByIdService(id)
  if (error) {
    console.error(error.message)
    return [null, { message: error.message }]
  }

  let deletedUser
  try {
    deletedUser = await deleteUserById(id)
  } catch (error) {
    console.error("Validation Error: Could not delete user: ", error)
    return [null, { message: "Could not delete user" }]
  }
  return [deletedUser, null]
}

type Name = { name: string }

export async function updateUserByIdService(
  id: string,
  editUser: { name: string }
): Promise<Result<Name>> {
  await checkAuth()

  const [user, error] = await getUserByIdService(id)

  if (error) {
    console.error("Validation Error: No user record found")
    return [null, { message: error.message }]
  }

  const updatedUser = { ...user, ...editUser }
  let newUser
  try {
    newUser = await updateUserById(id, updatedUser)
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        console.error("Validation Error: Email already exists")
        return [null, { message: "Email already exists" }]
      }
    }
    console.error("Validation Error: Could not update user.", error)
    return [null, { message: "Could not update user" }]
  }
  return [newUser, null]
}
