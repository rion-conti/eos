"use client"

import z from "zod"
import {
  AVERAGE_AMOUNT,
  CIVIL_STATUSES,
  customerSchema,
  EXPECTED_FREQUENCY,
  JOB_POSITION,
  NATURE_EMPLOYMENT,
  CARD_ID,
  MAILING_ADDRESS,
  CUSTOMER_STATUSES,
} from "@/schemas/customer"
import { motion } from "motion/react"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Input } from "@/components/ui/input"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useEffect, useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import H1 from "@/components/H1"
import { useConditionalField } from "@/components/forms/hooks/useConditionalField"
import CustomerFormBtn from "@/components/customer-form-btn"
import { CustomerTable } from "@/components/table-customer/columns"
import { CustomerFormWithId } from "@/lib/types"

export type FormValues = z.infer<typeof customerSchema>

export type ActionResult<T> =
  | { success: true; data: T }
  | { success: false; error: string }

type CustomerFormProps = {
  actionType: string
  onSubmit?: (
    values: FormValues,
    offset: number
  ) => Promise<ActionResult<CustomerTable>>
  data?: FormValues | CustomerFormWithId
}

export default function CustomerForm({
  actionType,
  onSubmit,
  data,
}: CustomerFormProps) {
  const [dobOpen, setDobOpen] = useState(false)
  const [spDobOpen, setSpDobOpen] = useState(false)
  const [refOpen, setRefOpen] = useState(false)

  const customerType =
    actionType === "edit" ? "Edit" : actionType === "view" ? "View" : "New"
  const isViewMode = actionType === "view"

  const form = useForm({
    resolver: zodResolver(customerSchema),
    defaultValues: data,
  })

  const showSoFRemit = useConditionalField({
    form,
    watchName: "sourceofFunds.sofRemittances",
    expectedValue: true,
    resetName: "sourceofFunds.sofCountryofOrigin",
  })
  const showSoFOthers = useConditionalField({
    form,
    watchName: "sourceofFunds.sofOthers",
    expectedValue: true,
    resetName: "sourceofFunds.sofSpecifyOther",
  })

  const showNoEOthers = useConditionalField({
    form,
    watchName: "natureofEmployment",
    expectedValue: "oth",
    resetName: "employmentSpecifyOther",
  })

  const showPoAOthers = useConditionalField({
    form,
    watchName: "purposeAccountOpening.paoOthers",
    expectedValue: true,
    resetName: "purposeAccountOpening.paoSpecifyOther",
  })

  const showJTPOthers = useConditionalField({
    form,
    watchName: "jobTitlePosition",
    expectedValue: "oth",
    resetName: "jobTitlePositionSpecifyOther",
  })
  const showEFTOthers = useConditionalField({
    form,
    watchName: "expectedFreqTransaction",
    expectedValue: "oth",
    resetName: "expectedFreqSpecifyOther",
  })

  const { isSubmitting } = form.formState

  useEffect(() => {
    if (showNoEOthers) {
      form.setFocus("employmentSpecifyOther")
    }
  }, [showNoEOthers, form])

  useEffect(() => {
    if (showSoFRemit) {
      form.setFocus("sourceofFunds.sofCountryofOrigin")
    }
  }, [showSoFRemit, form])

  useEffect(() => {
    if (showSoFOthers) {
      form.setFocus("sourceofFunds.sofSpecifyOther")
    }
  }, [showSoFOthers, form])

  useEffect(() => {
    if (showJTPOthers) {
      form.setFocus("jobTitlePositionSpecifyOther")
    }
  }, [showJTPOthers, form])

  useEffect(() => {
    if (showPoAOthers) {
      form.setFocus("purposeAccountOpening.paoSpecifyOther")
    }
  }, [showPoAOthers, form])

  async function handleOnSubmit(values: FormValues) {
    if (onSubmit) {
      const offset = new Date().getTimezoneOffset()
      const result = await onSubmit(values, offset)

      if (!result.success) {
        form.setError("email", { type: "server", message: result.error })
        form.setFocus("email")
      }
    }
  }

  return (
    <>
      <div className="container mx-auto my-6 px-4">
        <H1>{customerType} Customer</H1>

        <form onSubmit={form.handleSubmit(handleOnSubmit)}>
          {(actionType === "add" || actionType === "edit") && (
            <div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-4 h-9"
                onClick={() => form.reset()}
              >
                Reset
              </Button>
            </div>
          )}

          <FieldGroup className="mt-4">
            <FieldSet>
              {actionType === "edit" && (
                <FieldGroup className="w-40">
                  <Controller
                    name="customerStatus"
                    control={form.control}
                    render={({
                      field: { onChange, onBlur, value, ...field },
                      fieldState,
                    }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name}>
                          Customer Status
                        </FieldLabel>

                        <Select value={value ?? ""} onValueChange={onChange}>
                          <SelectTrigger
                            aria-invalid={fieldState.invalid}
                            onBlur={onBlur}
                            id={field.name}
                          >
                            {/* Let SelectValue render automatically */}
                            <SelectValue placeholder="Select customer status" />
                          </SelectTrigger>

                          <SelectContent>
                            {CUSTOMER_STATUSES.map((status) => (
                              <SelectItem key={status} value={status}>
                                {status}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </Field>
                    )}
                  />
                </FieldGroup>
              )}

              <FieldGroup className="rounded-md border p-4 shadow-md">
                <FieldDescription>Full name as per passport</FieldDescription>

                <FieldGroup className="flex-col rounded-md border p-4 shadow-md">
                  <FieldGroup className="flex-row">
                    <Controller
                      name="lastname"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor={field.name}>
                            Last Name
                          </FieldLabel>
                          <Input
                            {...field}
                            id={field.name}
                            aria-invalid={fieldState.invalid}
                            placeholder=""
                            disabled={isViewMode} // Disabled in view mode
                            aria-disabled={isViewMode} // For accessibility
                            autoComplete="off"
                          />

                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />

                    <Controller
                      name="firstname"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor={field.name}>
                            First Name
                          </FieldLabel>
                          <Input
                            {...field}
                            id={field.name}
                            aria-invalid={fieldState.invalid}
                            placeholder=""
                            disabled={isViewMode} // Disabled in view mode
                            aria-disabled={isViewMode} // For accessibility
                            autoComplete="off"
                          />

                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />

                    <Controller
                      name="middlename"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor={field.name}>
                            Middle Name
                          </FieldLabel>
                          <Input
                            {...field}
                            id={field.name}
                            aria-invalid={fieldState.invalid}
                            placeholder=""
                            disabled={isViewMode} // Disabled in view mode
                            aria-disabled={isViewMode} // For accessibility
                            autoComplete="off"
                          />

                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />
                  </FieldGroup>

                  <FieldGroup className="flex-row items-start gap-3">
                    <Controller
                      name="suffix"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field
                          className="w-full sm:w-[150px]"
                          data-invalid={fieldState.invalid}
                        >
                          <FieldLabel htmlFor={field.name}>Suffix</FieldLabel>
                          <div className="max-w-xs">
                            <Input
                              {...field}
                              id={field.name}
                              aria-invalid={fieldState.invalid}
                              placeholder="eg. JR, III"
                              maxLength={10}
                              disabled={isViewMode} // Disabled in view mode
                              aria-disabled={isViewMode} // For accessibility
                              autoComplete="off"
                            />
                          </div>

                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />
                    <Controller
                      name="otherName"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field
                          // className="w-40 flex-none"
                          className="w-full sm:w-[150px]"
                          data-invalid={fieldState.invalid}
                        >
                          <FieldLabel htmlFor={field.name}>
                            Other Name /AKA
                          </FieldLabel>
                          <div className="max-w-xs">
                            <Input
                              {...field}
                              id={field.name}
                              aria-invalid={fieldState.invalid}
                              placeholder=""
                              disabled={isViewMode} // Disabled in view mode
                              aria-disabled={isViewMode} // For accessibility
                              autoComplete="off"
                            />
                          </div>

                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />
                  </FieldGroup>
                </FieldGroup>
              </FieldGroup>
            </FieldSet>

            <FieldSet>
              <FieldGroup className="rounded-md border p-4 shadow-md">
                <FieldDescription>Birth Information</FieldDescription>

                <FieldGroup className="flex-row rounded-md border p-4 shadow-md">
                  <FieldGroup className="flex flex-col flex-wrap items-start gap-4 sm:flex-row">
                    <Controller
                      name="birthDate"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field
                          className="w-full sm:w-[260px]"
                          data-invalid={fieldState.invalid}
                        >
                          <FieldLabel htmlFor="birthDate">
                            Date of Birth (mm/dd/yyyy)
                          </FieldLabel>

                          <Popover open={dobOpen} onOpenChange={setDobOpen}>
                            <PopoverTrigger
                              render={
                                <Button
                                  variant="outline"
                                  id="birthDate"
                                  className="w-full justify-start font-normal"
                                  aria-invalid={fieldState.invalid}
                                  disabled={isViewMode} // Disabled in view mode
                                  aria-disabled={isViewMode} // For accessibility
                                ></Button>
                              }
                            >
                              {field.value
                                ? field.value.toLocaleDateString()
                                : "Select date"}
                            </PopoverTrigger>

                            <PopoverContent
                              className="w-auto overflow-hidden p-0"
                              align="start"
                            >
                              <Calendar
                                mode="single"
                                selected={field.value}
                                defaultMonth={field.value}
                                disabled={(date) => {
                                  const today = new Date()
                                  today.setHours(0, 0, 0, 0)
                                  return date >= today
                                }}
                                captionLayout="dropdown"
                                onSelect={(date) => {
                                  field.onChange(date) // ✅ updates RHF
                                  field.onBlur()
                                  setDobOpen(false) // ✅ close popover
                                }}
                              />
                            </PopoverContent>
                          </Popover>

                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />

                    <Controller
                      name="birthPlace"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field
                          className="w-full sm:w-[260px]"
                          data-invalid={fieldState.invalid}
                        >
                          <FieldLabel htmlFor={field.name}>
                            Place of Birth
                          </FieldLabel>
                          <Input
                            {...field}
                            id={field.name}
                            aria-invalid={fieldState.invalid}
                            placeholder=""
                            disabled={isViewMode} // Disabled in view mode
                            aria-disabled={isViewMode} // For accessibility
                          />

                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />

                    <Controller
                      name="birthCountry"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field
                          className="w-full sm:w-[260px]"
                          data-invalid={fieldState.invalid}
                        >
                          <FieldLabel htmlFor={field.name}>
                            Country of Birth
                          </FieldLabel>
                          <Input
                            {...field}
                            id={field.name}
                            aria-invalid={fieldState.invalid}
                            placeholder=""
                            disabled={isViewMode} // Disabled in view mode
                            aria-disabled={isViewMode} // For accessibility
                          />

                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />
                  </FieldGroup>
                </FieldGroup>
              </FieldGroup>
            </FieldSet>

            <FieldSet>
              <FieldGroup className="rounded-md border p-4 shadow-md">
                <FieldDescription>Present Complete Address</FieldDescription>
                <FieldGroup className="flex-column rounded-md border p-4 shadow-md">
                  <FieldGroup className="flex-row">
                    <Controller
                      name="currentAddress.chouse"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor={field.name}>
                            House/Unit/Floor No.
                          </FieldLabel>
                          <Input
                            {...field}
                            id={field.name}
                            aria-invalid={fieldState.invalid}
                            placeholder=""
                            disabled={isViewMode} // Disabled in view mode
                            aria-disabled={isViewMode} // For accessibility
                            autoComplete="off"
                          />

                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />

                    <Controller
                      name="currentAddress.cstreet"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor={field.name}>Street</FieldLabel>
                          <Input
                            {...field}
                            id={field.name}
                            aria-invalid={fieldState.invalid}
                            placeholder=""
                            disabled={isViewMode} // Disabled in view mode
                            aria-disabled={isViewMode} // For accessibility
                            autoComplete="off"
                          />

                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />
                    <Controller
                      name="currentAddress.ccity"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor={field.name}>City</FieldLabel>
                          <Input
                            {...field}
                            id={field.name}
                            aria-invalid={fieldState.invalid}
                            placeholder=""
                            disabled={isViewMode} // Disabled in view mode
                            aria-disabled={isViewMode} // For accessibility
                          />

                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />
                  </FieldGroup>

                  <FieldGroup className="flex-row">
                    <Controller
                      name="currentAddress.cstate"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor={field.name}>State</FieldLabel>
                          <Input
                            {...field}
                            id={field.name}
                            aria-invalid={fieldState.invalid}
                            placeholder=""
                            disabled={isViewMode} // Disabled in view mode
                            aria-disabled={isViewMode} // For accessibility
                            autoComplete="off"
                          />

                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />
                    <Controller
                      name="currentAddress.cpostalcode"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor={field.name}>
                            Postal Code
                          </FieldLabel>
                          <Input
                            {...field}
                            id={field.name}
                            aria-invalid={fieldState.invalid}
                            placeholder=""
                            disabled={isViewMode} // Disabled in view mode
                            aria-disabled={isViewMode} // For accessibility
                          />

                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />
                    <Controller
                      name="currentAddress.ccountry"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor={field.name}>Country</FieldLabel>
                          <Input
                            {...field}
                            id={field.name}
                            aria-invalid={fieldState.invalid}
                            placeholder=""
                            disabled={isViewMode} // Disabled in view mode
                            aria-disabled={isViewMode} // For accessibility
                          />

                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />
                  </FieldGroup>
                </FieldGroup>
              </FieldGroup>
            </FieldSet>

            <FieldSet>
              <FieldGroup className="rounded-md border p-4 shadow-md">
                <FieldDescription>Philippine Complete Address</FieldDescription>
                <FieldGroup className="flex-column rounded-md border p-4 shadow-md">
                  <FieldGroup className="flex-row">
                    <Controller
                      name="homeCountryAddress.phouse"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor={field.name}>
                            House/Unit
                          </FieldLabel>
                          <Input
                            {...field}
                            id={field.name}
                            aria-invalid={fieldState.invalid}
                            placeholder=""
                            disabled={isViewMode} // Disabled in view mode
                            aria-disabled={isViewMode} // For accessibility
                            autoComplete="off"
                          />

                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />
                    <Controller
                      name="homeCountryAddress.pfloor"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor={field.name}>Floor</FieldLabel>
                          <Input
                            {...field}
                            id={field.name}
                            aria-invalid={fieldState.invalid}
                            placeholder=""
                            disabled={isViewMode} // Disabled in view mode
                            aria-disabled={isViewMode} // For accessibility
                            autoComplete="off"
                          />

                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />
                    <Controller
                      name="homeCountryAddress.pbuildingName"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor={field.name}>
                            Building Name
                          </FieldLabel>
                          <Input
                            {...field}
                            id={field.name}
                            aria-invalid={fieldState.invalid}
                            placeholder=""
                            disabled={isViewMode} // Disabled in view mode
                            aria-disabled={isViewMode} // For accessibility
                            autoComplete="off"
                          />

                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />
                  </FieldGroup>
                  <FieldGroup className="flex-row">
                    <Controller
                      name="homeCountryAddress.pstreet"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor={field.name}>Street</FieldLabel>
                          <Input
                            {...field}
                            id={field.name}
                            aria-invalid={fieldState.invalid}
                            placeholder=""
                            disabled={isViewMode} // Disabled in view mode
                            aria-disabled={isViewMode} // For accessibility
                            autoComplete="off"
                          />

                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />

                    <Controller
                      name="homeCountryAddress.psubdivision"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor={field.name}>
                            Subdivision
                          </FieldLabel>
                          <Input
                            {...field}
                            id={field.name}
                            aria-invalid={fieldState.invalid}
                            placeholder=""
                            disabled={isViewMode} // Disabled in view mode
                            aria-disabled={isViewMode} // For accessibility
                            autoComplete="off"
                          />

                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />

                    <Controller
                      name="homeCountryAddress.pbarangay"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor={field.name}>Barangay</FieldLabel>
                          <Input
                            {...field}
                            id={field.name}
                            aria-invalid={fieldState.invalid}
                            placeholder=""
                            disabled={isViewMode} // Disabled in view mode
                            aria-disabled={isViewMode} // For accessibility
                            autoComplete="off"
                          />

                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />
                  </FieldGroup>
                  <FieldGroup className="flex-row">
                    <Controller
                      name="homeCountryAddress.pcity"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor={field.name}>
                            Town/City
                          </FieldLabel>
                          <Input
                            {...field}
                            id={field.name}
                            aria-invalid={fieldState.invalid}
                            placeholder=""
                            disabled={isViewMode} // Disabled in view mode
                            aria-disabled={isViewMode} // For accessibility
                          />

                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />

                    <Controller
                      name="homeCountryAddress.pprovince"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor={field.name}>Province</FieldLabel>
                          <Input
                            {...field}
                            id={field.name}
                            aria-invalid={fieldState.invalid}
                            placeholder=""
                            disabled={isViewMode} // Disabled in view mode
                            aria-disabled={isViewMode} // For accessibility
                          />

                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />

                    <Controller
                      name="homeCountryAddress.pdistrict"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor={field.name}>District</FieldLabel>
                          <Input
                            {...field}
                            id={field.name}
                            aria-invalid={fieldState.invalid}
                            placeholder=""
                            disabled={isViewMode} // Disabled in view mode
                            aria-disabled={isViewMode} // For accessibility
                          />

                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />
                  </FieldGroup>
                  <FieldGroup className="flex-row items-start gap-3">
                    <Controller
                      name="homeCountryAddress.pcountry"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor={field.name}>Country</FieldLabel>
                          <Input
                            {...field}
                            id={field.name}
                            aria-invalid={fieldState.invalid}
                            placeholder=""
                            disabled={isViewMode} // Disabled in view mode
                            aria-disabled={isViewMode} // For accessibility
                          />

                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />

                    <Controller
                      name="homeCountryAddress.pzipcode"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor={field.name}>Zip Code</FieldLabel>
                          <Input
                            {...field}
                            id={field.name}
                            aria-invalid={fieldState.invalid}
                            placeholder=""
                            disabled={isViewMode} // Disabled in view mode
                            aria-disabled={isViewMode} // For accessibility
                          />

                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />
                  </FieldGroup>
                </FieldGroup>
              </FieldGroup>
            </FieldSet>

            <FieldSet>
              <FieldGroup className="rounded-md border p-4 shadow-md">
                <FieldDescription>Mobile and Email</FieldDescription>
                <FieldGroup className="rounded-md border p-4 shadow-md">
                  <div className="flex flex-row gap-4">
                    <Controller
                      name="currentMobile"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor={field.name}>
                            Present Mobile Number
                          </FieldLabel>
                          <Input
                            {...field}
                            id={field.name}
                            aria-invalid={fieldState.invalid}
                            placeholder="E.164 format"
                            disabled={isViewMode} // Disabled in view mode
                            aria-disabled={isViewMode} // For accessibility
                            autoComplete="off"
                          />

                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />
                    <Controller
                      name="homeCountryMobile"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor={field.name}>
                            Philippine Mobile Number
                          </FieldLabel>
                          <Input
                            {...field}
                            id={field.name}
                            aria-invalid={fieldState.invalid}
                            placeholder="E.164 format"
                            disabled={isViewMode} // Disabled in view mode
                            aria-disabled={isViewMode} // For accessibility
                            autoComplete="off"
                          />

                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />
                  </div>
                  <Controller
                    name="email"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                        <Input
                          {...field}
                          id={field.name}
                          aria-invalid={fieldState.invalid}
                          placeholder="xyz@example.com"
                          disabled={isViewMode} // Disabled in view mode
                          aria-disabled={isViewMode} // For accessibility
                          autoComplete="off"
                        />

                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                </FieldGroup>
              </FieldGroup>
            </FieldSet>

            <FieldSet>
              <FieldGroup className="rounded-md border p-4 shadow-md">
                <FieldDescription>
                  Employer and Position Information
                </FieldDescription>
                <FieldGroup className="rounded-md border p-4 shadow-md">
                  <FieldGroup className="flex-row">
                    <Controller
                      name="companyName"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor={field.name}>
                            Employer/Company Name
                          </FieldLabel>
                          <Input
                            {...field}
                            id={field.name}
                            aria-invalid={fieldState.invalid}
                            placeholder=""
                            disabled={isViewMode} // Disabled in view mode
                            aria-disabled={isViewMode} // For accessibility
                          />

                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />

                    <Controller
                      name="jobTitle"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor={field.name}>
                            Job Title/Position
                          </FieldLabel>
                          <Input
                            {...field}
                            id={field.name}
                            aria-invalid={fieldState.invalid}
                            placeholder=""
                            disabled={isViewMode} // Disabled in view mode
                            aria-disabled={isViewMode} // For accessibility
                          />

                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />
                  </FieldGroup>
                  {/* </div> */}
                  <Controller
                    name="companyAddress"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name}>
                          Company Address
                        </FieldLabel>
                        <Input
                          {...field}
                          id={field.name}
                          aria-invalid={fieldState.invalid}
                          placeholder=""
                          disabled={isViewMode} // Disabled in view mode
                          aria-disabled={isViewMode} // For accessibility
                        />

                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                </FieldGroup>
              </FieldGroup>
            </FieldSet>

            <FieldSet>
              <FieldGroup className="rounded-md border p-4 shadow-md">
                <FieldDescription>Customer Profiling</FieldDescription>
                <FieldGroup className="rounded-md border p-4 shadow-md">
                  <FieldGroup className="flex-row">
                    <Controller
                      name="civilStatus"
                      control={form.control}
                      render={({
                        field: { onChange, onBlur, value, ref, ...field },
                        fieldState,
                      }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor={field.name}>
                            Civil Status
                          </FieldLabel>

                          <Select value={value ?? ""} onValueChange={onChange}>
                            <SelectTrigger
                              aria-invalid={fieldState.invalid}
                              ref={ref}
                              onBlur={onBlur}
                              id={field.name}
                              disabled={isViewMode} // Disabled in view mode
                              aria-disabled={isViewMode} // For accessibility
                            >
                              {/* Let SelectValue render automatically */}
                              <SelectValue placeholder="Select a status" />
                            </SelectTrigger>

                            <SelectContent>
                              {CIVIL_STATUSES.map((status) => (
                                <SelectItem key={status} value={status}>
                                  {status}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>

                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />

                    <Controller
                      name="nationality"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor={field.name}>
                            Nationality
                          </FieldLabel>
                          <Input
                            {...field}
                            id={field.name}
                            aria-invalid={fieldState.invalid}
                            placeholder=""
                            disabled={isViewMode} // Disabled in view mode
                            aria-disabled={isViewMode} // For accessibility
                          />

                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />
                  </FieldGroup>

                  <Controller
                    name="gender"
                    control={form.control}
                    render={({
                      field: { name, value, onChange, ref },
                      fieldState,
                    }) => (
                      <>
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel>Gender</FieldLabel>
                        </Field>
                        <RadioGroup
                          name={name}
                          value={value ?? ""}
                          onValueChange={onChange}
                          disabled={isViewMode} // Disabled in view mode
                          aria-disabled={isViewMode} // For accessibility
                        >
                          <FieldGroup className="w-20 flex-row">
                            <Field orientation="horizontal">
                              <RadioGroupItem
                                ref={ref}
                                value="male"
                                id="male" // check this later!
                              />
                              <FieldLabel
                                htmlFor="male"
                                className="font-normal"
                              >
                                Male
                              </FieldLabel>
                            </Field>

                            <Field orientation="horizontal">
                              <RadioGroupItem value="female" id="female" />
                              <FieldLabel
                                htmlFor="female"
                                className="font-normal"
                              >
                                Female
                              </FieldLabel>
                            </Field>
                          </FieldGroup>
                          <FieldContent>
                            {fieldState.invalid && (
                              <FieldError errors={[fieldState.error]} />
                            )}
                          </FieldContent>
                        </RadioGroup>
                      </>
                    )}
                  />

                  <FieldGroup className="grid grid-cols-1 items-end gap-4 sm:grid-cols-3">
                    <Controller
                      name="spouseName"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field
                          className="w-full"
                          data-invalid={fieldState.invalid}
                        >
                          <FieldLabel htmlFor={field.name}>
                            Spouse Name (FN-MN-LN)
                          </FieldLabel>
                          <Input
                            {...field}
                            id={field.name}
                            aria-invalid={fieldState.invalid}
                            placeholder=""
                            disabled={isViewMode} // Disabled in view mode
                            aria-disabled={isViewMode} // For accessibility
                            autoComplete="off"
                          />

                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />

                    <Controller
                      name="spouseBirthdate"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field
                          className="w-full"
                          data-invalid={fieldState.invalid}
                        >
                          <FieldLabel htmlFor="spouseBirthdate">
                            Spouse Date of Birth (mm/dd/yyyy)
                          </FieldLabel>

                          <Popover open={spDobOpen} onOpenChange={setSpDobOpen}>
                            <PopoverTrigger
                              render={
                                <Button
                                  variant="outline"
                                  id="spouseBirthdate"
                                  className="w-full justify-start font-normal"
                                  aria-invalid={fieldState.invalid}
                                  disabled={isViewMode} // Disabled in view mode
                                  aria-disabled={isViewMode} // For accessibility
                                ></Button>
                              }
                            >
                              {field.value
                                ? field.value.toLocaleDateString()
                                : "Select date"}
                            </PopoverTrigger>

                            <PopoverContent
                              className="w-auto overflow-hidden p-0"
                              align="start"
                            >
                              <Calendar
                                mode="single"
                                selected={field.value}
                                defaultMonth={field.value}
                                disabled={(date) => {
                                  const today = new Date()
                                  today.setHours(0, 0, 0, 0)
                                  return date >= today
                                }}
                                captionLayout="dropdown"
                                onSelect={(date) => {
                                  field.onChange(date) // ✅ updates RHF
                                  field.onBlur()
                                  setSpDobOpen(false) // ✅ close popover
                                }}
                              />
                            </PopoverContent>
                          </Popover>

                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />
                    <Controller
                      name="noofChildren"
                      control={form.control}
                      render={({
                        field: { value, onChange, ...field },
                        fieldState,
                      }) => (
                        <Field
                          className="w-full"
                          data-invalid={fieldState.invalid}
                        >
                          <FieldLabel htmlFor={field.name}>
                            No. of Children
                          </FieldLabel>
                          <Input
                            className=""
                            {...field}
                            id={field.name}
                            type="number"
                            min={0}
                            value={value ?? ""}
                            onChange={(e) => {
                              const value = e.target.value
                              if (value === "") {
                                onChange(null)
                                return
                              }
                              const num = e.target.valueAsNumber
                              if (!Number.isNaN(num) && num >= 0) {
                                onChange(num)
                              }
                            }}
                            aria-invalid={fieldState.invalid}
                            placeholder=""
                            disabled={isViewMode} // Disabled in view mode
                            aria-disabled={isViewMode} // For accessibility
                          />

                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />
                  </FieldGroup>
                </FieldGroup>

                <FieldGroup className="rounded-md border p-4 shadow-md">
                  <FieldLabel>
                    SSS/GSIS/UMID/TIN/PHILHEALTH/PAGIBIG Number (whichever is
                    available - NUMBER only)
                  </FieldLabel>

                  <FieldGroup className="flex-row">
                    <Controller
                      name="typeofId"
                      control={form.control}
                      render={({
                        field: { onChange, onBlur, value, ...field },
                        fieldState,
                      }) => (
                        <Field
                          className="w-full sm:w-[260px]"
                          data-invalid={fieldState.invalid}
                        >
                          <FieldLabel htmlFor={field.name}></FieldLabel>

                          <Select value={value ?? ""} onValueChange={onChange}>
                            <SelectTrigger
                              aria-invalid={fieldState.invalid}
                              onBlur={onBlur}
                              id={field.name}
                              disabled={isViewMode} // Disabled in view mode
                              aria-disabled={isViewMode} // For accessibility
                            >
                              {/* Let SelectValue render automatically */}
                              <SelectValue placeholder="Select an ID" />
                            </SelectTrigger>

                            <SelectContent>
                              {CARD_ID.map((status) => (
                                <SelectItem key={status} value={status}>
                                  {status}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>

                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />

                    <Controller
                      name="typeIdNumber"
                      control={form.control}
                      render={({
                        field: { value, onChange, ...field },
                        fieldState,
                      }) => (
                        <Field
                          className="w-full sm:w-[260px]"
                          data-invalid={fieldState.invalid}
                        >
                          <FieldLabel htmlFor={field.name}>{}</FieldLabel>
                          <Input
                            {...field}
                            id={field.name}
                            type="text"
                            inputMode="numeric"
                            value={value ?? ""}
                            onChange={(e) => {
                              const value = e.target.value
                              if (/^\d*$/.test(value)) {
                                onChange(value)
                              }
                            }}
                            aria-invalid={fieldState.invalid}
                            placeholder=""
                            disabled={isViewMode} // Disabled in view mode
                            aria-disabled={isViewMode} // For accessibility
                            autoComplete="off"
                          />

                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />
                  </FieldGroup>

                  <Controller
                    name="noIdReason"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name}>
                          If no TIN/SSS/GSIS/UMID, provide reason
                        </FieldLabel>
                        <Input
                          {...field}
                          id={field.name}
                          aria-invalid={fieldState.invalid}
                          placeholder=""
                          disabled={isViewMode} // Disabled in view mode
                          aria-disabled={isViewMode} // For accessibility
                          autoComplete="off"
                        />

                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                </FieldGroup>

                <FieldGroup className="rounded-md border p-4 shadow-md">
                  <Controller
                    name="motherMaidenName"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name}>
                          Pangalan ng Nanay noong pagkadalaga (FN-MN-LN)
                        </FieldLabel>
                        <Input
                          {...field}
                          id={field.name}
                          aria-invalid={fieldState.invalid}
                          placeholder=""
                          disabled={isViewMode} // Disabled in view mode
                          aria-disabled={isViewMode} // For accessibility
                          autoComplete="off"
                        />

                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                  <FieldGroup className="flex flex-col flex-wrap items-start gap-4 sm:flex-row">
                    <Controller
                      name="typeofIdPresented"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field
                          className="w-full sm:w-[150px]"
                          data-invalid={fieldState.invalid}
                        >
                          <FieldLabel htmlFor={field.name}>
                            Type of ID Presented
                          </FieldLabel>
                          <Input
                            {...field}
                            id={field.name}
                            aria-invalid={fieldState.invalid}
                            placeholder=""
                            disabled={isViewMode} // Disabled in view mode
                            aria-disabled={isViewMode} // For accessibility
                          />

                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />
                    <Controller
                      name="idPresentedNumber"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field
                          className="w-full sm:w-[150px]"
                          data-invalid={fieldState.invalid}
                        >
                          <FieldLabel htmlFor={field.name}>
                            ID Number
                          </FieldLabel>
                          <Input
                            {...field}
                            id={field.name}
                            aria-invalid={fieldState.invalid}
                            placeholder=""
                            disabled={isViewMode} // Disabled in view mode
                            aria-disabled={isViewMode} // For accessibility
                            autoComplete="off"
                          />

                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />
                    <Controller
                      name="noofDependents"
                      control={form.control}
                      render={({
                        field: { value, onChange, ...field },
                        fieldState,
                      }) => (
                        <Field
                          className="w-full sm:w-[150px]"
                          data-invalid={fieldState.invalid}
                        >
                          <FieldLabel htmlFor={field.name}>
                            No. of Dependents
                          </FieldLabel>
                          <Input
                            {...field}
                            type="number"
                            id={field.name}
                            min={0}
                            value={value ?? ""}
                            onChange={(e) => {
                              const value = e.target.value
                              if (value === "") {
                                onChange(null)
                                return
                              }
                              const num = e.target.valueAsNumber
                              if (!Number.isNaN(num) && num >= 0) {
                                onChange(num)
                              }
                            }}
                            aria-invalid={fieldState.invalid}
                            placeholder=""
                            disabled={isViewMode} // Disabled in view mode
                            aria-disabled={isViewMode} // For accessibility
                          />

                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />
                  </FieldGroup>
                </FieldGroup>
              </FieldGroup>
            </FieldSet>

            <H1>Bank Representative&apos;s Input</H1>
            <FieldSet>
              <FieldGroup className="rounded-md border p-4 shadow-md">
                <FieldDescription>
                  Remittance and Branch Information
                </FieldDescription>

                <FieldGroup className="rounded-md border p-4 shadow-md">
                  <FieldGroup className="flex-row">
                    <Controller
                      name="referenceRemittance"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor={field.name}>
                            Reference/Remittance No.
                          </FieldLabel>
                          <Input
                            {...field}
                            id={field.name}
                            aria-invalid={fieldState.invalid}
                            placeholder=""
                            disabled={isViewMode} // Disabled in view mode
                            aria-disabled={isViewMode} // For accessibility
                            autoComplete="off"
                          />

                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />
                    <Controller
                      name="referenceDate"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor="referenceDate">Date</FieldLabel>

                          <Popover open={refOpen} onOpenChange={setRefOpen}>
                            <PopoverTrigger
                              render={
                                <Button
                                  variant="outline"
                                  id="referenceDate"
                                  className="w-full justify-start font-normal"
                                  aria-invalid={fieldState.invalid}
                                  disabled={isViewMode} // Disabled in view mode
                                  aria-disabled={isViewMode} // For accessibility
                                ></Button>
                              }
                            >
                              {field.value
                                ? field.value.toLocaleDateString()
                                : "Select date"}
                            </PopoverTrigger>

                            <PopoverContent
                              className="w-auto overflow-hidden p-0"
                              align="start"
                            >
                              <Calendar
                                mode="single"
                                selected={field.value}
                                defaultMonth={field.value}
                                captionLayout="dropdown"
                                onSelect={(date) => {
                                  field.onChange(date) // ✅ updates RHF
                                  field.onBlur()
                                  setRefOpen(false) // ✅ close popover
                                }}
                              />
                            </PopoverContent>
                          </Popover>

                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />
                  </FieldGroup>
                  <FieldGroup className="flex-row">
                    <Controller
                      name="typeofAccount"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor={field.name}>
                            Type of Account
                          </FieldLabel>
                          <Input
                            {...field}
                            id={field.name}
                            aria-invalid={fieldState.invalid}
                            placeholder=""
                            disabled={isViewMode} // Disabled in view mode
                            aria-disabled={isViewMode} // For accessibility
                          />

                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />
                    <Controller
                      name="preferredBranch"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor={field.name}>
                            Preferred Branch
                          </FieldLabel>
                          <Input
                            {...field}
                            id={field.name}
                            aria-invalid={fieldState.invalid}
                            placeholder=""
                            disabled={isViewMode} // Disabled in view mode
                            aria-disabled={isViewMode} // For accessibility
                          />

                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />
                  </FieldGroup>

                  <Controller
                    name="newOrUpdate"
                    control={form.control}
                    render={({ field: { onChange, ...field }, fieldState }) => (
                      <>
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel>New / Updating Account</FieldLabel>
                        </Field>
                        <RadioGroup
                          defaultValue="new account"
                          name="newOrUpdate"
                          onValueChange={onChange}
                          disabled={isViewMode} // Disabled in view mode
                          aria-disabled={isViewMode} // For accessibility
                        >
                          <FieldGroup className="w-20 flex-row">
                            <Field orientation="horizontal">
                              <RadioGroupItem
                                {...field}
                                value="new account"
                                id="new account"
                              />
                              <FieldLabel
                                htmlFor="new account"
                                className="font-normal"
                              >
                                New account
                              </FieldLabel>
                            </Field>

                            <Field orientation="horizontal">
                              <RadioGroupItem value="updating" id="updating" />
                              <FieldLabel
                                htmlFor="updating"
                                className="font-normal"
                              >
                                Updating
                              </FieldLabel>
                            </Field>
                          </FieldGroup>
                          <FieldContent>
                            {fieldState.invalid && (
                              <FieldError errors={[fieldState.error]} />
                            )}
                          </FieldContent>
                        </RadioGroup>
                      </>
                    )}
                  />
                </FieldGroup>
              </FieldGroup>
            </FieldSet>

            <FieldSet>
              <FieldGroup className="rounded-md border p-4 shadow-md">
                <FieldDescription>Other Customer Profiling</FieldDescription>

                <FieldSet>
                  <FieldGroup className="rounded-md border p-4 shadow-md">
                    <Controller
                      name="natureofEmployment"
                      control={form.control}
                      render={({
                        field: { onChange, onBlur, value, ref, ...field },
                        fieldState,
                      }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor={field.name}>
                            Nature of Employment/Business
                          </FieldLabel>

                          <Select value={value ?? ""} onValueChange={onChange}>
                            <SelectTrigger
                              aria-invalid={fieldState.invalid}
                              ref={ref}
                              onBlur={onBlur}
                              id={field.name}
                              disabled={isViewMode} // Disabled in view mode
                              aria-disabled={isViewMode} // For accessibility
                            >
                              {/* Let SelectValue render automatically */}
                              <SelectValue placeholder="Select a nature of employment">
                                {
                                  NATURE_EMPLOYMENT.find(
                                    (item) => item.value === value
                                  )?.label
                                }
                              </SelectValue>
                            </SelectTrigger>

                            <SelectContent>
                              {NATURE_EMPLOYMENT.map((status) => (
                                <SelectItem
                                  key={status.value}
                                  value={status.value}
                                >
                                  {status.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>

                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />

                    <motion.div
                      initial={false}
                      animate={{
                        height: showNoEOthers ? "auto" : 0,
                        opacity: showNoEOthers ? 1 : 0,
                      }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      style={{ overflow: "hidden" }}
                    >
                      <Controller
                        name="employmentSpecifyOther"
                        control={form.control}
                        render={({ field, fieldState }) => (
                          <Field
                            data-invalid={fieldState.invalid}
                            className={
                              !showNoEOthers ? "pointer-events-none" : ""
                            }
                          >
                            <FieldLabel htmlFor={field.name}>
                              If others, please specify
                            </FieldLabel>
                            <Input
                              {...field}
                              id={field.name}
                              disabled={!showNoEOthers || isViewMode}
                              aria-invalid={fieldState.invalid}
                              placeholder="Please specify..."
                              aria-disabled={isViewMode} // For accessibility
                            />

                            {fieldState.invalid && showNoEOthers && (
                              <FieldError errors={[fieldState.error]} />
                            )}
                          </Field>
                        )}
                      />
                    </motion.div>
                  </FieldGroup>
                </FieldSet>

                <FieldSet>
                  <FieldGroup className="rounded-md border p-4 shadow-md">
                    <FieldContent>
                      <FieldLabel>
                        Source/s of Funds (Please check ALL that apply)
                      </FieldLabel>

                      <FieldGroup data-slot="checkbox-group">
                        <Controller
                          name="sourceofFunds.sofSalaryEmployment"
                          control={form.control}
                          render={({
                            field: { value, onChange, ...field },
                            fieldState,
                          }) => (
                            <Field
                              data-invalid={fieldState.invalid}
                              orientation="horizontal"
                            >
                              <Checkbox
                                {...field}
                                checked={value}
                                onCheckedChange={onChange}
                                id={field.name}
                                aria-invalid={fieldState.invalid}
                                disabled={isViewMode} // Disabled in view mode
                                aria-disabled={isViewMode} // For accessibility
                              />
                              <FieldContent>
                                <FieldLabel htmlFor={field.name}>
                                  Salary/Employment
                                </FieldLabel>
                                {fieldState.invalid && (
                                  <FieldError errors={[fieldState.error]} />
                                )}
                              </FieldContent>
                            </Field>
                          )}
                        />
                        <Controller
                          name="sourceofFunds.sofBusiness"
                          control={form.control}
                          render={({
                            field: { value, onChange, ...field },
                            fieldState,
                          }) => (
                            <Field
                              data-invalid={fieldState.invalid}
                              orientation="horizontal"
                            >
                              <Checkbox
                                {...field}
                                checked={value}
                                onCheckedChange={onChange}
                                id={field.name}
                                aria-invalid={fieldState.invalid}
                                disabled={isViewMode} // Disabled in view mode
                                aria-disabled={isViewMode} // For accessibility
                              />
                              <FieldContent>
                                <FieldLabel htmlFor={field.name}>
                                  Business
                                </FieldLabel>
                                {fieldState.invalid && (
                                  <FieldError errors={[fieldState.error]} />
                                )}
                              </FieldContent>
                            </Field>
                          )}
                        />
                        <Controller
                          name="sourceofFunds.sofPension"
                          control={form.control}
                          render={({
                            field: { value, onChange, ...field },
                            fieldState,
                          }) => (
                            <Field
                              data-invalid={fieldState.invalid}
                              orientation="horizontal"
                            >
                              <Checkbox
                                {...field}
                                checked={value}
                                onCheckedChange={onChange}
                                id={field.name}
                                aria-invalid={fieldState.invalid}
                                disabled={isViewMode} // Disabled in view mode
                                aria-disabled={isViewMode} // For accessibility
                              />
                              <FieldContent>
                                <FieldLabel htmlFor={field.name}>
                                  Pension
                                </FieldLabel>
                                {fieldState.invalid && (
                                  <FieldError errors={[fieldState.error]} />
                                )}
                              </FieldContent>
                            </Field>
                          )}
                        />
                        <Controller
                          name="sourceofFunds.sofSaleofAsset"
                          control={form.control}
                          render={({
                            field: { value, onChange, ...field },
                            fieldState,
                          }) => (
                            <Field
                              data-invalid={fieldState.invalid}
                              orientation="horizontal"
                            >
                              <Checkbox
                                {...field}
                                checked={value}
                                onCheckedChange={onChange}
                                id={field.name}
                                aria-invalid={fieldState.invalid}
                                disabled={isViewMode} // Disabled in view mode
                                aria-disabled={isViewMode} // For accessibility
                              />
                              <FieldContent>
                                <FieldLabel htmlFor={field.name}>
                                  Sale of Asset
                                </FieldLabel>
                                {fieldState.invalid && (
                                  <FieldError errors={[fieldState.error]} />
                                )}
                              </FieldContent>
                            </Field>
                          )}
                        />
                        <Controller
                          name="sourceofFunds.sofRemittances"
                          control={form.control}
                          render={({
                            field: { value, onChange, ...field },
                            fieldState,
                          }) => (
                            <Field
                              data-invalid={fieldState.invalid}
                              orientation="horizontal"
                            >
                              <Checkbox
                                {...field}
                                checked={value}
                                onCheckedChange={onChange}
                                id={field.name}
                                aria-invalid={fieldState.invalid}
                                disabled={isViewMode} // Disabled in view mode
                                aria-disabled={isViewMode} // For accessibility
                              />
                              <FieldContent>
                                <FieldLabel htmlFor={field.name}>
                                  Remittances
                                </FieldLabel>
                                {fieldState.invalid && (
                                  <FieldError errors={[fieldState.error]} />
                                )}
                              </FieldContent>
                            </Field>
                          )}
                        />
                        <motion.div
                          initial={false}
                          animate={{
                            height: showSoFRemit ? "auto" : 0,
                            opacity: showSoFRemit ? 1 : 0,
                          }}
                          transition={{ duration: 0.25, ease: "easeInOut" }}
                          style={{ overflow: "hidden" }}
                        >
                          <Controller
                            name="sourceofFunds.sofCountryofOrigin"
                            control={form.control}
                            render={({ field, fieldState }) => (
                              <Field
                                data-invalid={fieldState.invalid}
                                className={
                                  !showSoFRemit ? "pointer-events-none" : ""
                                }
                              >
                                <FieldLabel htmlFor={field.name}>
                                  Please specify country of origin
                                </FieldLabel>
                                <Input
                                  {...field}
                                  id={field.name}
                                  disabled={!showSoFRemit || isViewMode}
                                  aria-invalid={fieldState.invalid}
                                  placeholder="Please specify..."
                                  aria-disabled={isViewMode} // For accessibility
                                />

                                {fieldState.invalid && showSoFRemit && (
                                  <FieldError errors={[fieldState.error]} />
                                )}
                              </Field>
                            )}
                          />
                        </motion.div>

                        <Controller
                          name="sourceofFunds.sofOthers"
                          control={form.control}
                          render={({
                            field: { value, onChange, ...field },
                            fieldState,
                          }) => (
                            <Field
                              data-invalid={fieldState.invalid}
                              orientation="horizontal"
                            >
                              <Checkbox
                                {...field}
                                checked={value}
                                onCheckedChange={onChange}
                                id={field.name}
                                aria-invalid={fieldState.invalid}
                                disabled={isViewMode} // Disabled in view mode
                                aria-disabled={isViewMode} // For accessibility
                              />
                              <FieldContent>
                                <FieldLabel htmlFor={field.name}>
                                  Others
                                </FieldLabel>
                                {fieldState.invalid && (
                                  <FieldError errors={[fieldState.error]} />
                                )}
                              </FieldContent>
                            </Field>
                          )}
                        />
                        <motion.div
                          initial={false}
                          animate={{
                            height: showSoFOthers ? "auto" : 0,
                            opacity: showSoFOthers ? 1 : 0,
                          }}
                          transition={{ duration: 0.25, ease: "easeInOut" }}
                          style={{ overflow: "hidden" }}
                        >
                          <Controller
                            name="sourceofFunds.sofSpecifyOther"
                            control={form.control}
                            render={({ field, fieldState }) => (
                              <Field
                                data-invalid={fieldState.invalid}
                                className={
                                  !showSoFOthers ? "pointer-events-none" : ""
                                }
                              >
                                <FieldLabel htmlFor={field.name}>
                                  Please specify
                                </FieldLabel>
                                <Input
                                  {...field}
                                  id={field.name}
                                  disabled={!showSoFOthers || isViewMode}
                                  aria-invalid={fieldState.invalid}
                                  placeholder="Please specify..."
                                  aria-disabled={isViewMode} // For accessibility
                                />

                                {fieldState.invalid && showSoFOthers && (
                                  <FieldError errors={[fieldState.error]} />
                                )}
                              </Field>
                            )}
                          />
                        </motion.div>
                      </FieldGroup>
                    </FieldContent>
                  </FieldGroup>
                </FieldSet>

                <FieldSet>
                  <FieldGroup className="rounded-md border p-4 shadow-md">
                    <FieldContent>
                      <FieldLabel>Purpose of Account Opening</FieldLabel>

                      <FieldGroup data-slot="checkbox-group">
                        <Controller
                          name="purposeAccountOpening.paoSavings"
                          control={form.control}
                          render={({
                            field: { value, onChange, ...field },
                            fieldState,
                          }) => (
                            <Field
                              data-invalid={fieldState.invalid}
                              orientation="horizontal"
                            >
                              <Checkbox
                                {...field}
                                checked={value}
                                onCheckedChange={onChange}
                                id={field.name}
                                aria-invalid={fieldState.invalid}
                                disabled={isViewMode} // Disabled in view mode
                                aria-disabled={isViewMode} // For accessibility
                              />
                              <FieldContent>
                                <FieldLabel htmlFor={field.name}>
                                  Savings
                                </FieldLabel>
                                {fieldState.invalid && (
                                  <FieldError errors={[fieldState.error]} />
                                )}
                              </FieldContent>
                            </Field>
                          )}
                        />
                        <Controller
                          name="purposeAccountOpening.paoBusiness"
                          control={form.control}
                          render={({
                            field: { value, onChange, ...field },
                            fieldState,
                          }) => (
                            <Field
                              data-invalid={fieldState.invalid}
                              orientation="horizontal"
                            >
                              <Checkbox
                                {...field}
                                checked={value}
                                onCheckedChange={onChange}
                                id={field.name}
                                aria-invalid={fieldState.invalid}
                                disabled={isViewMode} // Disabled in view mode
                                aria-disabled={isViewMode} // For accessibility
                              />
                              <FieldContent>
                                <FieldLabel htmlFor={field.name}>
                                  Business
                                </FieldLabel>
                                {fieldState.invalid && (
                                  <FieldError errors={[fieldState.error]} />
                                )}
                              </FieldContent>
                            </Field>
                          )}
                        />
                        <Controller
                          name="purposeAccountOpening.paoPension"
                          control={form.control}
                          render={({
                            field: { value, onChange, ...field },
                            fieldState,
                          }) => (
                            <Field
                              data-invalid={fieldState.invalid}
                              orientation="horizontal"
                            >
                              <Checkbox
                                {...field}
                                checked={value}
                                onCheckedChange={onChange}
                                id={field.name}
                                aria-invalid={fieldState.invalid}
                                disabled={isViewMode} // Disabled in view mode
                                aria-disabled={isViewMode} // For accessibility
                              />
                              <FieldContent>
                                <FieldLabel htmlFor={field.name}>
                                  Pension
                                </FieldLabel>
                                {fieldState.invalid && (
                                  <FieldError errors={[fieldState.error]} />
                                )}
                              </FieldContent>
                            </Field>
                          )}
                        />

                        <Controller
                          name="purposeAccountOpening.paoRemittance"
                          control={form.control}
                          render={({
                            field: { value, onChange, ...field },
                            fieldState,
                          }) => (
                            <Field
                              data-invalid={fieldState.invalid}
                              orientation="horizontal"
                            >
                              <Checkbox
                                {...field}
                                checked={value}
                                onCheckedChange={onChange}
                                id={field.name}
                                aria-invalid={fieldState.invalid}
                                disabled={isViewMode} // Disabled in view mode
                                aria-disabled={isViewMode} // For accessibility
                              />
                              <FieldContent>
                                <FieldLabel htmlFor={field.name}>
                                  Remittance
                                </FieldLabel>
                                {fieldState.invalid && (
                                  <FieldError errors={[fieldState.error]} />
                                )}
                              </FieldContent>
                            </Field>
                          )}
                        />

                        <Controller
                          name="purposeAccountOpening.paoOthers"
                          control={form.control}
                          render={({
                            field: { value, onChange, ...field },
                            fieldState,
                          }) => (
                            <Field
                              data-invalid={fieldState.invalid}
                              orientation="horizontal"
                            >
                              <Checkbox
                                {...field}
                                checked={value}
                                onCheckedChange={onChange}
                                id={field.name}
                                aria-invalid={fieldState.invalid}
                                disabled={isViewMode} // Disabled in view mode
                                aria-disabled={isViewMode} // For accessibility
                              />
                              <FieldContent>
                                <FieldLabel htmlFor={field.name}>
                                  Others
                                </FieldLabel>
                                {fieldState.invalid && (
                                  <FieldError errors={[fieldState.error]} />
                                )}
                              </FieldContent>
                            </Field>
                          )}
                        />
                        <motion.div
                          initial={false}
                          animate={{
                            height: showPoAOthers ? "auto" : 0,
                            opacity: showPoAOthers ? 1 : 0,
                          }}
                          transition={{ duration: 0.25, ease: "easeInOut" }}
                          style={{ overflow: "hidden" }}
                        >
                          <Controller
                            name="purposeAccountOpening.paoSpecifyOther"
                            control={form.control}
                            render={({ field, fieldState }) => (
                              <Field
                                data-invalid={fieldState.invalid}
                                className={
                                  !showPoAOthers ? "pointer-events-none" : ""
                                }
                              >
                                <FieldLabel htmlFor={field.name}>
                                  Please specify
                                </FieldLabel>
                                <Input
                                  {...field}
                                  id={field.name}
                                  disabled={!showPoAOthers || isViewMode}
                                  aria-invalid={fieldState.invalid}
                                  placeholder="Please specify..."
                                  aria-disabled={isViewMode} // For accessibility
                                />

                                {fieldState.invalid && showPoAOthers && (
                                  <FieldError errors={[fieldState.error]} />
                                )}
                              </Field>
                            )}
                          />
                        </motion.div>

                        <Controller
                          name="purposeAccountOpening.paoOrigin"
                          control={form.control}
                          render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                              <FieldLabel htmlFor={field.name}>
                                Origin
                              </FieldLabel>
                              <Input
                                {...field}
                                id={field.name}
                                disabled={isViewMode}
                                aria-invalid={fieldState.invalid}
                                placeholder="Please specify..."
                                aria-disabled={isViewMode} // For accessibility
                              />

                              {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                              )}
                            </Field>
                          )}
                        />
                        <Controller
                          name="purposeAccountOpening.paoDestination"
                          control={form.control}
                          render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                              <FieldLabel htmlFor={field.name} className="mt-2">
                                Destination
                              </FieldLabel>
                              <Input
                                {...field}
                                id={field.name}
                                disabled={isViewMode}
                                aria-invalid={fieldState.invalid}
                                placeholder="Please specify..."
                                aria-disabled={isViewMode} // For accessibility
                              />

                              {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                              )}
                            </Field>
                          )}
                        />
                      </FieldGroup>
                    </FieldContent>
                  </FieldGroup>
                </FieldSet>

                <FieldSet>
                  <FieldGroup className="rounded-md border p-4 shadow-md">
                    <Controller
                      name="jobTitlePosition"
                      control={form.control}
                      render={({
                        field: { onChange, onBlur, value, ...field },
                        fieldState,
                      }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor={field.name}>
                            Title/Position
                          </FieldLabel>

                          <Select value={value ?? ""} onValueChange={onChange}>
                            <SelectTrigger
                              aria-invalid={fieldState.invalid}
                              onBlur={onBlur}
                              id={field.name}
                              disabled={isViewMode} // Disabled in view mode
                              aria-disabled={isViewMode} // For accessibility
                            >
                              {/* Let SelectValue render automatically */}
                              <SelectValue placeholder="Select a job title/position">
                                {
                                  JOB_POSITION.find(
                                    (item) => item.value === value
                                  )?.label
                                }
                              </SelectValue>
                            </SelectTrigger>

                            <SelectContent>
                              {JOB_POSITION.map((status) => (
                                <SelectItem
                                  key={status.value}
                                  value={status.value}
                                >
                                  {status.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>

                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />

                    <motion.div
                      initial={false}
                      animate={{
                        height: showJTPOthers ? "auto" : 0,
                        opacity: showJTPOthers ? 1 : 0,
                      }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      style={{ overflow: "hidden" }}
                    >
                      <Controller
                        name="jobTitlePositionSpecifyOther"
                        control={form.control}
                        render={({ field, fieldState }) => (
                          <Field
                            data-invalid={fieldState.invalid}
                            className={
                              !showJTPOthers ? "pointer-events-none" : ""
                            }
                          >
                            <FieldLabel htmlFor={field.name}>
                              If others, please specify
                            </FieldLabel>
                            <Input
                              {...field}
                              id={field.name}
                              disabled={!showJTPOthers || isViewMode}
                              aria-invalid={fieldState.invalid}
                              placeholder="Please specify..."
                              aria-disabled={isViewMode} // For accessibility
                            />

                            {fieldState.invalid && showJTPOthers && (
                              <FieldError errors={[fieldState.error]} />
                            )}
                          </Field>
                        )}
                      />
                    </motion.div>
                  </FieldGroup>
                </FieldSet>

                <FieldSet>
                  <FieldGroup className="rounded-md border p-4 shadow-md">
                    <Controller
                      name="expectedFreqTransaction"
                      control={form.control}
                      render={({
                        field: { onChange, onBlur, value, ...field },
                        fieldState,
                      }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor={field.name}>
                            Expected Frequency of Transaction per Month
                          </FieldLabel>

                          <Select value={value ?? ""} onValueChange={onChange}>
                            <SelectTrigger
                              aria-invalid={fieldState.invalid}
                              onBlur={onBlur}
                              id={field.name}
                              disabled={isViewMode} // Disabled in view mode
                              aria-disabled={isViewMode} // For accessibility
                            >
                              {/* Let SelectValue render automatically */}
                              <SelectValue placeholder="Select expected frequency of transaction ">
                                {
                                  EXPECTED_FREQUENCY.find(
                                    (item) => item.value === value
                                  )?.label
                                }
                              </SelectValue>
                            </SelectTrigger>

                            <SelectContent>
                              {EXPECTED_FREQUENCY.map((status) => (
                                <SelectItem
                                  key={status.value}
                                  value={status.value}
                                >
                                  {status.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>

                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />

                    <motion.div
                      initial={false}
                      animate={{
                        height: showEFTOthers ? "auto" : 0,
                        opacity: showEFTOthers ? 1 : 0,
                      }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      style={{ overflow: "hidden" }}
                    >
                      <Controller
                        name="expectedFreqSpecifyOther"
                        control={form.control}
                        render={({ field, fieldState }) => (
                          <Field
                            data-invalid={fieldState.invalid}
                            className={
                              !showEFTOthers ? "pointer-events-none" : ""
                            }
                          >
                            <FieldLabel htmlFor={field.name}>
                              If others, please specify
                            </FieldLabel>
                            <Input
                              {...field}
                              id={field.name}
                              disabled={!showEFTOthers || isViewMode}
                              aria-invalid={fieldState.invalid}
                              placeholder="Please specify..."
                              aria-disabled={isViewMode} // For accessibility
                            />

                            {fieldState.invalid && showEFTOthers && (
                              <FieldError errors={[fieldState.error]} />
                            )}
                          </Field>
                        )}
                      />
                    </motion.div>
                  </FieldGroup>
                </FieldSet>

                <FieldSet>
                  <FieldGroup className="rounded-md border p-4 shadow-md">
                    <Controller
                      name="averageAmountTransaction"
                      control={form.control}
                      render={({
                        field: { onChange, onBlur, value, ...field },
                        fieldState,
                      }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor={field.name}>
                            Average Amount per Transaction
                          </FieldLabel>

                          <Select value={value ?? ""} onValueChange={onChange}>
                            <SelectTrigger
                              aria-invalid={fieldState.invalid}
                              onBlur={onBlur}
                              id={field.name}
                              disabled={isViewMode} // Disabled in view mode
                              aria-disabled={isViewMode} // For accessibility
                            >
                              {/* Let SelectValue render automatically */}
                              <SelectValue placeholder="Select average amount per transaction ">
                                {
                                  AVERAGE_AMOUNT.find(
                                    (item) => item.value === value
                                  )?.label
                                }
                              </SelectValue>
                            </SelectTrigger>

                            <SelectContent>
                              {AVERAGE_AMOUNT.map((status) => (
                                <SelectItem
                                  key={status.value}
                                  value={status.value}
                                >
                                  {status.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>

                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />
                  </FieldGroup>
                </FieldSet>

                <FieldSet>
                  <FieldGroup className="rounded-md border p-4 shadow-md">
                    <Controller
                      name="preferredMailingAddress"
                      control={form.control}
                      render={({
                        field: { onChange, onBlur, value, ...field },
                        fieldState,
                      }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor={field.name}>
                            Preferred Mailing Address
                          </FieldLabel>

                          <Select value={value ?? ""} onValueChange={onChange}>
                            <SelectTrigger
                              aria-invalid={fieldState.invalid}
                              onBlur={onBlur}
                              id={field.name}
                              disabled={isViewMode} // Disabled in view mode
                              aria-disabled={isViewMode} // For accessibility
                            >
                              {/* Let SelectValue render automatically */}
                              <SelectValue placeholder="Select preferred mailing address">
                                {
                                  MAILING_ADDRESS.find(
                                    (item) => item.value === value
                                  )?.label
                                }
                              </SelectValue>
                            </SelectTrigger>

                            <SelectContent>
                              {MAILING_ADDRESS.map((status) => (
                                <SelectItem
                                  key={status.value}
                                  value={status.value}
                                >
                                  {status.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>

                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />
                  </FieldGroup>
                </FieldSet>
                {/** Place another FieldGroup here... */}
              </FieldGroup>
            </FieldSet>

            {(actionType === "edit" || actionType === "add") && (
              <CustomerFormBtn
                actionType={actionType}
                disabled={isSubmitting}
              />
            )}
          </FieldGroup>
        </form>
      </div>
    </>
  )
}
