"use client"

// import { useState } from "react";
// import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog"
import CustomerForm, { ActionResult, FormValues } from "./customer-form"
import { Button } from "./ui/button"
import { CustomerTable } from "@/components/table-customer/columns"

type AddDialogProps = {
  onClose: () => void
  onSubmit: (newCustomer: FormValues, offset: number) => Promise<ActionResult<CustomerTable>>
  data: FormValues
}

export function ConfirmAddDialog({ onClose, onSubmit, data }: AddDialogProps) {
  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="flex max-h-[85vh] w-full flex-col sm:min-w-xl md:min-w-5xl">
        <DialogHeader>
          <DialogTitle className="text-blue-500">Adding Customer</DialogTitle>
          <DialogDescription>
            Create the customer information below and click save when finished.
          </DialogDescription>
        </DialogHeader>
        <div className="overflow-y-auto pr-2">
          <CustomerForm actionType="add" onSubmit={onSubmit} data={data} />
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
