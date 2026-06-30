import { Suspense } from "react";
import CustomerSection from "@/components/excel/customer-section";
import H1 from "@/components/H1";

export default async function ExportPage() {
  return (
    <main className="p-8">
      <H1>Customer Management</H1>

      <Suspense fallback={<div className="mt-5">Loading export button...</div>}>
        <CustomerSection />
      </Suspense>
    </main>
  );
}
