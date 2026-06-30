import DemographicsSection from "@/components/demographic/demographic-section"
import H1 from "@/components/H1"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { getCustomersSummaryCountsService } from "@/services/customer-service"

export default async function SummaryPage() {
  const {
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
  } = await getCustomersSummaryCountsService()

  return (
    <>
      <div className="ml-10">
        <H1>Customer Status</H1>
      </div>
      <div className="m-10 grid grid-cols-1 gap-4 md:grid-cols-6">
        <Card className="max-h-40 max-w-40">
          <CardHeader>
            <CardTitle className="flex justify-center text-4xl font-bold">
              {total}
            </CardTitle>
          </CardHeader>
          <Separator />
          <CardContent className="text-md flex justify-center bg-black text-white">
            <p>Total</p>
          </CardContent>
        </Card>

        <Card className="max-h-40 max-w-40">
          <CardHeader>
            <CardTitle className="flex justify-center text-4xl font-bold">
              {created}
            </CardTitle>
          </CardHeader>
          <Separator />
          <CardContent className="text-md flex justify-center bg-gray-400 text-white">
            <p>Created</p>
          </CardContent>
        </Card>

        <Card className="max-h-40 max-w-40">
          <CardHeader>
            <CardTitle className="flex justify-center text-4xl font-bold">
              {forPrinting}
            </CardTitle>
          </CardHeader>
          <Separator />
          <CardContent className="text-md flex justify-center bg-blue-400 text-white">
            <p>For Printing</p>
          </CardContent>
        </Card>

        <Card className="max-h-40 max-w-40">
          <CardHeader>
            <CardTitle className="flex justify-center text-4xl font-bold">
              {completed}
            </CardTitle>
          </CardHeader>
          <Separator />
          <CardContent className="text-md flex justify-center bg-green-400 text-white">
            <p>Completed</p>
          </CardContent>
        </Card>

        <Card className="max-h-40 max-w-40">
          <CardHeader>
            <CardTitle className="flex justify-center text-4xl font-bold">
              {shippedOut}
            </CardTitle>
          </CardHeader>
          <Separator />
          <CardContent className="flex justify-center bg-blue-400 text-sm text-white">
            <p>Shipped Out</p>
          </CardContent>
        </Card>

        <Card className="max-h-40 max-w-40">
          <CardHeader>
            <CardTitle className="flex justify-center text-4xl font-bold">
              {hoAccepted}
            </CardTitle>
          </CardHeader>
          <Separator />
          <CardContent className="flex justify-center bg-green-400 text-sm text-white">
            <p>HO Accepted</p>
          </CardContent>
        </Card>

        <Card className="max-h-40 max-w-40">
          <CardHeader>
            <CardTitle className="flex justify-center text-4xl font-bold">
              {hoReturnedDoc}
            </CardTitle>
          </CardHeader>
          <Separator />
          <CardContent className="flex justify-center bg-yellow-400 text-xs text-white">
            <p>HO Returned Doc</p>
          </CardContent>
        </Card>

        <Card className="max-h-40 max-w-40">
          <CardHeader>
            <CardTitle className="flex justify-center text-4xl font-bold">
              {hoShippedOut}
            </CardTitle>
          </CardHeader>
          <Separator />
          <CardContent className="flex justify-center bg-blue-400 text-xs text-white">
            <p>HO Shipped Out</p>
          </CardContent>
        </Card>

        <Card className="max-h-40 max-w-40">
          <CardHeader>
            <CardTitle className="flex justify-center text-4xl font-bold">
              {atmDelivered}
            </CardTitle>
          </CardHeader>
          <Separator />
          <CardContent className="flex justify-center bg-green-400 text-xs text-white">
            <p>ATM Delivered</p>
          </CardContent>
        </Card>

        <Card className="max-h-40 max-w-40">
          <CardHeader>
            <CardTitle className="flex justify-center text-4xl font-bold">
              {pending}
            </CardTitle>
          </CardHeader>
          <Separator />
          <CardContent className="text-md flex justify-center bg-yellow-400 text-white">
            <p>Pending</p>
          </CardContent>
        </Card>

        <Card className="max-h-40 max-w-40">
          <CardHeader>
            <CardTitle className="flex justify-center text-4xl font-bold">
              {cancelled}
            </CardTitle>
          </CardHeader>
          <Separator />
          <CardContent className="text-md flex justify-center bg-red-400 text-white">
            <p>Cancelled</p>
          </CardContent>
        </Card>
      </div>

      <Separator />
      <DemographicsSection />
    </>
  )
}
