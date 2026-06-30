import { User } from "@/generated/prisma/client"
import { prisma } from "@/lib/prisma"

export async function getUserTableById(id: string) {
  //checkauth
  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
  })

  return user
}

export async function deleteUserById(id: string) {
  //checkauth
  const deletedUser = await prisma.user.delete({
    where: {
      id: id,
    },
    select: {
      name: true,
      email: true,
    },
  })

  return deletedUser
}

export async function updateUserById(id: string, newUser: User) {
  //checkauth
  const user = await prisma.user.update({
    where: { id: id },
    data: newUser,
    select: {
      name: true,
    },
  })

  return user
}
