"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog"
import { Button } from "./ui/button"

import CustomerForm, { ActionResult, FormValues } from "./customer-form"
import { CustomerTable } from "@/components/table-customer/columns"
import { CustomerFormWithId } from "@/lib/types"

type EditDialogProps = {
  title: string
  description: string
  actionType: string
  data: CustomerFormWithId
  onClose: () => void
  onSubmit?: (formCustomer: FormValues, offset: number) => Promise<ActionResult<CustomerTable>>
}

export function ConfirmEditDialog({
  title,
  description,
  actionType,
  data,
  onClose,
  onSubmit,
}: EditDialogProps) {
  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="flex max-h-[85vh] w-full flex-col sm:min-w-xl md:min-w-5xl">
        <DialogHeader>
          <DialogTitle className="text-blue-500">{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto pr-2">
          {/* Server component fetches the data */}
          <CustomerForm
            actionType={actionType}
            onSubmit={onSubmit}
            data={data}
          />
        </div>

        <div className="mt-4 flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
