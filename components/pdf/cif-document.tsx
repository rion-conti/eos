"use client"

import { Customer } from "@/generated/prisma/client"
import { formatDateMDY } from "@/lib/utils"
import { Document, Page, Text, View } from "@react-pdf/renderer"
import { createTw } from "react-pdf-tailwind"

const tw = createTw({
  fontFamily: {
    sans: ["Helvetica"],
  },
})

export function CIFDocument({ data }: { data: Customer }) {
  const currentAddress =
    `${data?.chouse || ""} ${data?.cstreet || ""} ${data?.ccity || ""} ${data?.cstate || ""} ${data?.cpostalcode || ""} ${data?.ccountry || ""}`
      .replace(/\s+/g, " ")
      .trim()

  const refDate = formatDateMDY(data?.referenceDate, "")

  const isCurrAddressMax = currentAddress.trim().length > 100 ? true : false
  const permanentAddress =
    `${data?.phouse || ""} ${data?.pfloor || ""} ${data?.pbuildingName || ""} ${data?.pstreet || ""} ${data?.psubdivision || ""} ${data?.pbarangay || ""} ${data?.pcity || ""} ${data?.pprovince || ""} ${data?.pdistrict || ""} ${data?.pcountry || ""} ${data?.pzipcode || ""}`
      .replace(/\s+/g, " ")
      .trim()

  const isNewAccount = data?.newOrUpdate === "new account" ? true : false
  const isUpdateAccount = data?.newOrUpdate === "updating" ? true : false
  const idNumberType = data?.typeofId
    ? `${data?.typeofId} ${data?.typeIdNumber}`
    : ""

  const newDateofBirth = formatDateMDY(data?.birthDate, "mdy")

  const parseDateofBirth = newDateofBirth
    ?.split("/")
    .map((part) => part.padStart(2, "0"))
    .join("/")

  const newSpouseBirthdate = data?.spouseBirthdate
    ? formatDateMDY(data?.spouseBirthdate, "mdy")
    : ""
  const parseSpouseBirthdate = newSpouseBirthdate
    ? newSpouseBirthdate
        ?.split("/")
        .map((part) => part.padStart(2, "0"))
        .join("/")
    : ""

  const spouseNameBirthdate = data?.spouseName
    ? `${data?.spouseName} ${parseSpouseBirthdate}`
    : ""

  const year1 = parseDateofBirth?.slice(6, 7)
  const year2 = parseDateofBirth?.slice(7, 8)
  const year3 = parseDateofBirth?.slice(8, 9)
  const year4 = parseDateofBirth?.slice(9, 10)
  const month1 = parseDateofBirth?.slice(0, 1)
  const month2 = parseDateofBirth?.slice(1, 2)
  const day1 = parseDateofBirth?.slice(3, 4)
  const day2 = parseDateofBirth?.slice(4, 5)

  const isBirthPlaceMax = data?.birthPlace.trim().length > 21 ? true : false

  const birthPlaceCountry = `${data?.birthPlace}  ${data?.birthCountry}`
    .replace(/\s+/g, " ")
    .trim()

  return (
    <>
      <Document>
        <Page size="A4" style={tw("p-6 text-[7.5px]")}>
          {/* Header */}

          <View style={tw("mb-4")}>
            <Text
              style={tw(
                "border bg-teal-700 pt-1 pb-0.5 text-white text-center text-[9.5px] font-bold"
              )}
            >
              CUSTOMER INFORMATION FORM
            </Text>
          </View>
          <View style={tw("mb-1.5 flex-row gap-1")}>
            <Text>Reference/Remittance No.</Text>
            <View style={tw("flex-col")}>
              <Text style={tw("ml-2 text-[9px] -mt-1")}>
                {data?.referenceRemittance || ""}
              </Text>
              {data?.referenceRemittance && (
                <Text style={tw("border-b w-40")}></Text>
              )}
              {!data?.referenceRemittance && (
                <Text style={tw("border-b w-40 mt-3")}></Text>
              )}
            </View>
            <Text>Date</Text>
            <View style={tw("flex-col")}>
              <Text style={tw("ml-1 text-[9px] -mt-1")}>{refDate || ""}</Text>
              {refDate && <Text style={tw("border-b w-20")}></Text>}
              {!refDate && <Text style={tw("border-b w-20 mt-3")}></Text>}
            </View>
            <Text>RM/Customer Number</Text>
            <View style={tw("flex-row -mt-1")}>
              <Text style={tw("border w-4 h-4")}></Text>
              <Text style={tw("border w-4 h-4")}></Text>
              <Text style={tw("border w-4 h-4")}></Text>
              <Text style={tw("border w-4 h-4")}></Text>
              <Text style={tw("border w-4 h-4")}></Text>
              <Text style={tw("border w-4 h-4")}></Text>
              <Text style={tw("border w-4 h-4")}></Text>
              <Text style={tw("border w-4 h-4")}></Text>
              <Text style={tw("border w-4 h-4")}></Text>
              <Text style={tw("border w-4 h-4")}></Text>
              <Text style={tw("border w-4 h-4")}></Text>
              <Text style={tw("border w-4 h-4")}></Text>
            </View>
          </View>
          <View style={tw("mb-1.5 flex-row gap-1")}>
            <Text>Type of Account</Text>
            <View style={tw("flex-col")}>
              <Text style={tw("ml-2 text-[9px] -mt-1")}>
                {data?.typeofAccount || ""}
              </Text>
              {data?.typeofAccount && <Text style={tw("border-b w-40")}></Text>}
              {!data?.typeofAccount && (
                <Text style={tw("border-b w-40 mt-3")}></Text>
              )}
            </View>
            <Text>Account Number</Text>
            <Text style={tw("border-b w-40")}></Text>
            <Text>Card Number</Text>
            <Text style={tw("border-b w-40")}></Text>
          </View>
          <View style={tw("mb-1 flex-row gap-1")}>
            <Text>Preferred Branch</Text>
            <View style={tw("flex-col")}>
              <Text style={tw("ml-2 text-[9px] -mt-1")}>
                {data?.preferredBranch}
              </Text>
              {data?.preferredBranch && (
                <Text style={tw("border-b w-[340px]")}></Text>
              )}
              {!data?.preferredBranch && (
                <Text style={tw("border-b w-[340px] mt-3")}></Text>
              )}
            </View>
            {isNewAccount && (
              <Text style={tw("border bg-gray-600 w-4 h-4 -mt-1")}></Text>
            )}
            {!isNewAccount && <Text style={tw("border w-4 h-4 -mt-1")}></Text>}
            <Text>New Account</Text>
            {isUpdateAccount && (
              <Text style={tw("border bg-gray-600 w-4 h-4 ml-4 -mt-1")}></Text>
            )}
            {!isUpdateAccount && (
              <Text style={tw("border w-4 h-4 ml-4 -mt-1")}></Text>
            )}
            <Text>Updating</Text>
          </View>
          {/* I. Mandatory Information */}
          <View style={tw("mb-1")}>
            <Text
              style={tw(
                "border bg-teal-500 pl-1 pt-0.5 pb-0.5 text-[9.5px] text-white font-bold"
              )}
            >
              I. BASIC INFORMATION
            </Text>
          </View>

          {/* Name Info */}
          <View style={tw("mb-1")}>
            <View style={tw("flex-row ml-0.5")}>
              <Text style={tw("text-[7px]")}>1.</Text>
              <Text style={tw("ml-0.5")}>Name</Text>
            </View>
          </View>
          <View style={tw("flex-row")}>
            <Text style={tw("ml-2 w-[126px] text-[9px]")}>
              {data?.lastname || ""}
            </Text>
            <Text style={tw("w-[135px] text-[9px]")}>
              {data?.firstname || ""}
            </Text>
            <Text style={tw("w-[137px] text-[9px]")}>
              {data?.middlename || ""}
            </Text>
            <Text style={tw("w-[95px] text-[9px]")}>{data?.suffix || ""}</Text>
            <Text style={tw("text-[9px]")}>{data?.otherName || ""}</Text>
          </View>
          <View style={tw("flex-row text-gray-500 ml-0.5")}>
            <Text style={tw("text-[6.5px]")}>Last Name</Text>
            <Text style={tw("text-[6.5px] ml-[100px]")}>First Name</Text>
            <Text style={tw("text-[6.5px] ml-[100px]")}>Middle Name</Text>
            <Text style={tw("text-[6.5px] ml-[100px]")}>Suffix (Jr., III)</Text>
            <Text style={tw("text-[6.5px] ml-[55px]")}>Other Name/AKA</Text>
          </View>
          <View>
            <Text style={tw("border-b w-[560px]")}></Text>
          </View>

          {/* Birth Info */}
          <View style={tw("flex-row")}>
            <View>
              <View style={tw("flex-row mb-1")}>
                <View style={tw("flex-row ml-0.5")}>
                  <Text style={tw("mt-0.5 text-[7px]")}>2.a.</Text>
                  <Text style={tw("ml-0.5 mt-0.5")}>Date of Birth</Text>
                  <Text style={tw("text-[7.5px] ml-1 mt-0.5 text-gray-500")}>
                    (mm/dd/yyyy)
                  </Text>
                </View>
              </View>
              <View style={tw("flex-row ml-6 relative")}>
                <Text style={tw("absolute left-1 top-0.5")}>{month1}</Text>
                <Text style={tw("border w-4 h-4 border-gray-400")}></Text>
                <Text style={tw("absolute left-5 top-0.5")}>{month2}</Text>
                <Text style={tw("border w-4 h-4 border-gray-400")}></Text>
                <Text style={tw("ml-2")}> - </Text>
                <Text style={tw("absolute left-[40] top-0.5")}>{day1}</Text>
                <Text style={tw("border w-4 h-4 border-gray-400")}></Text>
                <Text style={tw("absolute left-[53] top-0.5")}>{day2}</Text>
                <Text style={tw("border w-4 h-4 border-gray-400")}></Text>
                <Text style={tw("ml-2")}> - </Text>
                <Text style={tw("absolute left-[78] top-0.5")}>{year1}</Text>
                <Text style={tw("border w-4 h-4 border-gray-400")}></Text>
                <Text style={tw("absolute left-[90] top-0.5")}>{year2}</Text>
                <Text style={tw("border w-4 h-4 border-gray-400")}></Text>
                <Text style={tw("absolute left-[103] top-0.5")}>{year3}</Text>
                <Text style={tw("border w-4 h-4 border-gray-400")}></Text>
                <Text style={tw("absolute left-[114] top-0.5")}>{year4}</Text>
                <Text style={tw("border w-4 h-4 border-gray-400")}></Text>
              </View>
            </View>
            {/* V Line */}
            <View>
              <Text style={tw("border-l ml-4 h-[30px]")}></Text>
            </View>
            <View>
              <View style={tw("mb-0")}>
                <View style={tw("flex-row ml-1")}>
                  <Text style={tw("mt-0.5 text-[7px]")}>2.b.</Text>
                  <Text style={tw("ml-0.5 mt-0.5")}>Place of Birth</Text>
                </View>

                {!isBirthPlaceMax && (
                  <View style={tw("flex-row ml-5 text-[9px]")}>
                    <Text style={tw("w-[120px]")}>
                      {data?.birthPlace || ""}
                    </Text>
                    <Text>{data?.birthCountry || ""}</Text>
                  </View>
                )}
                {isBirthPlaceMax && (
                  <View style={tw("flex-row ml-2 text-[9px]")}>
                    <Text>{birthPlaceCountry}</Text>
                  </View>
                )}
              </View>
              <View style={tw("flex-col mt-1 text-gray-500")}>
                <View style={tw("flex-row")}>
                  <Text style={tw("text-[6.5px] ml-[50px]")}>
                    City/Municipality
                  </Text>
                  <Text style={tw("text-[6.5px] ml-[60px]")}>Country</Text>
                </View>
              </View>
            </View>
            {/* V Line */}
            {!isBirthPlaceMax && (
              <View style={tw("ml-[53px]")}>
                <Text style={tw("border-l h-[30px]")}></Text>
              </View>
            )}
            {isBirthPlaceMax && (
              <View style={tw("ml-[30px]")}>
                <Text style={tw("border-l h-[30px]")}></Text>
              </View>
            )}

            <View>
              <View style={tw("flex-row ml-1")}>
                <Text style={tw("mt-0.5 text-[7px]")}>3.</Text>
                <Text style={tw("ml-0.5 mt-0.5")}>Nationality</Text>
              </View>

              <Text style={tw("ml-3 text-[16px]")}>
                {data?.nationality || ""}
              </Text>
            </View>
          </View>

          <View>
            <Text style={tw("border-b w-[560px]")}></Text>
          </View>

          {/* Present Address Info */}
          <View style={tw("flex-row")}>
            <View style={tw("flex-col")}>
              <View style={tw("flex-row mb-1")}>
                <View style={tw("flex-row ml-0.5")}>
                  <Text style={tw("mt-1 text-[7px]")}>4.</Text>
                  <Text style={tw("ml-0.5 mt-0.5")}>Present Address</Text>
                  <Text style={tw("ml-1 mt-0.5 text-[6.5px]")}>
                    (Address Abroad)
                  </Text>
                </View>
              </View>

              <View style={tw("flex-row mb-1")}>
                <Text style={tw("w-3/4 text-[9px]")}>{currentAddress}</Text>
              </View>

              <View style={tw("flex-row text-gray-500 mt-1 ml-0.5")}>
                <Text style={tw("text-[6.5px]")}>House/Unit/Floor No.</Text>
                <Text style={tw("text-[6.5px] ml-[40px]")}>Street</Text>
                <Text style={tw("text-[6.5px] ml-[40px]")}>City</Text>
                <Text style={tw("text-[6.5px] ml-[40px]")}>State</Text>
                <Text style={tw("text-[6.5px] ml-[40px]")}>Postal Code</Text>
                <Text style={tw("text-[6.5px] ml-[40px]")}>Country</Text>
              </View>
            </View>

            <View>
              {isCurrAddressMax && (
                <Text style={tw("border-l h-[49px]")}></Text>
              )}
              {!isCurrAddressMax && (
                <Text style={tw("border-l h-[38px]")}></Text>
              )}
            </View>

            <View>
              <View style={tw("flex-col")}>
                <View style={tw("flex-row ml-1")}>
                  <Text style={tw("mt-0.5 text-[7px]")}>5.</Text>
                  <Text style={tw("ml-0.5 mt-0.5")}>
                    With Beneficial Owner/Agent?
                  </Text>
                </View>
                <View style={tw("flex-row ml-10 text-[7.5px]")}>
                  <Text style={tw("border mt-0.5 w-2 h-2")}></Text>
                  <Text style={tw("ml-2")}>Yes</Text>

                  <View>
                    <Text
                      style={tw("border bg-gray-600 mt-0.5 w-2 h-2 ml-10")}
                    ></Text>
                  </View>
                  <Text style={tw("ml-2")}>None</Text>
                </View>
                <View style={tw("mt-1 ml-1 text-[7px] text-gray-500")}>
                  <Text>(If yes, fill-out Part II of this form)</Text>
                </View>
              </View>
            </View>
          </View>

          <View>
            <Text style={tw("border-b w-[560px]")}></Text>
          </View>

          {/* Philippine Address Info */}
          <View style={tw("flex-row")}>
            <View style={tw("flex-col")}>
              <View style={tw("flex-row mb-1")}>
                <View style={tw("flex-row ml-0.5")}>
                  <Text style={tw("mt-0.5 text-[7px]")}>6.</Text>
                  <Text style={tw("ml-0.5 mt-0.5")}>
                    Philippine/Permanent Address
                  </Text>
                </View>
              </View>

              <View style={tw("flex-row mb-1")}>
                <Text style={tw("text-[9px]")}>{permanentAddress}</Text>
              </View>

              <View style={tw("flex-row mb-0.5 text-gray-500 ml-0.5")}>
                <Text style={tw("text-[6.5px]")}>House/Unit No.</Text>
                <Text style={tw("text-[6.5px] ml-[20px]")}>Floor</Text>
                <Text style={tw("text-[6.5px] ml-[20px]")}>Building Name</Text>
                <Text style={tw("text-[6.5px] ml-[20px]")}>Street</Text>
                <Text style={tw("text-[6.5px] ml-[25px]")}>Subdivision</Text>
                <Text style={tw("text-[6.5px] ml-[25px]")}>Barangay</Text>
                <Text style={tw("text-[6.5px] ml-[25px]")}>Town/City</Text>
                <Text style={tw("text-[6.5px] ml-[25px]")}>Province</Text>
                <Text style={tw("text-[6.5px] ml-[25px]")}>District</Text>
                <Text style={tw("text-[6.5px] ml-[25px]")}>Country</Text>
                <Text style={tw("text-[6.5px] ml-[25px]")}>Zip Code</Text>
              </View>
            </View>
          </View>

          <View>
            <Text style={tw("border-b w-[560px]")}></Text>
          </View>

          {/* Contact Number Info */}
          <View style={tw("flex-row")}>
            <View>
              <View style={tw("mb-1")}>
                <View style={tw("flex-row ml-0.5")}>
                  <Text style={tw("mt-0.5 text-[7px]")}>7.a.</Text>
                  <Text style={tw("ml-0.5 mt-0.5")}>
                    Contact Number (Abroad)
                  </Text>
                </View>
                <View style={tw("flex-row ml-[80px] mt-1")}>
                  <Text style={tw("text-[9px]")}>
                    {data?.currentMobile || ""}
                  </Text>
                </View>
              </View>
              <View style={tw("flex-col text-gray-500")}>
                <View style={tw("flex-row text-[6.5px] text-gray-500 ml-0.5")}>
                  <Text>Residence Phone Number</Text>
                  <Text style={tw("ml-[59px]")}>Mobile</Text>
                </View>
              </View>
            </View>
            {/* V Line */}
            <View style={tw("ml-[24.5px]")}>
              <Text style={tw("border-l h-[34px]")}></Text>
            </View>

            <View>
              <View style={tw("mb-1")}>
                <View style={tw("flex-row ml-1")}>
                  <Text style={tw("mt-0.5 text-[7px]")}>7.b.</Text>
                  <Text style={tw("ml-0.5 mt-0.5")}>
                    Contact Number (in the Philippines)
                  </Text>
                </View>
                <View style={tw("flex-row ml-[80px] mt-1")}>
                  <Text style={tw("text-[9px]")}>
                    {data?.homeCountryMobile || ""}
                  </Text>
                </View>
              </View>
              <View style={tw("flex-col text-gray-500")}>
                <View style={tw("flex-row text-[6.5px] text-gray-500")}>
                  <Text>Residence Phone Number</Text>
                  <Text style={tw("ml-[59px]")}>Mobile</Text>
                </View>
              </View>
            </View>
            {/* V Line */}
            <View style={tw("ml-[26.5px]")}>
              <Text style={tw("border-l h-[34px]")}></Text>
            </View>

            <View>
              <View style={tw("flex-row ml-1")}>
                <Text style={tw("mt-0.5 text-[7px]")}>7.c.</Text>
                <Text style={tw("ml-0.5 mt-0.5")}>Email Address</Text>
              </View>
              <Text style={tw("text-[9px] mt-1 ml-3")}>{data.email || ""}</Text>
            </View>
          </View>

          <View>
            <Text style={tw("border-b w-[560px]")}></Text>
          </View>

          {/* Nature of Employment/Business Info */}
          <View style={tw("flex-row")}>
            <View>
              <View style={tw("flex-col")}>
                <View style={tw("mb-1")}>
                  <View style={tw("flex-row ml-0.5")}>
                    <Text style={tw("mt-0.5 text-[7px]")}>8.a.</Text>
                    <Text style={tw("ml-0.5 mt-0.5")}>
                      Nature of Employment/Business
                    </Text>
                  </View>
                </View>
                <View style={tw("flex-row")}>
                  <View style={tw("flex-col mt-1 ml-5")}>
                    <View style={tw("flex-row mb-1")}>
                      {data?.natureofEmployment === "ctn" && (
                        <Text style={tw("border bg-gray-600 w-2 h-2")}></Text>
                      )}
                      {!(data?.natureofEmployment === "ctn") && (
                        <Text style={tw("border w-2 h-2")}></Text>
                      )}

                      <Text style={tw("ml-2")}>CTN - Construction</Text>
                    </View>
                    <View style={tw("flex-row mb-1")}>
                      {data?.natureofEmployment === "fin" && (
                        <Text style={tw("border bg-gray-600 w-2 h-2")}></Text>
                      )}
                      {!(data?.natureofEmployment === "fin") && (
                        <Text style={tw("border w-2 h-2")}></Text>
                      )}

                      <Text style={tw("ml-2")}>
                        FIN - Finance/Insurance/Securities
                      </Text>
                    </View>
                    <View style={tw("flex-row mb-1")}>
                      {data?.natureofEmployment === "fsp" && (
                        <Text style={tw("border bg-gray-600 w-2 h-2")}></Text>
                      )}
                      {!(data?.natureofEmployment === "fsp") && (
                        <Text style={tw("border w-2 h-2")}></Text>
                      )}

                      <Text style={tw("ml-2")}>
                        FSP - Food Service/Food Processing
                      </Text>
                    </View>
                  </View>
                  <View style={tw("flex-col mt-1 ml-[8px]")}>
                    <View style={tw("flex-row mb-1")}>
                      {data?.natureofEmployment === "mfg" && (
                        <Text style={tw("border bg-gray-600 w-2 h-2")}></Text>
                      )}
                      {!(data?.natureofEmployment === "mfg") && (
                        <Text style={tw("border w-2 h-2")}></Text>
                      )}

                      <Text style={tw("ml-2")}>MFG - Manufacturing</Text>
                    </View>
                    <View style={tw("flex-row mb-1")}>
                      {data?.natureofEmployment === "msp" && (
                        <Text style={tw("border bg-gray-600 w-2 h-2")}></Text>
                      )}
                      {!(data?.natureofEmployment === "msp") && (
                        <Text style={tw("border w-2 h-2")}></Text>
                      )}

                      <Text style={tw("ml-2")}>MSP - Maritime/Shipping</Text>
                    </View>
                    <View style={tw("flex-row mb-1")}>
                      {data?.natureofEmployment === "oth" && (
                        <Text style={tw("border bg-gray-600 w-2 h-2")}></Text>
                      )}
                      {!(data?.natureofEmployment === "oth") && (
                        <Text style={tw("border w-2 h-2")}></Text>
                      )}

                      <Text style={tw("ml-2")}>OTH - Others</Text>
                      <Text
                        style={tw("ml-[2px] mt-0.5 text-[6.5px] text-gray-500")}
                      >
                        (Pls. specify)
                      </Text>
                    </View>
                  </View>
                  <View style={tw("flex-col mt-1 ml-[8px]")}>
                    <View style={tw("flex-row mb-1")}>
                      {data?.natureofEmployment === "tou" && (
                        <Text style={tw("border bg-gray-600 w-2 h-2")}></Text>
                      )}
                      {!(data?.natureofEmployment === "tou") && (
                        <Text style={tw("border w-2 h-2")}></Text>
                      )}

                      <Text style={tw("ml-2")}>TOU - Tourism</Text>
                    </View>
                    <View style={tw("flex-row mb-1")}>
                      {data?.natureofEmployment === "mdl" && (
                        <Text style={tw("border bg-gray-600 w-2 h-2")}></Text>
                      )}
                      {!(data?.natureofEmployment === "mdl") && (
                        <Text style={tw("border w-2 h-2")}></Text>
                      )}

                      <Text style={tw("ml-2")}>MDL - Health Services</Text>
                    </View>
                    <View>
                      {data?.natureofEmployment === "oth" && (
                        <Text style={tw("absolute text-[8px]")}>
                          {data?.employmentSpecifyOther || ""}
                        </Text>
                      )}
                    </View>
                    <View style={tw("flex-row mb-1")}>
                      <Text style={tw("mt-3 border-b w-[90px]")}></Text>
                    </View>
                  </View>
                </View>
                <View>
                  <Text style={tw("border-b w-[362px]")}></Text>
                </View>

                {/* Source/s of Funds Info */}
                <View style={tw("flex-col")}>
                  <View>
                    <View style={tw("flex-row ml-0.5")}>
                      <Text style={tw("mt-0.5 text-[7px]")}>9.</Text>
                      <Text style={tw("ml-0.5 mt-0.5")}>Source/s of Funds</Text>
                      <Text style={tw("ml-1 mt-0.5 text-[7px] text-gray-500")}>
                        (Please check ALL that apply)
                      </Text>
                    </View>

                    <View style={tw("flex-row")}>
                      <View style={tw("flex-col mt-1 ml-5")}>
                        <View>
                          <View style={tw("flex-row mb-1")}>
                            <View>
                              {data?.sofSalaryEmployment && (
                                <Text
                                  style={tw("border bg-gray-600 w-2 h-2")}
                                ></Text>
                              )}
                              {!data?.sofSalaryEmployment && (
                                <Text style={tw("border w-2 h-2")}></Text>
                              )}
                            </View>
                            <View>
                              <Text style={tw("ml-2")}>Salary/Employment</Text>
                            </View>
                          </View>

                          <View style={tw("flex-row")}>
                            <View>
                              {data?.sofBusiness && (
                                <Text
                                  style={tw("border bg-gray-600 w-2 h-2")}
                                ></Text>
                              )}
                              {!data?.sofBusiness && (
                                <Text style={tw("border w-2 h-2")}></Text>
                              )}
                            </View>
                            <View>
                              <Text style={tw("ml-2")}>Business</Text>
                            </View>
                          </View>
                        </View>
                      </View>

                      <View style={tw("flex-col mt-1")}>
                        <View style={tw("ml-[20px]")}>
                          <View style={tw("flex-row mb-1")}>
                            {data?.sofPension && (
                              <Text
                                style={tw("border bg-gray-600 w-2 h-2")}
                              ></Text>
                            )}
                            {!data?.sofPension && (
                              <Text style={tw("border w-2 h-2")}></Text>
                            )}
                            <View>
                              <Text style={tw("ml-2")}>Pension</Text>
                            </View>
                          </View>

                          <View style={tw("flex-col")}>
                            <View style={tw("flex-row mb-2")}>
                              <View>
                                {data?.sofRemittances && (
                                  <Text
                                    style={tw("border bg-gray-600 w-2 h-2")}
                                  ></Text>
                                )}
                                {!data?.sofRemittances && (
                                  <Text style={tw("border w-2 h-2")}></Text>
                                )}
                              </View>

                              <View>
                                <Text style={tw("ml-2")}>Remittances</Text>
                              </View>
                              <View>
                                <Text
                                  style={tw("ml-1 text-[6.5px] text-gray-500")}
                                >
                                  (Please specify country
                                </Text>
                              </View>
                            </View>

                            <View style={tw("ml-[15px]")}>
                              <View style={tw("flex-row")}>
                                <View>
                                  <Text
                                    style={tw("text-[6.5px] text-gray-500")}
                                  >
                                    of origin)
                                  </Text>
                                </View>
                                <View>
                                  <View style={tw("flex-col ml-[5px]")}>
                                    <View>
                                      <Text>{data?.sofCountryofOrigin}</Text>
                                    </View>
                                    <View>
                                      {data?.sofCountryofOrigin && (
                                        <Text
                                          style={tw("border-b w-[85px]")}
                                        ></Text>
                                      )}
                                      {!data?.sofCountryofOrigin && (
                                        <Text
                                          style={tw(
                                            "border-b w-[85px] mt-[8px]"
                                          )}
                                        ></Text>
                                      )}
                                    </View>
                                  </View>
                                </View>
                              </View>
                            </View>
                          </View>
                        </View>
                      </View>

                      <View style={tw("flex-col mt-1")}>
                        <View style={tw("ml-[10px]")}>
                          <View style={tw("flex-row mb-1")}>
                            <View>
                              {data?.sofSaleofAsset && (
                                <Text
                                  style={tw("border bg-gray-600 w-2 h-2")}
                                ></Text>
                              )}
                              {!data?.sofSaleofAsset && (
                                <Text style={tw("border w-2 h-2")}></Text>
                              )}
                            </View>
                            <View>
                              <Text style={tw("ml-2")}>Sale of Asset</Text>
                            </View>
                          </View>

                          <View style={tw("flex-row mb-1")}>
                            <View>
                              {data?.sofOthers && (
                                <Text
                                  style={tw("border bg-gray-600 w-2 h-2")}
                                ></Text>
                              )}
                              {!data?.sofOthers && (
                                <Text style={tw("border w-2 h-2")}></Text>
                              )}
                            </View>
                            <View>
                              <Text style={tw("ml-2")}>Others</Text>
                            </View>
                            <View>
                              <Text
                                style={tw("ml-1 text-[6.5px] text-gray-500")}
                              >
                                (Please specify)
                              </Text>
                            </View>
                          </View>
                          <View style={tw("ml-[15px] mt-[2px]")}>
                            <View>
                              <Text>{data?.sofSpecifyOther || ""}</Text>
                            </View>
                            <View>
                              {data?.sofSpecifyOther && (
                                <Text style={tw("border-b w-[85px]")}></Text>
                              )}
                              {!data?.sofSpecifyOther && (
                                <Text
                                  style={tw("border-b w-[85px] mt-[9px]")}
                                ></Text>
                              )}
                            </View>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
            {/* V Line */}
            <View>
              <Text style={tw("border-l h-[105px]")}></Text>
            </View>

            <View style={tw("flex-col")}>
              <View style={tw("mb-4")}>
                <View style={tw("flex-row ml-1")}>
                  <Text style={tw("mt-0.5 text-[7px]")}>8.b.</Text>
                  <Text style={tw("ml-0.5 mt-0.5")}>
                    Name of Employer/Business
                  </Text>
                </View>
                <View style={tw("mt-3 ml-3")}>
                  <Text style={tw("text-[9px]")}>
                    {data?.companyName || ""}
                  </Text>
                </View>
              </View>

              <View>
                {data?.companyName && (
                  <Text style={tw("border-b w-[195px]")}></Text>
                )}
                {!data?.companyName && (
                  <Text style={tw("border-b w-[195px] mt-3")}></Text>
                )}
              </View>

              <View style={tw("mt-1 mb-1")}>
                <View style={tw("flex-row ml-1")}>
                  <Text style={tw("text-[7px]")}>10.</Text>
                  <Text style={tw("ml-0.5")}>TIN/SSS/GSIS/UMID No.</Text>
                </View>

                <Text style={tw("mt-1 ml-6 text-[9px]")}>
                  {idNumberType || ""}
                </Text>
              </View>

              <View>
                {idNumberType && (
                  <Text style={tw("ml-5 border-b w-[150px]")}></Text>
                )}
                {!idNumberType && (
                  <Text style={tw("ml-5 border-b w-[150px] mt-2")}></Text>
                )}
              </View>

              <View style={tw("mt-3 mb-[1px]")}>
                <Text style={tw("ml-1 ml-5 text-[7px]")}>
                  If no TIN/SSS/GSIS/UMID Number, provide reason:
                </Text>
                <Text style={tw("mt-1 ml-6 text-[9px]")}>
                  {data.noIdReason || ""}
                </Text>
              </View>

              <View>
                {data.noIdReason && (
                  <Text style={tw("ml-5 border-b w-[150px]")}></Text>
                )}
                {!data.noIdReason && (
                  <Text style={tw("ml-5 border-b w-[150px] mt-[12px]")}></Text>
                )}
              </View>
            </View>
          </View>

          {/* II. Client Profiling */}
          <View
            style={tw(
              "flex-row border bg-teal-500 pl-1 text-[9.5px] text-white font-bold"
            )}
          >
            <View>
              <Text style={tw("pt-0.5 pb-0.5")}>II. CLIENT PROFILING</Text>
            </View>
          </View>

          {/* Civil Status */}

          <View style={tw("flex-row")}>
            <View style={tw("flex-col")}>
              <View>
                <View style={tw("flex-row ml-1")}>
                  <Text style={tw("mt-0.5 text-[7px]")}>11.</Text>
                  <Text style={tw("ml-0.5 mt-0.5")}>Civil Status</Text>
                </View>

                <View style={tw("flex-row")}>
                  <View style={tw("flex-col mt-2 ml-5")}>
                    <View style={tw("flex-row mb-1")}>
                      <View>
                        {data?.civilStatus === "unmarried" && (
                          <Text style={tw("border bg-gray-600 w-2 h-2")}></Text>
                        )}
                        {!(data?.civilStatus === "unmarried") && (
                          <Text style={tw("border w-2 h-2")}></Text>
                        )}
                      </View>
                      <View>
                        <Text style={tw("ml-2")}>Unmarried</Text>
                      </View>
                    </View>

                    <View style={tw("flex-row mb-1")}>
                      <View>
                        {data?.civilStatus === "married" && (
                          <Text style={tw("border bg-gray-600 w-2 h-2")}></Text>
                        )}
                        {!(data?.civilStatus === "married") && (
                          <Text style={tw("border w-2 h-2")}></Text>
                        )}
                      </View>
                      <View>
                        <Text style={tw("ml-2")}>Married</Text>
                      </View>
                    </View>

                    <View style={tw("flex-row mb-1")}>
                      <View>
                        {data?.civilStatus === "separated" && (
                          <Text style={tw("border bg-gray-600 w-2 h-2")}></Text>
                        )}
                        {!(data?.civilStatus === "separated") && (
                          <Text style={tw("border w-2 h-2")}></Text>
                        )}
                      </View>
                      <View>
                        <Text style={tw("ml-2")}>Separated</Text>
                      </View>
                    </View>
                  </View>

                  <View style={tw("flex-col mt-1")}>
                    <View style={tw("ml-[20px]")}>
                      <View style={tw("flex-row mb-1 mt-1")}>
                        {data?.civilStatus === "widowed" && (
                          <Text style={tw("border bg-gray-600 w-2 h-2")}></Text>
                        )}
                        {!(data?.civilStatus === "widowed") && (
                          <Text style={tw("border w-2 h-2")}></Text>
                        )}
                        <View>
                          <Text style={tw("ml-2")}>Widowed</Text>
                        </View>
                      </View>

                      <View style={tw("flex-col")}>
                        <View style={tw("flex-row mb-1")}>
                          <View>
                            {data?.civilStatus === "divorced" ||
                              (data?.civilStatus === "annulled" && (
                                <Text
                                  style={tw("border bg-gray-600 w-2 h-2")}
                                ></Text>
                              ))}
                            {!(data?.civilStatus === "divorced") &&
                              !(data?.civilStatus === "annulled") && (
                                <Text style={tw("border w-2 h-2")}></Text>
                              )}
                          </View>
                          <View>
                            <Text style={tw("ml-2")}>Divorced/Annulled</Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
            {/* V Line 12. */}
            <View>
              <Text style={tw("border-l ml-4 h-[57px]")}></Text>
            </View>
            {/* </View> */}

            {/* Spouse Name */}
            <View>
              <View style={tw("flex-row")}>
                <View style={tw("flex-col")}>
                  <View style={tw("flex-row ml-1 mb-1")}>
                    <Text style={tw("mt-0.5 text-[7px]")}>12.</Text>
                    <Text style={tw("ml-0.5 mt-0.5")}>
                      Spouse&apos;s Full Maiden Name
                    </Text>
                  </View>
                  <View style={tw("ml-[5px]")}>
                    <Text style={tw("text-[9px]")}>
                      {spouseNameBirthdate || ""}
                    </Text>
                  </View>

                  {/* H Line */}
                  {data?.spouseName && (
                    <View style={tw("mt-[5px]")}>
                      <Text style={tw("border-b w-[200px]")}></Text>
                    </View>
                  )}

                  {!data?.spouseName && (
                    <View style={tw("mt-[15px]")}>
                      <Text style={tw("border-b w-[200px]")}></Text>
                    </View>
                  )}
                </View>

                {/* V Line -ok 13.*/}
                <View>
                  <Text style={tw("border-l h-[28.5px]")}></Text>
                </View>
                {/* Mother's Maiden Name */}
                <View>
                  <View style={tw("flex-col")}>
                    <View style={tw("flex-row ml-1 mb-1")}>
                      <Text style={tw("mt-0.5 text-[7px]")}>13.</Text>
                      <Text style={tw("ml-0.5 mt-0.5")}>
                        Mother&apos;s Full Maiden Name
                      </Text>
                    </View>
                    <View style={tw("ml-[30px]")}>
                      <Text style={tw("text-[9px]")}>
                        {data?.motherMaidenName || ""}
                      </Text>
                    </View>
                    {/* H Line */}
                    {data?.motherMaidenName && (
                      <View style={tw("mt-[5px]")}>
                        <Text style={tw("border-b w-[188px]")}></Text>
                      </View>
                    )}
                    {!data?.motherMaidenName && (
                      <View style={tw("mt-[15px]")}>
                        <Text style={tw("border-b w-[188px]")}></Text>
                      </View>
                    )}
                  </View>
                </View>
              </View>

              <View>
                <View>
                  {/* Gender */}
                  <View style={tw("flex-row")}>
                    <View style={tw("flex-col")}>
                      <View style={tw("flex-row ml-1 mb-1")}>
                        <Text style={tw("mt-0.5 text-[7px]")}>14.</Text>
                        <Text style={tw("ml-0.5 mt-0.5")}>Gender</Text>
                      </View>

                      <View>
                        <View style={tw("flex-row ml-[20px]")}>
                          <View style={tw("mb-1 mt-1")}>
                            {data?.gender === "male" && (
                              <Text
                                style={tw("border bg-gray-600 w-2 h-2")}
                              ></Text>
                            )}
                            {!(data?.gender === "male") && (
                              <Text style={tw("border w-2 h-2")}></Text>
                            )}
                          </View>
                          <View>
                            <Text style={tw("mt-0.5 ml-2 text-[7.5px]")}>
                              Male
                            </Text>
                          </View>

                          <View style={tw("mb-1 mt-1 ml-[15px]")}>
                            {data?.gender === "female" && (
                              <Text
                                style={tw("border bg-gray-600 w-2 h-2")}
                              ></Text>
                            )}
                            {!(data?.gender === "female") && (
                              <Text style={tw("border w-2 h-2")}></Text>
                            )}
                          </View>
                          <View>
                            <Text style={tw("mt-0.5 ml-2 text-[7.5px]")}>
                              Female
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>

                    {/* V Line 15. */}
                    <View style={tw("ml-[32.5px]")}>
                      <Text style={tw("border-l h-[28.5px]")}></Text>
                    </View>

                    <View style={tw("flex-col")}>
                      <View style={tw("flex-row ml-1 mb-1")}>
                        <Text style={tw("mt-0.5 text-[7px]")}>15.</Text>
                        <Text style={tw("ml-0.5 mt-0.5")}>
                          Type of ID Presented
                        </Text>
                      </View>
                      <View style={tw("ml-6")}>
                        <Text style={tw("text-[9px]")}>
                          {data?.typeofIdPresented || ""}
                        </Text>
                      </View>
                    </View>
                    {/* V Line 16.*/}
                    <View style={tw("ml-[36.5px]")}>
                      <Text style={tw("border-l h-[28.5px]")}></Text>
                    </View>
                    <View style={tw("flex-col")}>
                      <View style={tw("flex-row ml-1 mb-1")}>
                        <Text style={tw("mt-0.5 text-[7px]")}>16.</Text>
                        <Text style={tw("ml-0.5 mt-0.5")}>ID Number</Text>
                      </View>
                      <View style={tw("ml-6")}>
                        <Text style={tw("text-[9px]")}>
                          {data?.idPresentedNumber || ""}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View>
            <Text style={tw("border-b w-[555px]")}></Text>
          </View>

          {/* Purpose of Account Opening Info */}
          <View style={tw("flex-row")}>
            <View style={tw("flex-col")}>
              <View>
                <View style={tw("flex-row ml-0.5")}>
                  <Text style={tw("mt-0.5 text-[7px]")}>17.</Text>
                  <Text style={tw("ml-0.5 mt-0.5")}>
                    Purpose of Account Opening
                  </Text>
                </View>

                <View style={tw("flex-row text-[7.5px]")}>
                  <View style={tw("flex-col mt-1 ml-5")}>
                    <View>
                      <View style={tw("flex-row mb-1")}>
                        <View>
                          {data?.paoSavings && (
                            <Text
                              style={tw("border bg-gray-600 w-2 h-2")}
                            ></Text>
                          )}
                          {!data?.paoSavings && (
                            <Text style={tw("border w-2 h-2")}></Text>
                          )}
                        </View>
                        <View>
                          <Text style={tw("ml-2")}>Savings</Text>
                        </View>
                      </View>

                      <View style={tw("flex-row")}>
                        <View>
                          {data?.paoBusiness && (
                            <Text
                              style={tw("border bg-gray-600 w-2 h-2")}
                            ></Text>
                          )}
                          {!data?.paoBusiness && (
                            <Text style={tw("border w-2 h-2")}></Text>
                          )}
                        </View>
                        <View>
                          <Text style={tw("ml-2")}>Business</Text>
                        </View>
                      </View>
                    </View>
                  </View>

                  <View style={tw("flex-col mt-1")}>
                    <View style={tw("ml-[40px]")}>
                      <View style={tw("flex-row mb-1")}>
                        {data?.paoPension && (
                          <Text style={tw("border bg-gray-600 w-2 h-2")}></Text>
                        )}
                        {!data?.paoPension && (
                          <Text style={tw("border w-2 h-2")}></Text>
                        )}
                        <View>
                          <Text style={tw("ml-2")}>Pension</Text>
                        </View>
                      </View>

                      <View style={tw("flex-col")}>
                        <View style={tw("flex-row mb-2")}>
                          <View>
                            {data?.paoRemittance && (
                              <Text
                                style={tw("border bg-gray-600 w-2 h-2")}
                              ></Text>
                            )}
                            {!data?.paoRemittance && (
                              <Text style={tw("border w-2 h-2")}></Text>
                            )}
                          </View>

                          <View>
                            <Text style={tw("ml-2")}>Remittance</Text>
                          </View>
                          <View>
                            <Text style={tw("ml-1 text-[6.5px] text-gray-500")}>
                              (Please specify country)
                            </Text>
                          </View>
                        </View>

                        <View style={tw("ml-[12px]")}>
                          <View style={tw("flex-row")}>
                            <View>
                              <Text>Origin</Text>
                            </View>
                            <View style={tw("ml-[4px]")}>
                              <View style={tw("flex-col")}>
                                <View style={tw("ml-[30px]")}>
                                  <Text>{data?.paoOrigin}</Text>
                                </View>
                                <View style={tw("ml-[17px]")}>
                                  {data?.paoOrigin && (
                                    <Text
                                      style={tw("border-b w-[70px]")}
                                    ></Text>
                                  )}
                                  {!data?.paoOrigin && (
                                    <Text
                                      style={tw("border-b w-[70px] mt-[8px]")}
                                    ></Text>
                                  )}
                                </View>
                              </View>
                            </View>
                            <View style={tw("ml-[89px] mr-[4px]")}>
                              <Text>Destination</Text>
                            </View>
                            <View style={tw("ml-[36px]")}>
                              <View style={tw("flex-col")}>
                                <View style={tw("ml-[16px]")}>
                                  <Text>{data?.paoDestination || ""}</Text>
                                </View>
                                <View>
                                  {data?.paoDestination && (
                                    <Text
                                      style={tw("border-b w-[70px]")}
                                    ></Text>
                                  )}
                                  {!data?.paoDestination && (
                                    <Text
                                      style={tw("border-b w-[70px] mt-[8px]")}
                                    ></Text>
                                  )}
                                </View>
                              </View>
                            </View>

                            <View style={tw("mb-1 ml-[70px]")}>
                              <View style={tw("flex-row ml-[10px]")}>
                                <View style={tw("mt-0.5")}>
                                  {data?.paoOthers && (
                                    <Text
                                      style={tw("border bg-gray-600 w-2 h-2")}
                                    ></Text>
                                  )}
                                  {!data?.paoOthers && (
                                    <Text style={tw("border w-2 h-2")}></Text>
                                  )}
                                </View>

                                <View style={tw("ml-[10px]")}>
                                  <Text>Others</Text>
                                </View>
                                <View style={tw("ml-[25px]")}>
                                  <Text
                                    style={tw(
                                      "text-[6.5px] mt-0.5 text-gray-500"
                                    )}
                                  >
                                    (Please specify)
                                  </Text>
                                </View>
                              </View>
                            </View>

                            <View style={tw("ml-[95px]")}>
                              <View style={tw("ml-2")}>
                                <Text>{data?.paoSpecifyOther || ""}</Text>
                              </View>
                              <View>
                                {data?.paoSpecifyOther && (
                                  <Text style={tw("border-b w-[120px]")}></Text>
                                )}
                                {!data?.paoSpecifyOther && (
                                  <Text
                                    style={tw("border-b w-[120px] mt-[8px]")}
                                  ></Text>
                                )}
                              </View>
                            </View>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>

            <View style={tw("border-l mr-[32.5px] h-[29px]")}>
              <View style={tw("flex-row gap-[2px] mt-0.5 ml-0.5")}>
                <Text style={tw("text-[7px]")}>18.</Text>
                <Text>No. of Dependents</Text>
              </View>

              <View style={tw("ml-[30px] mt-1")}>
                <Text style={tw("text-[9px]")}>
                  {data?.noofDependents === 0 ? "N/A" : data?.noofDependents}
                </Text>
              </View>
              {/* H Line 19. */}
              <View>
                <Text style={tw("border-b w-[255px] mt-[5.5px]")}></Text>
              </View>
            </View>
            <View style={tw("border-l mr-[113.5px] h-[29px]")}>
              <View style={tw("flex-row gap-[5px] mt-0.5 ml-0.5")}>
                <Text style={tw("text-[7px]")}>19.</Text>
                <Text style={tw("ml-[2px]")}>No. of Children</Text>
              </View>
              <View style={tw("ml-[30px] mt-1")}>
                <Text style={tw("text-[9px]")}>
                  {data?.noofChildren === 0 ? "N/A" : data?.noofChildren}
                </Text>
              </View>
            </View>
          </View>

          <View>
            <Text style={tw("border-b w-[554px]")}></Text>
          </View>

          {/* US Address Info */}
          <View style={tw("flex-row")}>
            <View style={tw("flex-col")}>
              <View style={tw("flex-row")}>
                <View style={tw("flex-row ml-0.5")}>
                  <Text style={tw("mt-0.5 text-[7px]")}>20.</Text>
                  <Text style={tw("ml-0.5 mt-0.5")}>US Address</Text>
                  <Text style={tw("ml-1 mt-0.5 text-[7px]")}>
                    (if applicable)
                  </Text>
                </View>
              </View>

              <View style={tw("flex-row")}>
                <Text style={tw("ml-[165px] text-[12px]")}>N / A</Text>
              </View>

              <View style={tw("flex-row text-gray-500 mt-1 mb-0.5")}>
                <Text style={tw("text-[6.5px]")}>House/Unit/Floor No.</Text>
                <Text style={tw("text-[6.5px] ml-[40px]")}>Street</Text>
                <Text style={tw("text-[6.5px] ml-[40px]")}>City</Text>
                <Text style={tw("text-[6.5px] ml-[40px]")}>State</Text>
                <Text style={tw("text-[6.5px] ml-[40px]")}>Postal Code</Text>
              </View>
            </View>

            {/* V Line */}
            <View>
              <Text style={tw("border-l h-[35px] ml-[130px]")}></Text>
            </View>

            <View>
              <View style={tw("flex-col")}>
                <View style={tw("flex-row ml-1")}>
                  <Text style={tw("mt-0.5 text-[7px]")}>21.</Text>
                  <Text style={tw("ml-0.5 mt-0.5")}>US TIN</Text>
                  <Text style={tw("ml-1 mt-0.5 text-[7px]")}>
                    (if applicable)
                  </Text>
                </View>
                <View style={tw("flex-row ml-10 mt-0.5")}>
                  <Text style={tw("text-[12px]")}>N / A</Text>
                </View>
              </View>
            </View>
          </View>

          <View>
            <Text style={tw("border-b w-[554px]")}></Text>
          </View>

          {/* Employer/Business Address Info */}
          <View style={tw("flex-row")}>
            <View style={tw("flex-col")}>
              <View style={tw("flex-row")}>
                <View style={tw("flex-row ml-0.5")}>
                  <Text style={tw("mt-0.5 text-[7px]")}>22.</Text>
                  <Text style={tw("ml-0.5 mt-0.5")}>
                    Employer/Business Address
                  </Text>
                </View>
              </View>

              <View style={tw("flex-row")}>
                <Text style={tw("ml-[10px] text-[9px]")}>
                  {data?.companyAddress || ""}
                </Text>
                {!data?.companyAddress && <View style={tw("mt-3")}></View>}
              </View>

              <View style={tw("flex-row text-gray-500 mt-1 mb-0.5")}>
                <Text style={tw("text-[6.5px]")}>House/Unit No.</Text>
                <Text style={tw("text-[6.5px] ml-[20px]")}>Floor</Text>
                <Text style={tw("text-[6.5px] ml-[20px]")}>Building Name</Text>
                <Text style={tw("text-[6.5px] ml-[15px]")}>Street</Text>
                <Text style={tw("text-[6.5px] ml-[15px]")}>Town/City</Text>
                <Text style={tw("text-[6.5px] ml-[15px]")}>Country</Text>
                <Text style={tw("text-[6.5px] ml-[15px]")}>Postal Code</Text>
              </View>
            </View>
          </View>

          <View>
            <Text style={tw("border-b w-[554px]")}></Text>
          </View>

          {/* Job Title/Position Info */}
          <View style={tw("flex-row")}>
            <View style={tw("flex-col")}>
              <View style={tw("flex-row")}>
                <View style={tw("flex-row ml-0.5")}>
                  <Text style={tw("mt-0.5 text-[7px]")}>23.</Text>
                  <Text style={tw("ml-0.5 mt-0.5")}>Job Title/Position</Text>
                </View>
                <View style={tw("flex-row")}>
                  {data?.jobTitlePosition === "tsm" && (
                    <Text
                      style={tw("border bg-gray-600 w-2 h-2 mt-0.5 ml-[71px] ")}
                    ></Text>
                  )}
                  {!(data?.jobTitlePosition === "tsm") && (
                    <Text style={tw("border w-2 h-2 mt-0.5 ml-[71px]")}></Text>
                  )}
                  <Text style={tw("text-[7.5px] ml-[10px]")}>
                    Top/Senior Management
                  </Text>
                </View>
                <View style={tw("flex-row")}>
                  {data?.jobTitlePosition === "ofw" && (
                    <Text
                      style={tw("border bg-gray-600 w-2 h-2 mt-0.5 ml-[30px]")}
                    ></Text>
                  )}
                  {!(data?.jobTitlePosition === "ofw") && (
                    <Text style={tw("border w-2 h-2 mt-0.5 ml-[30px]")}></Text>
                  )}
                  <Text style={tw("text-[7.5px] ml-[10px]")}>
                    Overseas Filipino Worker
                  </Text>
                </View>
                <View style={tw("flex-row")}>
                  {data?.jobTitlePosition === "self" && (
                    <Text
                      style={tw("border bg-gray-600 w-2 h-2 mt-0.5 ml-[30px] ")}
                    ></Text>
                  )}
                  {!(data?.jobTitlePosition === "self") && (
                    <Text style={tw("border w-2 h-2 mt-0.5 ml-[30px]")}></Text>
                  )}
                  <Text style={tw("text-[7.5px] ml-[10px]")}>
                    Self-employed
                  </Text>
                </View>
              </View>
              <View>
                <View style={tw("flex-row")}>
                  <Text style={tw("ml-6 text-[9px]")}>
                    {data?.jobTitle || ""}
                  </Text>
                  {!data?.jobTitle && (
                    <Text style={tw("mt-2 ml-[24px]")}></Text>
                  )}

                  {data?.jobTitlePosition === "rfc" && (
                    <Text
                      style={tw("border bg-gray-600 w-2 h-2 mt-1 ml-[98px] ")}
                    ></Text>
                  )}
                  {!(data?.jobTitlePosition === "rfc") && (
                    <Text style={tw("border w-2 h-2 mt-1 ml-[98px]")}></Text>
                  )}
                  <Text style={tw("text-[7.5px] ml-[10px] mt-0.5")}>
                    Rank and File/Clerical
                  </Text>

                  {data?.jobTitlePosition === "oth" && (
                    <Text
                      style={tw("border bg-gray-600 w-2 h-2 mt-1 ml-[38px] ")}
                    ></Text>
                  )}
                  {!(data?.jobTitlePosition === "oth") && (
                    <Text style={tw("border w-2 h-2 mt-1 ml-[38px]")}></Text>
                  )}
                  <Text style={tw("text-[7.5px] ml-[10px] mt-0.5")}>
                    Others
                  </Text>
                  <Text style={tw("text-gray-500 text-[6.5px] ml-[5px] mt-1")}>
                    (Please specify)
                  </Text>

                  <View style={tw("flex-col")}>
                    <Text style={tw("text-[7.5px] ml-[25px]")}>
                      {data?.jobTitlePositionSpecifyOther}
                    </Text>
                    {data?.jobTitlePositionSpecifyOther && (
                      <Text
                        style={tw("border-b w-[150px] ml-[10px] mb-1")}
                      ></Text>
                    )}
                    {!data?.jobTitlePositionSpecifyOther && (
                      <Text
                        style={tw("border-b w-[150px] ml-[10px] mt-3 mb-1")}
                      ></Text>
                    )}
                  </View>
                </View>
              </View>
            </View>
          </View>

          <View>
            <Text style={tw("border-b w-[554px]")}></Text>
          </View>

          {/* Expected Frequency */}
          <View style={tw("flex-row")}>
            <View style={tw("flex-col")}>
              {/* Change this! no mb */}
              <View style={tw("flex-row mt-0.5 ml-0.5")}>
                <Text style={tw("text-[7px]")}>24.</Text>
                <Text>Expected Frequency of Transaction per Month</Text>
              </View>
              <View style={tw("flex-row mb-0.5")}>
                <Text style={tw("text-[6.5px]")}>
                  (deposits, withdrawals, etc)
                </Text>
              </View>
              <View style={tw("flex-row mb-1")}>
                {data.expectedFreqTransaction === "a5x" && (
                  <Text
                    style={tw("border bg-gray-600 w-2 h-2 mt-0.5 ml-4")}
                  ></Text>
                )}
                {!(data.expectedFreqTransaction === "a5x") && (
                  <Text style={tw("border w-2 h-2 mt-0.5 ml-4")}></Text>
                )}

                <Text style={tw("text-[7.5px] ml-3")}>5x</Text>

                {data.expectedFreqTransaction === "a10x" && (
                  <Text
                    style={tw("border bg-gray-600 w-2 h-2 mt-0.5 ml-6")}
                  ></Text>
                )}
                {!(data.expectedFreqTransaction === "a10x") && (
                  <Text style={tw("border w-2 h-2 mt-0.5 ml-6")}></Text>
                )}

                <Text style={tw("text-[7.5px] ml-2")}>10x</Text>
              </View>
              <View style={tw("flex-row")}>
                {data.expectedFreqTransaction === "a15x" && (
                  <Text
                    style={tw("border bg-gray-600 w-2 h-2 mt-0.5 ml-4")}
                  ></Text>
                )}
                {!(data.expectedFreqTransaction === "a15x") && (
                  <Text style={tw("border w-2 h-2 mt-0.5 ml-4")}></Text>
                )}

                <Text style={tw("text-[7.5px] ml-3")}>15x</Text>

                {data.expectedFreqTransaction === "oth" && (
                  <Text
                    style={tw("border bg-gray-600 w-2 h-2 mt-0.5 ml-[14px]")}
                  ></Text>
                )}
                {!(data.expectedFreqTransaction === "oth") && (
                  <Text style={tw("border w-2 h-2 mt-0.5 ml-[14px]")}></Text>
                )}

                <Text style={tw("text-[7.5px] ml-2")}>Others</Text>

                <Text style={tw("text-[6.5px] text-gray-500 ml-1 mt-0.5")}>
                  (Please specify)
                </Text>

                <View style={tw("flex-col")}>
                  <Text style={tw("ml-6")}>
                    {data?.expectedFreqSpecifyOther || ""}
                  </Text>
                  {data?.expectedFreqSpecifyOther && (
                    <Text style={tw("border-b w-[50px] ml-[10px]")}></Text>
                  )}
                  {!data?.expectedFreqSpecifyOther && (
                    <Text style={tw("border-b w-[50px] ml-[10px] mt-3")}></Text>
                  )}
                </View>
              </View>
            </View>
            {/* V Line 25. */}
            <View>
              <Text style={tw("border-l ml-4 h-[45px]")}></Text>
            </View>
            <View style={tw("flex-col")}>
              <View style={tw("flex-row mb-0.5")}>
                <Text style={tw("text-[7] mt-0.5 ml-1")}>25.</Text>
                <Text style={tw("ml-0.5 mt-0.5")}>
                  Average Amount per Transaction
                </Text>
              </View>
              <View style={tw("flex-row mb-1")}>
                {data?.averageAmountTransaction === "below50k" && (
                  <Text
                    style={tw("border bg-gray-600 w-2 h-2 mt-0.5 ml-[20px]")}
                  ></Text>
                )}
                {!(data?.averageAmountTransaction === "below50k") && (
                  <Text style={tw("border w-2 h-2 ml-[20px] mt-0.5")}></Text>
                )}
                <Text style={tw("text-[7.5px] ml-2")}>Below P50K</Text>

                {data?.averageAmountTransaction === "a51k" && (
                  <Text
                    style={tw("border bg-gray-600 w-2 h-2 mt-0.5 ml-[25px]")}
                  ></Text>
                )}
                {!(data?.averageAmountTransaction === "a51k") && (
                  <Text style={tw("border w-2 h-2 ml-[25px] mt-0.5")}></Text>
                )}
                <Text style={tw("text-[7.5px] ml-2")}>P51K to P100K</Text>
              </View>
              <View style={tw("flex-row")}>
                {data?.averageAmountTransaction === "a101k" && (
                  <Text
                    style={tw("border bg-gray-600 w-2 h-2 mt-0.5 ml-[20px]")}
                  ></Text>
                )}
                {!(data?.averageAmountTransaction === "a101k") && (
                  <Text style={tw("border w-2 h-2 ml-[20px] mt-0.5")}></Text>
                )}
                <Text style={tw("text-[7.5px] ml-2")}>P101K to P500K</Text>

                {data?.averageAmountTransaction === "a501k" && (
                  <Text
                    style={tw("border bg-gray-600 w-2 h-2 mt-0.5 ml-[10px]")}
                  ></Text>
                )}
                {!(data?.averageAmountTransaction === "a501k") && (
                  <Text style={tw("border w-2 h-2 ml-[10px] mt-0.5")}></Text>
                )}
                <Text style={tw("text-[7.5px] ml-2")}>P501K and above</Text>
              </View>
            </View>
            {/* V Line */}
            <View>
              <Text style={tw("border-l ml-4 h-[45px]")}></Text>
            </View>
            <View style={tw("flex-col")}>
              <View style={tw("flex-row mb-0.5")}>
                <Text style={tw("text-[7px] mt-0.5 ml-1")}>26.</Text>
                <Text style={tw("ml-0.5 mt-0.5")}>Preferred Address</Text>
              </View>
              <View style={tw("flex-row mb-1")}>
                {data?.preferredMailingAddress === "permanent" && (
                  <Text
                    style={tw("border bg-gray-600 w-2 h-2 mt-0.5 ml-[20px]")}
                  ></Text>
                )}
                {!(data?.preferredMailingAddress === "permanent") && (
                  <Text
                    style={tw("border w-2 h-2 ml-[10px] mt-0.5 ml-[20px]")}
                  ></Text>
                )}
                <Text style={tw("text-[7.5px] ml-2")}>Permanent Address</Text>
              </View>
              <View style={tw("flex-row mb-1")}>
                {data?.preferredMailingAddress === "present" && (
                  <Text
                    style={tw("border bg-gray-600 w-2 h-2 mt-0.5 ml-[20px]")}
                  ></Text>
                )}
                {!(data?.preferredMailingAddress === "present") && (
                  <Text style={tw("border w-2 h-2 ml-[20px] mt-0.5")}></Text>
                )}
                <Text style={tw("text-[7.5px] ml-2")}>Present Address</Text>
              </View>
              <View style={tw("flex-row")}>
                {data?.preferredMailingAddress === "business_employer" && (
                  <Text
                    style={tw("border bg-gray-600 w-2 h-2 mt-0.5 ml-[20px]")}
                  ></Text>
                )}
                {!(data?.preferredMailingAddress === "business_employer") && (
                  <Text style={tw("border w-2 h-2 ml-[20px] mt-0.5")}></Text>
                )}
                <Text style={tw("text-[7.5px] ml-2")}>
                  Business/Employer Address
                </Text>
              </View>
            </View>
          </View>
          <View>
            <Text style={tw("border-b w-[554px]")}></Text>
          </View>

          {/* Footer */}
          <View style={tw("mt-1")}>
            <Text style={tw("text-[7px] font-bold")}></Text>
          </View>
        </Page>
      </Document>
    </>
  )
}
