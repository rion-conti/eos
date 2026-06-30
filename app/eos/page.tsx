import Link from "next/link"
import { ArrowRight, Zap, BarChart3, Users } from "lucide-react"
import { Button } from "@/components/ui/button" // Standard shadcn component
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card" // Standard shadcn component

export default function EOSLandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 antialiased selection:bg-teal-500 selection:text-white">
      {/* 1. NAVIGATION BAR */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo with Gradient Clip */}
          <div className="flex items-center space-x-2">
            <span className="bg-linear-to-br from-teal-500 to-emerald-900 bg-clip-text text-2xl font-extrabold tracking-tight text-transparent">
              <Link href="/eos">EOS</Link>
            </span>
            <span className="hidden text-xs font-semibold tracking-wider text-slate-400 uppercase sm:block">
              Enterprise Onboarding System
            </span>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden space-x-8 text-sm font-medium text-slate-600 md:flex">
            <Link
              href="/eos/features"
              className="transition-colors hover:text-teal-600"
            >
              Features
            </Link>
            <Link
              href="/eos/solutions"
              className="transition-colors hover:text-teal-600"
            >
              Solutions
            </Link>
            <Link
              href="/eos/pricing"
              className="transition-colors hover:text-teal-600"
            >
              Pricing
            </Link>
          </nav>

          {/* Call to Actions */}
          <div className="flex items-center space-x-4">
            <Link href="/eos/signin">
              <Button
                variant="ghost"
                className="text-sm font-medium text-slate-600 hover:text-slate-900"
              >
                Sign in
              </Button>
            </Link>
            <Link href="/eos/request-demo">
              <Button className="bg-linear-to-r from-teal-600 to-emerald-800 text-white shadow-md hover:from-teal-700 hover:to-emerald-900">
                Request Demo
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* 2. HERO SECTION */}
      <section className="relative overflow-hidden bg-linear-to-br from-teal-600 via-teal-800 to-emerald-950 py-24 text-white sm:py-32">
        {/* Subtle Decorative Background Shapes */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(20,184,166,0.15),transparent_45%)]" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            {/* Left Content Column */}
            <div className="max-w-2xl lg:col-span-7">
              <span className="inline-flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-semibold text-teal-300 ring-1 ring-teal-400/20 ring-inset">
                Next-Gen Workforce Orchestration
              </span>
              <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
                Welcome to the Future of Enterprise Onboarding
              </h1>
              <p className="mt-6 text-lg leading-8 text-teal-100/90">
                Automate compliance workflows, sync secure hardware deployment,
                and build cohesive day-one experiences for global scales. Reduce
                time-to-productivity by up to 60%.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link href="/eos/signup">
                  <Button
                    size="lg"
                    className="bg-white text-teal-900 shadow-xl hover:bg-slate-100"
                  >
                    Get Started Free
                    <ArrowRight className="ml-2 h-4 w-4 text-teal-700" />
                  </Button>
                </Link>
                <Link href="/eos/tour">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-teal-400/40 text-teal-900 hover:bg-teal-700/50"
                  >
                    Watch Product Tour
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Abstract Visual Column */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-sm">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex space-x-1.5">
                    <div className="h-3 w-3 rounded-full bg-red-500/60" />
                    <div className="h-3 w-3 rounded-full bg-yellow-500/60" />
                    <div className="h-3 w-3 rounded-full bg-green-500/60" />
                  </div>
                  <div className="text-xs font-medium text-teal-300">
                    EOS Analytics Dashboard
                  </div>
                </div>
                {/* Simulated Chart/Metrics Minimal Elements */}
                <div className="mt-6 space-y-4">
                  <div className="h-8 w-3/4 animate-pulse rounded bg-white/10" />
                  <div className="h-24 rounded border border-teal-500/30 bg-linear-to-r from-teal-500/20 to-emerald-500/10 p-4">
                    <div className="text-xs font-bold tracking-wider text-teal-300 uppercase">
                      Active Onboardings
                    </div>
                    <div className="mt-1 text-2xl font-black">
                      1,482 New Hires
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="h-16 rounded border border-white/5 bg-white/5 p-3">
                      <div className="text-[10px] text-slate-400">
                        Compliance Rate
                      </div>
                      <div className="text-md font-bold text-emerald-400">
                        99.4%
                      </div>
                    </div>
                    <div className="h-16 rounded border border-white/5 bg-white/5 p-3">
                      <div className="text-[10px] text-slate-400">
                        Avg. Time-to-Done
                      </div>
                      <div className="text-md font-bold text-teal-400">
                        4.2 Days
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SOCIAL PROOF BANNER */}
      <section className="border-b border-slate-200 bg-white py-12">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-xs font-semibold tracking-widest text-slate-400 uppercase">
            Trusted by fast-growing global enterprises
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-x-12 gap-y-6 text-xl font-bold tracking-tight text-slate-300">
            <span className="transition-colors hover:text-slate-400">
              ACME CORP
            </span>
            <span className="transition-colors hover:text-slate-400">
              GLOBEX
            </span>
            <span className="transition-colors hover:text-slate-400">
              INITECH
            </span>
            <span className="transition-colors hover:text-slate-400">
              UMBRELLA
            </span>
          </div>
        </div>
      </section>

      {/* 4. VALUE PROPOSITION / FEATURES */}
      <section id="features" className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-base font-semibold tracking-wider text-teal-600 uppercase">
              Enterprise Grade Architecture
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Everything you need to orchestrate day one
            </p>
          </div>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* Feature 1 */}
            <Card className="transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
              <CardHeader>
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-teal-100 text-teal-700">
                  <Zap className="h-5 w-5" />
                </div>
                <CardTitle className="mt-4">Automated Workflows</CardTitle>
                <CardDescription>
                  Build dynamic pipelines that trigger tasks, legal signing, and
                  access tokens depending on role, location, and seniority.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Feature 2 */}
            <Card className="transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
              <CardHeader>
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-teal-100 text-teal-700">
                  <Users className="h-5 w-5" />
                </div>
                <CardTitle className="mt-4">
                  Centralized Directory Hub
                </CardTitle>
                <CardDescription>
                  Consolidate documentation, strict ID checks, background
                  screens, and dynamic organizational charts into one system.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Feature 3 */}
            <Card className="transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
              <CardHeader>
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-teal-100 text-teal-700">
                  <BarChart3 className="h-5 w-5" />
                </div>
                <CardTitle className="mt-4">Real-Time Metrics</CardTitle>
                <CardDescription>
                  Track exactly where bottle-necks form. Uncover metrics
                  tracking pipeline velocities, manager blockers, and device
                  provisioning updates.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* 5. DEEP FOOTER */}
      <footer className="border-t border-slate-800 bg-slate-900 py-12 text-slate-400">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 sm:flex-row sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2"></div>
        </div>{" "}
      </footer>
    </div>
  )
}
