import { FormValues } from "@/components/customer-form"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { Customer } from "@/generated/prisma/client"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function sleep(ms: number) {
  await new Promise((resolve) => setTimeout(resolve, ms))
}

export function nullToUndefined<T extends Record<string, unknown>>(obj: T): T {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [
      key,
      value === null ? undefined : value,
    ])
  ) as T
}

export function undefinedToNull<T extends Record<string, unknown>>(obj: T) {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [
      key,
      value === undefined ? null : value,
    ])
  ) as { [K in keyof T]: T[K] extends undefined ? null : T[K] }
}

export function normalizeNullToEmptyString<T extends Record<string, unknown>>(
  obj: T
): T {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [
      key,
      value === null ? "" : value,
    ])
  ) as T
}

export function transformFormToDB(values: FormValues) {
  const {
    currentAddress,
    homeCountryAddress,
    sourceofFunds,
    purposeAccountOpening,
    ...rest
  } = values

  const flattened = {
    ...rest,
    ...currentAddress,
    ...homeCountryAddress,
    ...sourceofFunds,
    ...purposeAccountOpening,
  }
  return undefinedToNull(flattened)
}

const defaultCustomerForm: FormValues = {
  customerStatus: "created",
  countryLocation: "ksa",
  lastname: "",
  firstname: "",
  middlename: "",
  suffix: "",
  otherName: "",
  birthDate: undefined as unknown as Date,
  birthPlace: "",
  birthCountry: "",
  currentAddress: {
    chouse: "",
    cstreet: "",
    ccity: "",
    cstate: "",
    cpostalcode: "",
    ccountry: "",
  },
  homeCountryAddress: {
    phouse: "",
    pfloor: "",
    pbuildingName: "",
    pstreet: "",
    psubdivision: "",
    pbarangay: "",
    pcity: "",
    pprovince: "",
    pdistrict: "",
    pcountry: "",
    pzipcode: "",
  },
  email: "",
  currentMobile: "",
  homeCountryMobile: "",
  companyName: "",
  jobTitle: "",
  companyAddress: "",
  civilStatus: "" as "unmarried",
  nationality: "FILIPINO",
  gender: "",
  spouseName: "",
  spouseBirthdate: undefined,
  noofChildren: 0,
  typeIdNumber: "",
  noIdReason: "",
  motherMaidenName: "",
  typeofIdPresented: "",
  idPresentedNumber: "",
  noofDependents: 0,
  referenceRemittance: "",
  referenceDate: undefined,
  typeofAccount: "NSA",
  newOrUpdate: "new account",
  preferredBranch: "EO - ",
  natureofEmployment: "" as "ctn",
  employmentSpecifyOther: "",
  sourceofFunds: {
    sofSalaryEmployment: true,
    sofBusiness: false,
    sofPension: false,
    sofRemittances: false,
    sofCountryofOrigin: "",
    sofSaleofAsset: false,
    sofOthers: false,
    sofSpecifyOther: "",
  },
  purposeAccountOpening: {
    paoSavings: true,
    paoBusiness: false,
    paoPension: false,
    paoRemittance: false,
    paoOrigin: "",
    paoDestination: "",
    paoOthers: false,
    paoSpecifyOther: "",
  },
  jobTitlePosition: "ofw",
  jobTitlePositionSpecifyOther: "",
  expectedFreqTransaction: "oth",
  expectedFreqSpecifyOther: "2x",
  averageAmountTransaction: "below50k",
  preferredMailingAddress: "permanent",
}

