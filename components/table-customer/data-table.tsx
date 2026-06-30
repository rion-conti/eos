"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { DataTablePagination } from "./data-table-pagination"
import { DataTableViewOptions } from "./data-table-view-options"
import { DeleteRecordsControl } from "../delete-records-control"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  onAdd: () => void
  onDeleteSelection: (deletedIds: string[]) => void
}

const initialState = { id: false, updatedBy: false }

export function DataTable<TData extends { id: string }, TValue>({
  columns,
  data,
  onAdd,
  onDeleteSelection,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] =
    useState<VisibilityState>(initialState)
  const [rowSelection, setRowSelection] = useState({})

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  const resetTable = () => {
    setRowSelection({}) // Clears checkboxes
    onDeleteSelection(selectedIds)
  }

  const selectedRows = table.getFilteredSelectedRowModel().rows
  const selectedData = selectedRows.map((row) => row.original)
  const selectedIds = selectedData.map((row) => row.id)

  return (
    <div>
      <div className="mb-4 rounded-md border bg-background p-2 shadow-md">
        <div className="mt-3 mr-5 ml-5 flex items-center py-2">
          <Input
            placeholder="Filter fullnames..."
            value={
              (table.getColumn("fullname")?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn("fullname")?.setFilterValue(event.target.value)
            }
            className="max-w-50"
          />
          <Button
            onClick={() => setColumnFilters([])}
            variant="outline"
            size="sm"
            className="mr-2 ml-2 h-9"
          >
            Clear Filter
          </Button>

          <DataTableViewOptions table={table} />

          <Button
            variant="default"
            size="sm"
            className="ml-2 h-9"
            onClick={onAdd}
          >
            Add Customer
          </Button>
        </div>
        <div className="mb-10 ml-5 flex items-center gap-2">
          <Input
            placeholder="Filter emails..."
            value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("email")?.setFilterValue(event.target.value)
            }
            className="max-w-50"
          />
          <Input
            placeholder="Filter status..."
            value={
              (table.getColumn("customerStatus")?.getFilterValue() as string) ??
              ""
            }
            onChange={(event) =>
              table
                .getColumn("customerStatus")
                ?.setFilterValue(event.target.value)
            }
            className="max-w-50"
          />
        </div>
      </div>

      {selectedData.length > 0 && (
        <DeleteRecordsControl
          selectedIds={selectedIds}
          onComplete={resetTable}
        />
      )}

      <div className="overflow-hidden rounded-md border bg-background shadow-md">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {selectedData.length > 0 && (
        <div className="mt-2 mb-2 flex items-center justify-end space-x-2 border py-4">
          <div className="flex-1 text-sm text-muted-foreground">
            {JSON.stringify(selectedData, null, 2)}
          </div>
        </div>
      )}
      <DataTablePagination table={table} />
    </div>
  )
}
