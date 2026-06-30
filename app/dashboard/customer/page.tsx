import { Suspense } from "react";
import CustomerSkeleton from "@/components/customer-skeleton";
import CustomerListing from "@/components/customer-listing";

export default function CustomerPage() {
  
  return (
    <>
      <Suspense fallback={<CustomerSkeleton />}>
        <CustomerListing />
      </Suspense>
    </>
  );
}