export function transformDBToForm(data: Customer | null | undefined) {
  if (!data) return defaultCustomerForm

  const localBirthDate = localDateToForm(new Date(data.birthDate))

  const localSpouseBirthdate = data.spouseBirthdate
    ? localDateToForm(new Date(data.spouseBirthdate))
    : undefined

  const localReferenceDate = data.referenceDate
    ? localDateToForm(new Date(data.referenceDate))
    : undefined

  return {
    id: data.id,
    customerStatus: data.customerStatus,
    countryLocation: data.countryLocation,
    lastname: data.lastname,
    firstname: data.firstname,
    middlename: data.middlename,
    suffix: data.suffix ?? "",
    otherName: data.otherName ?? "",
    birthDate: localBirthDate,
    birthPlace: data.birthPlace,
    birthCountry: data.birthCountry,
    currentAddress: mapCurrentAddressFromDB(data),
    homeCountryAddress: mapHomeCountryAddressFromDB(data),
    email: data.email,
    currentMobile: data.currentMobile,
    homeCountryMobile: data.homeCountryMobile,
    companyName: data.companyName ?? "",
    jobTitle: data.jobTitle ?? "",
    companyAddress: data.companyAddress ?? "",
    civilStatus: data.civilStatus,
    nationality: data.nationality,
    gender: data.gender,
    spouseName: data.spouseName ?? "",
    spouseBirthdate: localSpouseBirthdate,
    noofChildren: data.noofChildren ?? 0,
    typeofId: data.typeofId ?? undefined,
    typeIdNumber: data.typeIdNumber ?? "",
    noIdReason: data.noIdReason ?? "",
    motherMaidenName: data.motherMaidenName ?? "",
    typeofIdPresented: data.typeofIdPresented ?? "",
    idPresentedNumber: data.idPresentedNumber ?? "",
    noofDependents: data.noofDependents ?? 0,
    referenceRemittance: data.referenceRemittance ?? "",
    referenceDate: localReferenceDate,
    typeofAccount: data.typeofAccount ?? "",
    newOrUpdate: data.newOrUpdate,
    preferredBranch: data.preferredBranch,
    natureofEmployment: data.natureofEmployment,
    employmentSpecifyOther: data.employmentSpecifyOther ?? "",
    sourceofFunds: mapSourceofFundsFromDB(data),
    purposeAccountOpening: mapPurposeAccountOpeningFromDB(data),
    jobTitlePosition: data.jobTitlePosition,
    jobTitlePositionSpecifyOther: data.jobTitlePositionSpecifyOther ?? "",
    expectedFreqTransaction: data.expectedFreqTransaction,
    expectedFreqSpecifyOther: data.expectedFreqSpecifyOther ?? "",
    averageAmountTransaction: data.averageAmountTransaction,
    preferredMailingAddress: data.preferredMailingAddress,
    userId: data.userId,
    createdBy: data.createdBy,
    updatedBy: data.updatedBy,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
  }
}

function mapCurrentAddressFromDB(data: Customer) {
  return {
    chouse: data.chouse ?? "",
    cstreet: data.cstreet ?? "",
    ccity: data.ccity ?? "",
    cstate: data.cstate ?? "",
    cpostalcode: data.cpostalcode ?? "",
    ccountry: data.ccountry ?? "",
  }
}

function mapHomeCountryAddressFromDB(data: Customer) {
  return {
    phouse: data.phouse ?? "",
    pfloor: data.pfloor ?? "",
    pbuildingName: data.pbuildingName ?? "",
    pstreet: data.pstreet ?? "",
    psubdivision: data.psubdivision ?? "",
    pbarangay: data.pbarangay ?? "",
    pcity: data.pcity ?? "",
    pprovince: data.pprovince ?? "",
    pdistrict: data.pdistrict ?? "",
    pcountry: data.pcountry ?? "",
    pzipcode: data.pzipcode ?? "",
  }
}

function mapSourceofFundsFromDB(data: Customer) {
  return {
    sofSalaryEmployment: data.sofSalaryEmployment ?? false,
    sofBusiness: data.sofBusiness ?? false,
    sofPension: data.sofPension ?? false,
    sofRemittances: data.sofRemittances ?? false,
    sofCountryofOrigin: data.sofCountryofOrigin ?? "",
    sofSaleofAsset: data.sofSaleofAsset ?? false,
    sofOthers: data.sofOthers ?? false,
    sofSpecifyOther: data.sofSpecifyOther ?? "",
  }
}

function mapPurposeAccountOpeningFromDB(data: Customer) {
  return {
    paoSavings: data.paoSavings ?? false,
    paoBusiness: data.paoBusiness ?? false,
    paoPension: data.paoPension ?? false,
    paoRemittance: data.paoRemittance ?? false,
    paoOrigin: data.paoOrigin ?? "",
    paoDestination: data.paoDestination ?? "",
    paoOthers: data.paoOthers ?? false,
    paoSpecifyOther: data.paoSpecifyOther ?? "",
  }
}

export function formatDateSafe(value: string | Date | null | undefined) {
  if (!value) return "-"
  const date = new Date(value)
  if (isNaN(date.getTime())) return "-"
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date)
}

export function formatDateMDY(
  value: string | Date | null | undefined,
  option: string
) {
  if (!value) return
  const date = new Date(value)
  if (isNaN(date.getTime())) return "-"
  if (option === "mdy") {
    return new Intl.DateTimeFormat("en-US", {}).format(date)
  }
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  }).format(date)
}

export function utcOffsetToDB(date: Date, offset: number) {
  const utcDate = new Date(date.getTime() - offset * 60000)
  return utcDate
}

export function utcOffsetToForm(date: Date, offset: number) {
  const utcDate = new Date(date.getTime() + offset * 60000)
  return utcDate
}

export function localDateToForm(date: Date) {
  const localDate = new Date(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate()
  )
  return localDate
}

export function isValidDateString(dateStr: string | undefined): boolean {
  if (!dateStr) return false

  const regex = /^\d{4}-\d{2}-\d{2}$/
  if (!regex.test(dateStr)) return false

  // Parse numbers to check for calendar reality (e.g., prevent February 30th)
  const [year, month, day] = dateStr.split("-").map(Number)
  const date = new Date(year, month - 1, day)

  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  )
}