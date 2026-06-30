"use client"

import { columns, CustomerTable } from "./columns"
import { DataTable } from "./data-table"
import { useState } from "react"
import { ConfirmDeleteDialog } from "@/components/confirm-delete-alertdialog"
import { toast } from "sonner"
import { ConfirmEditDialog } from "@/components/confirm-edit-dialog"
import {
  createCustomerAction,
  deleteCustomerByIdAction,
  getCustomerByIdAction,
  updateCustomerByIdAction,
} from "@/actions/actions"
import { ConfirmAddDialog } from "@/components/confirm-add-dialog"
import { ActionResult, FormValues } from "@/components/customer-form"
import {
  nullToUndefined,
  transformDBToForm,
  transformFormToDB,
} from "@/lib/utils"
import { useRouter } from "next/navigation"
import { CustomerEssentials, CustomerFormWithId } from "@/lib/types"

type User = {
  userId: string
  username: string
}

type TableCustomerPageProps = {
  data: CustomerTable[]
  user: User
}

export default function TableCustomerPage({
  data,
  user,
}: TableCustomerPageProps) {
  const [item, setItem] = useState<CustomerTable[]>(data)
  const [selectedRowDelete, setSelectedRowDelete] =
    useState<CustomerTable | null>(null)
  const [selectedRowEdit, setSelectedRowEdit] = useState<
    (CustomerTable & CustomerFormWithId) | null
  >(null)
  const [selectedRowView, setSelectedRowView] = useState<
    (CustomerTable & CustomerFormWithId) | null
  >(null)
  const [addRow, setAddRow] = useState<FormValues | null>(null)

  const router = useRouter()

  // Derive State

  // ✅ THIS is onAdd
  const handleAddRequest = () => {
    setAddRow(transformDBToForm(null))
  }
  const handleConfirmAdd = async (values: FormValues, offset: number) => {
    if (!addRow) return { success: false as const, error: "No values" }

    const userId = user.userId
    const createdBy = user.username
    const updatedBy = ""
    const payload = transformFormToDB(values)
    const additionalPayload = {
      ...payload,
      userId,
      createdBy,
      updatedBy,
    } as CustomerEssentials

    let result: ActionResult<CustomerTable>
    try {
      result = await createCustomerAction(additionalPayload, offset)

      if (!result.success) {
        console.log(result.error)
        toast.error("Create failed", {
          description: result.error,
        })
        return result
      }
      // Update UI
      const newCustomer = result.data
      setItem((prev) => [...prev, newCustomer])

      toast.success("Customer added", {
        description: `${newCustomer.firstname} ${newCustomer.lastname} was added successfully.`,
      })

      setAddRow(null)
      return result
    } catch (error) {
      console.error(error)
      toast.error("Create failed", {
        description: "Something went wrong while creating the customer.",
      })
      return { success: false as const, error: "Unexpected error occurred" }
    }
  }

  // ✅ THIS is onEdit
  const handleEditRequest = async (row: CustomerTable) => {
    try {
      const result = await getCustomerByIdAction(row.id)
      if (!result.success) {
        console.log(result.error)
        toast.error("Failed to load customer", {
          description: result.error,
        })
        return result
      }

      setSelectedRowEdit(
        nullToUndefined({
          ...result.data,
          ...transformDBToForm(result.data),
        }) as CustomerTable & CustomerFormWithId
      )
    } catch (error) {
      console.error(error)
      toast.error("Failed to load customer", {
        description: "Unable to fetch full customer details",
      })
    }
  }

  const handleConfirmEdit = async (values: FormValues, offset: number) => {
    if (!selectedRowEdit)
      return { success: false as const, error: "No selection" }

    const updatedBy = user.username
    const payload = transformFormToDB(values)
    const additionalPayload = { ...payload, updatedBy } as CustomerEssentials

    try {
      const result = await updateCustomerByIdAction(
        selectedRowEdit.id,
        additionalPayload,
        offset
      )

      if (!result.success) {
        console.log(result.error)
        toast.error("Update failed", {
          description: result.error,
        })
        return result
      }

      const editCustomer = result.data
      setItem((prev) =>
        prev.map((customer) =>
          customer.id === selectedRowEdit.id ? editCustomer : customer
        )
      )

      toast.success("Customer updated", {
        description: `${result.data.firstname} ${result.data.lastname} was updated successfully.`,
      })
      setSelectedRowEdit(null)
      return result
    } catch (error) {
      console.error(error)
      toast.error("Update failed", {
        description: "Something went wrong while updating the customer.",
      })
      return { success: false as const, error: "Unexpected error occurred" }
    }
  }
  // ✅ THIS is onView
  const handleViewRequest = async (row: CustomerTable) => {
    try {
      const result = await getCustomerByIdAction(row.id)
      if (!result.success) {
        console.log(result.error)
        toast.error("Failed to load customer", {
          description: result.error,
        })
        return result
      }

      setSelectedRowView(
        nullToUndefined({
          ...result.data,
          ...transformDBToForm(result.data),
        }) as unknown as CustomerTable & CustomerFormWithId
      )
    } catch (error) {
      console.error(error)
      toast.error("Failed to load customer", {
        description: "Unable to fetch full customer details",
      })
    }
  }

  // ✅ THIS is onPDF
  const handlePDFRequest = async (row: CustomerTable) => {
    try {
      const offset = new Date().getTimezoneOffset()
      router.push(`/pdf?id=${row.id}&offset=${offset}`)
    } catch (error) {
      console.error(error)
      toast.error("Failed to load customer", {
        description: "Unable to fetch full customer details",
      })
    }
  }

  // ✅ THIS is onDelete
  const handleDeleteRequest = (row: CustomerTable) => {
    setSelectedRowDelete(row) // open dialog
  }

  const handleConfirmDelete = async () => {
    if (!selectedRowDelete) return

    try {
      // fetch to delete
      const result = await deleteCustomerByIdAction(selectedRowDelete.id)

      if (!result.success) {
        console.log(result.error)
        toast.error("Delete failed", {
          description: result.error,
        })
        return result
      }

      // Update UI
      setItem((prev) => prev.filter((item) => item.id !== selectedRowDelete.id))

      toast.success("Customer deleted", {
        description: `${selectedRowDelete.firstname} ${selectedRowDelete.lastname} was removed successfully.`,
      })
    } catch {
      toast.error("Delete failed", {
        description: "Something went wrong while deleting the customer.",
      })
    } finally {
      setSelectedRowDelete(null)
    }
  }

  // Deletion Selection of Records
  const handleDeletionSelection = (deletedIds: string[]) => {
    setItem((prev) => prev.filter((row) => !deletedIds.includes(row.id)))
  }

  return (
    <>
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-screen-2xl py-6">
          <div className="w-full overflow-x-auto">
            <DataTable
              columns={columns({
                onDelete: handleDeleteRequest,
                onEdit: handleEditRequest,
                onView: handleViewRequest,
                onPDF: handlePDFRequest,
              })}
              data={item}
              onAdd={handleAddRequest}
              onDeleteSelection={handleDeletionSelection}
            />
          </div>
          {selectedRowDelete && (
            <ConfirmDeleteDialog
              open={!!selectedRowDelete}
              title="Delete customer"
              description={`Are you sure you want to delete ${selectedRowDelete?.firstname} ${selectedRowDelete?.lastname}?`}
              onConfirm={handleConfirmDelete}
              onCancel={() => setSelectedRowDelete(null)}
            />
          )}

          {selectedRowEdit && (
            <ConfirmEditDialog
              title="Updating Customer"
              description="Update the customer information below and click save when finished."
              actionType="edit"
              data={selectedRowEdit}
              onClose={() => setSelectedRowEdit(null)}
              onSubmit={handleConfirmEdit}
            />
          )}

          {selectedRowView && (
            <ConfirmEditDialog
              title="Viewing Customer"
              description="View the customer information."
              actionType="view"
              data={selectedRowView}
              onClose={() => setSelectedRowView(null)}
            />
          )}

          {addRow && (
            <ConfirmAddDialog
              data={addRow}
              onClose={() => setAddRow(null)}
              onSubmit={handleConfirmAdd}
            />
          )}
        </div>
      </div>
    </>
  )
}
