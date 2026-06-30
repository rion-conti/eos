import { getCustomerByIdAction } from "@/actions/actions"
import CIFWrapper from "@/components/pdf/cif-wrapper"
import { utcOffsetToDB } from "@/lib/utils"
import { redirect } from "next/navigation"

export default async function GeneratePDFPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const { id, offset } = await searchParams

  let result = await getCustomerByIdAction(id as string)
  if (!result.success) {
    console.log(result.error)
    redirect("/")
  }

  const utcBirthDate = utcOffsetToDB(result.data.birthDate, Number(offset))
  const utcSpouseBirthdate = result.data.spouseBirthdate
    ? utcOffsetToDB(result.data.spouseBirthdate, Number(offset))
    : null
  const utcReferenceDate = result.data.referenceDate
    ? utcOffsetToDB(result.data.referenceDate, Number(offset))
    : null

  result = {
    ...result,
    data: {
      ...result.data,
      birthDate: utcBirthDate,
      spouseBirthdate: utcSpouseBirthdate,
      referenceDate: utcReferenceDate,
    },
  }

  return (
    <>
      <CIFWrapper data={result?.data} />
    </>
  )
}
