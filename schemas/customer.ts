import z from "zod"

export const CUSTOMER_STATUSES = [
  "created",
  "for_printing",
  "completed",
  "shipped_out",
  "ho_accepted",
  "ho_returned_doc",
  "ho_shipped_out",
  "atm_delivered",
  "pending",
  "cancelled",
] as const

export const CIVIL_STATUSES = [
  "unmarried",
  "married",
  "separated",
  "widowed",
  "divorced",
  "annulled",
] as const

export const CARD_ID = [
  "none",
  "sss",
  "gsis",
  "umid",
  "tin",
  "philhealth",
  "pag_ibig",
] as const

export const NATURE_EMPLOYMENT = [
  { value: "none", label: "- none -" },
  { value: "ctn", label: "CTN - construction" },
  { value: "fin", label: "FIN - finance/insurance/securities" },
  { value: "fsp", label: "FSP - food service/food processing" },
  { value: "mfg", label: "MFG - manufacturing" },
  { value: "msp", label: "MSP - maritime/shipping" },
  { value: "tou", label: "TOU - tourism" },
  { value: "mdl", label: "MDL - health services" },
  { value: "oth", label: "OTH - others please specify" },
] as const

export const NATURE_EMPLOYMENT_VALUES = NATURE_EMPLOYMENT.map(
  (s) => s.value
) as ["none", "ctn", "fin", "fsp", "mfg", "msp", "tou", "mdl", "oth"]

export const JOB_POSITION = [
  { value: "none", label: "- none -" },
  { value: "tsm", label: "TSM - top/senior management" },
  { value: "rfc", label: "RFC - rank and file/clerical" },
  { value: "ofw", label: "OFW - overseas filipino worker" },
  { value: "self", label: "SELF - self-employed" },
  { value: "oth", label: "OTH - others please specify" },
] as const

const JOB_POSITION_VALUES = JOB_POSITION.map((s) => s.value) as [
  "none",
  "tsm",
  "rfc",
  "ofw",
  "self",
  "oth",
]

export const EXPECTED_FREQUENCY = [
  { value: "none", label: "- none -" },
  { value: "a5x", label: "5x" },
  { value: "a10x", label: "10x" },
  { value: "a15x", label: "15x" },
  { value: "oth", label: "OTH - others please specify" },
] as const

const EXPECTED_FREQUENCY_VALUES = EXPECTED_FREQUENCY.map((s) => s.value) as [
  "none",
  "a5x",
  "a10x",
  "a15x",
  "oth",
]

export const AVERAGE_AMOUNT = [
  { value: "none", label: "- none -" },
  { value: "below50k", label: "below P50k" },
  { value: "a51k", label: "P51k to P100k" },
  { value: "a101k", label: "P101k to P500k" },
  { value: "a501k", label: "P501 and above" },
] as const

const AVERAGE_AMOUNT_VALUES = AVERAGE_AMOUNT.map((s) => s.value) as [
  "none",
  "below50k",
  "a51k",
  "a101k",
  "a501k",
]

export const MAILING_ADDRESS = [
  { value: "none", label: "- none -" },
  { value: "permanent", label: "permanent address" },
  { value: "present", label: "present address" },
  { value: "business_employer", label: "business/employer address" },
] as const

const MAILING_ADDRESS_VALUES = MAILING_ADDRESS.map((s) => s.value) as [
  "none",
  "permanent",
  "present",
  "business_employer",
]

