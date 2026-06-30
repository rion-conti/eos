export const CUSTOMER_STATUSES = [
  "all",
  "completed",
  "cancelled",
  "shipped_out",
  "pending",
  "created",
  "for_printing",
  "ho_accepted",
  "ho_returned_doc",
  "ho_shipped_out",
  "atm_delivered",
] as const;

export const CUSTOMER_STATUSES_VALUES = [
  { value: "all", label: "All Statuses" },
  { value: "completed", label: "Completed" },
  { value: "cancelled", label: "Cancelled" },
  { value: "shipped_out", label: "Shipped Out" },
  { value: "pending", label: "Pending" },
  { value: "created", label: "Created" },
  { value: "for_printing", label: "For Printing" },
  { value: "ho_accepted", label: "HO Accepted" },
  { value: "ho_returned_doc", label: "HO Returned Doc" },
  { value: "ho_shipped_out", label: "HO Shipped Out" },
  { value: "atm_delivered", label: "ATM Delivered" },
] as const