import { checkAuth } from "@/lib/checkAuth"
import {
  getAllCustomersTableByUserService,
  getAllCustomersTableService,
} from "@/services/customer-service"
import H1 from "./H1"
import ErrorAlert from "./error-alert"
import TableCustomerPage from "./table-customer/page"

export default async function CustomerListing() {
  const session = await checkAuth()
  const isAdmin = session?.user.role === "admin"
  const userId = session?.user.id
  const user = {
    username: session?.user.name,
    userId,
    userEmail: session?.user.email,
  }

  let data
  try {
    if (isAdmin) {
      data = await getAllCustomersTableService()
    } else {
      data = await getAllCustomersTableByUserService(userId)
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
    } else {
      console.error("Not able to load Customer records", error)
    }
    return <ErrorAlert message="We couldn't load your data right now." />
  }

  return (
    <div>
      <H1 className="flex items-center justify-center">Customer Listing</H1>
      <TableCustomerPage data={data} user={user} />
    </div>
  )
}
