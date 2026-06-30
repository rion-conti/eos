import { prisma } from "@/lib/prisma"
import { CustomerEssentials } from "../lib/types"
import { Customer, CustomerStatus } from "../generated/prisma/client"

export async function getAllCustomersTable() {
  //checkauth
  const customers = await prisma.customer.findMany({
    select: {
      id: true,
      customerStatus: true,
      lastname: true,
      firstname: true,
      middlename: true,
      suffix: true,
      email: true,
      currentMobile: true,
      homeCountryMobile: true,
      createdBy: true,
      updatedBy: true,
      createdAt: true,
      updatedAt: true,
    },
  })
  return customers
}

export async function getAllCustomersTableByUser(userId: string) {
  //checkauth
  const customers = await prisma.customer.findMany({
    where: { userId },
    select: {
      id: true,
      customerStatus: true,
      lastname: true,
      firstname: true,
      middlename: true,
      suffix: true,
      email: true,
      currentMobile: true,
      homeCountryMobile: true,
      createdBy: true,
      updatedBy: true,
      createdAt: true,
      updatedAt: true,
    },
  })
  return customers
}

export async function getCustomerById(id: string) {
  //checkauth
  const customer = await prisma.customer.findUnique({
    where: {
      id: id,
    },
  })

  return customer
}

export async function deleteCustomerById(id: string) {
  //checkauth
  const deletedCustomer = await prisma.customer.delete({
    where: {
      id: id,
    },
    select: {
      lastname: true,
      firstname: true,
    },
  })

  return deletedCustomer
}

export async function deleteCustomers(ids: string[]) {
  //checkauth
  const deletedCount = await prisma.customer.deleteMany({
    where: {
      id: { in: ids },
    },
  })
  return { deletedCount: deletedCount.count }
}

export async function createCustomer(newCustomer: CustomerEssentials) {
  //checkauth
  const customer = await prisma.customer.create({
    data: newCustomer,
    select: {
      id: true,
      customerStatus: true,
      lastname: true,
      firstname: true,
      middlename: true,
      suffix: true,
      email: true,
      currentMobile: true,
      homeCountryMobile: true,
      createdBy: true,
      updatedBy: true,
      createdAt: true,
      updatedAt: true,
    },
  })

  return customer
}

export async function updateCustomerById(
  id: Customer["id"],
  newCustomer: CustomerEssentials
) {
  //checkauth
  const customer = await prisma.customer.update({
    where: { id: id },
    data: newCustomer,
    select: {
      id: true,
      customerStatus: true,
      lastname: true,
      firstname: true,
      middlename: true,
      suffix: true,
      email: true,
      currentMobile: true,
      homeCountryMobile: true,
      createdBy: true,
      updatedBy: true,
      createdAt: true,
      updatedAt: true,
    },
  })

  return customer
}

export async function getCustomersSummaryCounts() {
  const [
    total,
    created,
    forPrinting,
    completed,
    shippedOut,
    hoAccepted,
    hoReturnedDoc,
    hoShippedOut,
    atmDelivered,
    pending,
    cancelled,
  ] = await prisma.$transaction([
    prisma.customer.count(),
    prisma.customer.count({ where: { customerStatus: "created" } }),
    prisma.customer.count({ where: { customerStatus: "for_printing" } }),
    prisma.customer.count({ where: { customerStatus: "completed" } }),
    prisma.customer.count({ where: { customerStatus: "shipped_out" } }),
    prisma.customer.count({ where: { customerStatus: "ho_accepted" } }),
    prisma.customer.count({ where: { customerStatus: "ho_returned_doc" } }),
    prisma.customer.count({ where: { customerStatus: "ho_shipped_out" } }),
    prisma.customer.count({ where: { customerStatus: "atm_delivered" } }),
    prisma.customer.count({ where: { customerStatus: "pending" } }),
    prisma.customer.count({ where: { customerStatus: "cancelled" } }),
  ])
  return {
    total,
    created,
    forPrinting,
    completed,
    shippedOut,
    hoAccepted,
    hoReturnedDoc,
    hoShippedOut,
    atmDelivered,
    pending,
    cancelled,
  }
}

// Purge Records
type WhereClauseProps = {
  recordStatus?: CustomerStatus
  purgeDate?: Date
  createdAt?: { lte: Date }
}

export async function getFilteredRecords(whereClause: WhereClauseProps) {
  return await prisma.customer.findMany({
    where: whereClause,
  })
}

export async function purgeFilteredRecords(whereClause: WhereClauseProps) {
  return await prisma.customer.deleteMany({
    where: whereClause,
  })
}

// Download Customer
export async function getDownloadCustomers() {
  const customers = await prisma.customer.findMany({
    select: {
      id: true,
      customerStatus: true,
      lastname: true,
      firstname: true,
      middlename: true,
      suffix: true,
      email: true,
      birthDate: true,
      currentMobile: true,
      homeCountryMobile: true,
      createdAt: true,
    },
  })
  return customers
}

// Demographics Analysis
// No await in prisma as it will be used as part of await Promise.all later on...
export async function getCustomersGroupByGender() {
  const groupByGender = prisma.customer.groupBy({
    by: ["gender"],
    _count: { gender: true },
  })
  return groupByGender
}

export async function getCustomersGroupByCivilStatus() {
  const groupByCivilStatus = prisma.customer.groupBy({
    by: ["civilStatus"],
    _count: { civilStatus: true },
  })
  return groupByCivilStatus
}

export async function getCustomersBirthdateAndZipcode() {
  const customers = prisma.customer.findMany({
    select: {
      birthDate: true,
      pzipcode: true,
    },
  })
  return customers
}

export async function getDemographicsData() {
  const [genderGroup, civilStatusGroup, rawCustomerData] = await Promise.all([
    getCustomersGroupByGender(),
    getCustomersGroupByCivilStatus(),
    getCustomersBirthdateAndZipcode(),
  ])
  return { genderGroup, civilStatusGroup, rawCustomerData }
}
