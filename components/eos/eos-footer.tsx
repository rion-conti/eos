import Link from "next/link"

export function EOSFooter() {
  return (
    <footer className="w-full border-t border-slate-200/60 bg-white py-6 text-center text-xs text-slate-400">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 sm:flex-row">
        <span>
          © 2026 Enterprise Onboarding System. Access governed by authorization
          rules.
        </span>
        <div className="flex gap-4">
          <Link href="#" className="hover:text-slate-600">
            Privacy Control
          </Link>
          <Link href="#" className="hover:text-slate-600">
            System Status
          </Link>
        </div>
      </div>
    </footer>
  )
}
