import { ChevronLeft } from "lucide-react"
import Link from "next/link"

export function EOSHeader() {
  return (
    <header className="w-full border-b border-slate-200/80 bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center px-4 sm:px-6 lg:px-8">
        <Link
          href="/eos"
          className="inline-flex items-center text-sm font-medium text-slate-500 transition-colors hover:text-teal-600"
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back to Home
        </Link>
        <div className="ml-auto flex items-center space-x-2">
          <span className="bg-linear-to-br from-teal-500 to-emerald-900 bg-clip-text text-xl font-extrabold tracking-tight text-transparent">
            <Link href="/eos">EOS</Link>
          </span>
        </div>
      </div>
    </header>
  )
}
