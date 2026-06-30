import { Suspense } from "react";
import CustomerListing from "@/components/customer-listing";

export default function CustomerPage() {
  
  return (
    <>
      <Suspense fallback={<div className="ml-11 text-sm text-green-500">Loading customer...</div>}>
        <CustomerListing />
      </Suspense>
    </>
  );
}