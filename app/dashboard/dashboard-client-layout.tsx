"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import Sidebar from "@/components/sidebar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { signOutAction } from "@/actions/auth"
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Bell, LogOut, Menu, PanelLeft } from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Separator } from "@/components/ui/separator"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Session } from "@/lib/auth"

export default function DashboardClientLayout({
  children,
  session,
}: {
  children: React.ReactNode
  session: Session
}) {
  const [collapsed, setCollapsed] = useState(false)
  const [openLogout, setOpenLogout] = useState(false)
  const pathname = usePathname()

  /* Dynamic Title */
  const getTitle = () => {
    if (pathname === "/dashboard/summary") return "Summary"
    if (pathname === "/dashboard/settings") return "Account Settings"
    if (pathname === "/dashboard/customer") return "Customer"
    if (pathname === "/dashboard/purge") return "Purge"
    if (pathname === "/dashboard/excel") return "Export"
    return "Dashboard"
  }
  const title = getTitle()

  return (
    <div className="flex min-h-screen">
      {/* DESKTOP SIDEBAR */}
      <Sidebar
        session={session}
        collapsed={collapsed}
        onToggleCollapse={() => setCollapsed(!collapsed)}
        onLogout={() => setOpenLogout(true)}
        header={""}
      />
      <div className="flex flex-1 flex-col bg-gray-100 dark:bg-gray-900">
        {/* HEADER */}
        <header className="flex h-16 items-center justify-between bg-background px-6 shadow-sm">
          <div className="flex items-center gap-3">
            {/* MOBILE SIDEBAR */}
            <Sheet>
              <SheetTrigger
                render={<Button variant="ghost" className="md:hidden" />}
                suppressHydrationWarning
              >
                <Menu />
              </SheetTrigger>

              <SheetContent side="left" className="w-64">
                <SheetTitle className="sr-only">Sidebar</SheetTitle>

                <Sidebar
                  session={session}
                  isMobile
                  collapsed={false}
                  onToggleCollapse={() => {}}
                  onLogout={() => setOpenLogout(true)}
                  header={""}
                />
              </SheetContent>
            </Sheet>
            {/* TOGGLE */}
            <div className="">
              <Tooltip>
                <TooltipTrigger
                  render={
                    <Button
                      variant="ghost"
                      onClick={() => setCollapsed(!collapsed)}
                      className="hidden md:block dark:hover:bg-white dark:hover:text-black"
                    />
                  }
                >
                  <PanelLeft />
                </TooltipTrigger>
                <TooltipContent side="right">Toggle sidebar</TooltipContent>
              </Tooltip>
            </div>
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-8"
            />
            <h1 className="text-xl font-semibold text-primary">{title}</h1>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger
                render={<Button variant="ghost" />}
                suppressHydrationWarning
              >
                <Bell size={18} />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuGroup>
                  <DropdownMenuItem>No new notifications</DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <Button variant="ghost" suppressHydrationWarning>
                    <div className="hover:none flex h-8 w-8 items-center justify-center rounded-full bg-gray-300">
                      {session?.user?.name?.charAt(0) ?? ""}
                    </div>
                  </Button>
                }
              />
              <DropdownMenuContent>
                <DropdownMenuGroup>
                  <DropdownMenuItem
                    className="flex flex-row gap-3"
                    onClick={() => signOutAction()}
                  >
                    <LogOut /> Sign out
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <main className="w-full flex-1 p-6">{children}</main>
      </div>

      {/* Sign out Dialog */}
      <Dialog open={openLogout} onOpenChange={setOpenLogout}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Sign out</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>

          <p>Are you sure you want to sign out?</p>

          <DialogFooter className="flex gap-2">
            <Button variant="ghost" onClick={() => setOpenLogout(false)}>
              Cancel
            </Button>
            <Button
              variant="default"
              className="hover:bg-red-600"
              onClick={signOutAction}
            >
              Sign out
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
