import { checkAuth } from "@/lib/checkAuth"
import DashboardClientLayout from "./dashboard-client-layout"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await checkAuth()

  return (
    <DashboardClientLayout session={session}>{children}</DashboardClientLayout>
  )
}
