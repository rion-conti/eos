import { ShieldCheck } from "lucide-react"
import Link from "next/link"

export function EOSFooter2() {
  return (
    <footer className="w-full border-t border-slate-200/60 bg-white py-6 text-center text-xs text-slate-400">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 sm:flex-row">
        <span className="flex items-center gap-1">
          <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-teal-600" />
          ISO 27001 Certified & SOC2 Audit Verified Enterprise Operations
          Environment.
        </span>
        <div className="flex gap-4">
          <Link href="#" className="hover:text-slate-600">
            Privacy Control
          </Link>
          <Link href="#" className="hover:text-slate-600">
            Governance Matrix
          </Link>
        </div>
      </div>
    </footer>
  )
}