export const customerSchema = z.object({
  customerStatus: z.enum(CUSTOMER_STATUSES, { message: "Status is required" }),
  countryLocation: z.string().min(1, { message: "Status is required" }),
  lastname: z.string().min(1, "Last name is required"),
  firstname: z.string().min(1, "First name is required"),
  middlename: z.string().min(1, "Middle name is required"),
  suffix: z.string().optional().default(""),
  otherName: z.string().optional().default(""),
  birthDate: z.date({ message: "Date of birth is required" }).refine(
    (date) => {
      const today = new Date()
      today.setHours(0, 0, 0, 0) // normalize
      return date < today
    },
    {
      message: "Date of birth must be earlier than today",
    }
  ),
  birthPlace: z.string().min(1, "Place of birth is required"),
  birthCountry: z.string().min(1, "Country of birth is required"),
  currentAddress: z.object({
    chouse: z.string().min(1, "Present address is required"),
    cstreet: z.string().optional().default(""),
    ccity: z.string().optional().default(""),
    cstate: z.string().optional().default(""),
    cpostalcode: z.string().optional().default(""),
    ccountry: z.string().min(1, "Country is required"),
  }),
  homeCountryAddress: z.object({
    phouse: z.string().min(1, "Philippine address is required"),
    pfloor: z.string().optional().default(""),
    pbuildingName: z.string().optional().default(""),
    pstreet: z.string().optional().default(""),
    psubdivision: z.string().optional().default(""),
    pbarangay: z.string().optional().default(""),
    pcity: z.string().optional().default(""),
    pprovince: z.string().optional().default(""),
    pdistrict: z.string().optional().default(""),
    pcountry: z.string().min(1, "Country is required"),
    pzipcode: z.string().min(1, "Zip code is required"),
  }),
  email: z.email(),
  currentMobile: z.string().min(1, "KSA mobile number is required"),
  homeCountryMobile: z.string().min(1, "Philippine mobile number is required"),
  companyName: z.string().optional().default(""),
  jobTitle: z.string().optional().default(""),
  companyAddress: z.string().optional().default(""),
  civilStatus: z.enum(CIVIL_STATUSES, { message: "Status is required" }),
  nationality: z.string().min(1, "Nationality is required"),
  gender: z.string().min(1, "Gender is required"),
  spouseName: z.string().optional().default(""),
  spouseBirthdate: z.date().optional(),
  noofChildren: z.number().min(0).nullable().optional(),
  typeofId: z.enum(CARD_ID).optional(),
  typeIdNumber: z
    .string()
    .regex(/^\d+$/, "Digits only")
    .optional()
    .nullable()
    .or(z.literal("")),
  noIdReason: z.string().optional().default(""),
  motherMaidenName: z.string().optional().default(""),
  typeofIdPresented: z.string().optional().default(""),
  idPresentedNumber: z.string().optional().default(""),
  noofDependents: z.number().min(0).nullable().optional(),
  referenceRemittance: z.string().optional().default(""),
  referenceDate: z.date().optional(),
  typeofAccount: z.string().optional().default(""),
  newOrUpdate: z.string({ message: "New or updating acount is required" }),
  preferredBranch: z.string({ message: "Preferred branch is required" }),
  natureofEmployment: z.enum(NATURE_EMPLOYMENT_VALUES, {
    message: "Nature of employment is required",
  }),
  employmentSpecifyOther: z.string().optional().default(""),
  sourceofFunds: z.object({
    sofSalaryEmployment: z.boolean().optional().default(false),
    sofBusiness: z.boolean().optional().default(false),
    sofPension: z.boolean().optional().default(false),
    sofRemittances: z.boolean().optional().default(false),
    sofCountryofOrigin: z.string().optional().default(""),
    sofSaleofAsset: z.boolean().optional().default(false),
    sofOthers: z.boolean().optional().default(false),
    sofSpecifyOther: z.string().optional().default(""),
  }),
  purposeAccountOpening: z.object({
    paoSavings: z.boolean().optional().default(false),
    paoBusiness: z.boolean().optional().default(false),
    paoPension: z.boolean().optional().default(false),
    paoRemittance: z.boolean().optional().default(false),
    paoOrigin: z.string().optional().default(""),
    paoDestination: z.string().optional().default(""),
    paoOthers: z.boolean().optional().default(false),
    paoSpecifyOther: z.string().optional().default(""),
  }),
  jobTitlePosition: z.enum(JOB_POSITION_VALUES, {
    message: "Job position is required",
  }),
  jobTitlePositionSpecifyOther: z.string().optional().default(""),
  expectedFreqTransaction: z.enum(EXPECTED_FREQUENCY_VALUES, {
    message: "Expected frequency of transaction is required",
  }),
  expectedFreqSpecifyOther: z.string().optional().default(""),
  averageAmountTransaction: z.enum(AVERAGE_AMOUNT_VALUES, {
    message: "Average amount of transaction is required",
  }),
  preferredMailingAddress: z.enum(MAILING_ADDRESS_VALUES, {
    message: "Preferred mailing address is required",
  }),
})
