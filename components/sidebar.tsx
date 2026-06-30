"use client"

import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ChevronsLeft, Download, Home, LogOut, Settings, Trash2, User, Users } from "lucide-react"
import { motion } from "motion/react"
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip"
import { Session } from "@/lib/auth"
import { useMemo } from "react"
import Link from "next/link"

type SidebarProps = {
  session: Session
  collapsed: boolean
  onToggleCollapse: () => void
  onLogout?: () => void
  header?: React.ReactNode
  isMobile?: boolean
}

const navItems = [
  {
    label: "Dashboard",
    icon: Home,
    role: ["admin"],
    path: "/dashboard/summary",
  },
  {
    label: "Account Settings",
    icon: Settings,
    role: ["admin", "user"],
    path: "/dashboard/settings",
  },
  {
    label: "Customer",
    icon: Users,
    role: ["admin", "user"],
    path: "/dashboard/customer",
  },
  {
    label: "Purge",
    icon: Trash2,
    role: ["admin"],
    path: "/dashboard/purge",
  },
  {
    label: "Export",
    icon: Download,
    role: ["admin"],
    path: "/dashboard/excel",
  },
]

export default function Sidebar({
  session,
  collapsed,
  onToggleCollapse,
  onLogout,
  header,
  isMobile = false,
}: SidebarProps) {
  const router = useRouter()
  const pathname = usePathname()
  const role = session?.user?.role ?? "user"
  const appVersion = `version ${process.env.NEXT_PUBLIC_APP_VERSION ?? "1.x.x"}`
  const navItemsFiltered = useMemo(() => {
    return navItems.filter((item) => item.role.includes(role))
  }, [role])

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 80 : 256 }}
      transition={{
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1], // smooth (material-like)
      }}
      className={`flex flex-col bg-background p-4 shadow-md ${isMobile ? "w-full" : "hidden md:flex"} `}
    >
      {/* CUSTOM HEADER (PROFILE / LOGO / ETC) */}
      {header && <div className="mb-6">{header}</div>}

      {/* PROFILE */}
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-gray-200 p-2">
            <Link href="/">
              <User className="h-5 w-5" />
            </Link>
          </div>
          {!collapsed && (
            <div>
              <p className="font-semibold">{session?.user?.name ?? ""}</p>
              <p className="text-xs text-gray-500">
                {session?.user?.email ?? ""}
              </p>
            </div>
          )}
        </div>

        {/* NAV ITEMS */}
        <nav className="flex flex-col gap-2">
          {navItemsFiltered.map((item) => {
            const isActive = pathname === item.path

            const navButton = (
              <motion.button
                key={item.path}
                onClick={() => router.push(item.path)}
                initial={false}
                animate={{
                  x: isActive ? 6 : 0,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className={`relative flex items-center ${
                  collapsed ? "justify-center" : "gap-3"
                } min-w-0 rounded-lg p-2 pl-4 ${
                  isActive
                    ? "bg-gray-100 font-medium dark:text-black"
                    : "hover:bg-gray-100 dark:hover:text-black"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId={!collapsed ? "active-indicator" : undefined}
                    key={item.path}
                    className="absolute top-1/2 left-0 h-10 w-1 -translate-y-1/2 rounded-r bg-black dark:bg-teal-300"
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30,
                    }}
                  />
                )}

                <item.icon className="h-4 w-4 shrink-0" />

                <motion.span
                  className="overflow-hidden whitespace-nowrap"
                  animate={{
                    opacity: collapsed ? 0 : 1,
                    x: collapsed ? -10 : 0,
                  }}
                  transition={{ duration: 0.2 }}
                >
                  {item.label}
                </motion.span>
              </motion.button>
            )

            return (
              <Tooltip key={item.path}>
                <TooltipTrigger render={navButton}></TooltipTrigger>

                <TooltipContent
                  side="right"
                  sideOffset={8}
                  align="center"
                  // This disables tooltip visually & interaction when expanded
                  className={`transition-opacity ${
                    collapsed ? "opacity-100" : "pointer-events-none opacity-0"
                  }`}
                >
                  {item.label}
                </TooltipContent>
              </Tooltip>
            )
          })}
        </nav>
      </div>

      {/* FOOTER */}
      <div className="mt-auto flex flex-col gap-2">
        <Button
          variant="ghost"
          onClick={onToggleCollapse}
          className="w-full dark:hover:bg-white dark:hover:text-black"
        >
          <motion.div
            animate={{ rotate: collapsed ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronsLeft />
          </motion.div>
        </Button>

        {/* Sign out */}
        <Tooltip>
          <TooltipTrigger
            render={
              <Button
                variant="ghost"
                onClick={onLogout}
                className="flex justify-start gap-2 hover:text-gray-600 dark:hover:bg-white"
              />
            }
          >
            <LogOut size={16} />
            {!collapsed && "Sign out"}
          </TooltipTrigger>
          <TooltipContent
            side="right"
            className={collapsed ? "block" : "hidden"}
          >
            Sign out
          </TooltipContent>
        </Tooltip>
        <p className="text-xs">{appVersion}</p>
      </div>
    </motion.aside>
  )
}
