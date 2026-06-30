"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Eye, FileText, MoreHorizontal, Pencil, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DataTableColumnHeader } from "./data-table-column-header"

import { formatDateSafe, utcOffsetToForm } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type CustomerTable = {
  id: string
  customerStatus:
    | "created"
    | "for_printing"
    | "completed"
    | "shipped_out"
    | "ho_accepted"
    | "ho_returned_doc"
    | "ho_shipped_out"
    | "atm_delivered"
    | "pending"
    | "cancelled"
  lastname: string
  firstname: string
  middlename: string
  suffix?: string | null
  email: string
  currentMobile: string
  homeCountryMobile: string
  createdBy: string
  updatedBy: string
  createdAt: Date
  updatedAt: Date
}
type ColumnsProps = {
  onDelete: (row: CustomerTable) => void
  onEdit: (row: CustomerTable) => void
  onView: (row: CustomerTable) => void
  onPDF: (row: CustomerTable) => void
}

export const columns = ({
  onDelete,
  onEdit,
  onView,
  onPDF,
}: ColumnsProps): ColumnDef<CustomerTable>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        indeterminate={
          table.getIsSomePageRowsSelected() && !table.getIsAllPageRowsSelected()
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "customerStatus",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const value = row.getValue("customerStatus")
      let backgroundColor = "white"
      switch (value) {
        case "created":
          backgroundColor = "oklch(70.7% 0.022 261.325)" //gray
          break
        case "for_printing":
          backgroundColor = "oklch(70.7% 0.165 254.624)" //blue
          break
        case "completed":
          backgroundColor = "oklch(79.2% 0.209 151.711)" //green
          break
        case "shipped_out":
          backgroundColor = "oklch(70.7% 0.165 254.624)" //blue
          break
        case "ho_accepted":
          backgroundColor = "oklch(79.2% 0.209 151.711)" //green
          break
        case "ho_returned_doc":
          backgroundColor = "oklch(90.5% 0.182 98.111)" //yellow
          break
        case "ho_shipped_out":
          backgroundColor = "oklch(70.7% 0.165 254.624)" //blue
          break
        case "atm_delivered":
          backgroundColor = "oklch(79.2% 0.209 151.711)" //green
          break
        case "pending":
          backgroundColor = "oklch(90.5% 0.182 98.111)" //yellow
          break
        case "cancelled":
          backgroundColor = "lightcoral" //red
          break
      }

      return (
        <span
          style={{ backgroundColor, padding: "4px 8px", borderRadius: "4px" }}
        >
          {typeof value === "string" ? value : null}
        </span>
      )
    },
  },

  {
    accessorKey: "id",
    header: "Identifier",
  },
  {
    id: "fullname",
    accessorFn: (row) =>
      `${row.firstname} ${row.middlename} ${row.lastname} ${row.suffix}`,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Fullname" />
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
  },
  {
    accessorKey: "currentMobile",
    header: "Current Mobile No.",
  },
  {
    accessorKey: "homeCountryMobile",
    header: "PHL Mobile No.",
  },

  {
    accessorKey: "createdBy",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created By" />
    ),
  },
  {
    accessorKey: "updatedBy",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Updated By" />
    ),
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Creation Date" />
    ),

    cell: ({ row }) => {
      const offset = new Date().getTimezoneOffset()
      const offsetDate = utcOffsetToForm(row.getValue("createdAt"), offset)
      return formatDateSafe(offsetDate)
    },
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Updated Date" />
    ),
    cell: ({ row }) => {
      const offset = new Date().getTimezoneOffset()
      const offsetDate = utcOffsetToForm(row.getValue("updatedAt"), offset)
      return formatDateSafe(offsetDate)
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const item = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            }
            suppressHydrationWarning
          >
            f
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-auto min-w-max">
            <DropdownMenuGroup>
              <DropdownMenuLabel>Actions</DropdownMenuLabel>

              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  onView(item)
                }}
              >
                <Eye /> View customer
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => {
                  onEdit(item)
                }}
              >
                <Pencil /> Edit customer
              </DropdownMenuItem>

              <DropdownMenuItem onClick={() => onPDF(item)}>
                <FileText /> Generate PDF
              </DropdownMenuItem>
              <Separator />
              <DropdownMenuItem
                onClick={() => {
                  // e.preventDefault();
                  onDelete(item)
                }}
              >
                <div className="flex gap-2 text-red-800">
                  <Trash2 /> Delete customer
                </div>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
