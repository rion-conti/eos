"use client"

import Link from "next/link"
import {
  Building2,
  Globe2,
  ShieldAlert,
  ArrowRight,
  Cpu,
  Network,
  FileCheck,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { EOSHeader } from "@/components/eos/eos-header"

export default function SolutionsPage() {
  const corporateSolutions = [
    {
      icon: <Building2 className="h-6 w-6 text-teal-600" />,
      title: "Hyper-Growth & Enterprise Scale",
      subtitle: "For high-volume corporate expansion",
      description:
        "Standardize onboarding tracks across sprawling structural entities. Automate departmental handoffs between HR, IT provisioning squads, and division managers with centralized visibility.",
      capabilities: [
        "Cross-subsidiary workforce segregation",
        "Automated multi-tier approval gates",
        "Custom HRIS enterprise integrations",
      ],
    },
    {
      icon: <Globe2 className="h-6 w-6 text-teal-600" />,
      title: "Distributed & Remote Workforces",
      subtitle: "For globally decentralized environments",
      description:
        "Bridge the distance gap for incoming global talent. Securely orchestrate automated localization protocols, handle legal document signatures, and track hardware deliveries seamlessly.",
      capabilities: [
        "Localized compliance document sets",
        "Hardware deployment delivery sync",
        "Asynchronous task tracking models",
      ],
    },
    {
      icon: <ShieldAlert className="h-6 w-6 text-teal-600" />,
      title: "High-Compliance Industries",
      subtitle: "For Finance, Health, and Tech sectors",
      description:
        "Enforce zero-trust security postures throughout the entire workforce entry lifecycle. Build ironclad audit logs for background screenings, security training modules, and systems access logs.",
      capabilities: [
        "SOC2 / GDPR compliant tracking hubs",
        "Automated access token provisioning",
        "Immutable compliance history logs",
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 antialiased selection:bg-teal-500 selection:text-white">
      <EOSHeader />

      {/* CORE BANNER HERO */}
      <section className="bg-linear-to-br from-teal-600 via-teal-800 to-emerald-950 py-20 text-center text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <span className="inline-flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-semibold text-teal-300 ring-1 ring-teal-400/20 ring-inset">
            Industry Ecosystems
          </span>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
            Tailored layouts for complex structures
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-teal-100/80">
            Discover how the Enterprise Onboarding System (EOS) adapts to the
            distinct scale and regulatory demands of your specific operating
            environment.
          </p>
        </div>
      </section>

      {/* SOLUTIONS DISPLAY ARCHITECTURE */}
      <main className="mx-auto max-w-7xl space-y-24 px-4 py-20 sm:px-6 lg:px-8">
        {/* VERTICAL SECTOR CARD GRID */}
        <div className="grid gap-8 lg:grid-cols-3">
          {corporateSolutions.map((sol, index) => (
            <Card
              key={index}
              className="flex flex-col justify-between border-slate-200 bg-white shadow-sm transition-all hover:shadow-md"
            >
              <CardHeader>
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50 shadow-inner ring-1 ring-teal-500/10">
                  {sol.icon}
                </div>
                <CardTitle className="mt-4 text-xl font-bold tracking-tight text-slate-900">
                  {sol.title}
                </CardTitle>
                <CardDescription className="text-xs font-semibold tracking-wider text-teal-600 uppercase">
                  {sol.subtitle}
                </CardDescription>
                <p className="pt-3 text-sm leading-relaxed text-slate-500">
                  {sol.description}
                </p>
              </CardHeader>

              <CardContent className="pb-8">
                <div className="border-t border-slate-100 pt-4">
                  <h4 className="mb-3 text-xs font-bold tracking-wider text-slate-400 uppercase">
                    Key Focus Areas
                  </h4>
                  <ul className="space-y-2 text-sm text-slate-600">
                    {sol.capabilities.map((cap, cIndex) => (
                      <li key={cIndex} className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-600" />
                        <span className="truncate">{cap}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* THE CORE CROSS-FUNCTIONAL VALUE METRIC BLOCK */}
        <div className="border-t border-slate-200 pt-16">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">
              Unifying your departments under one engine
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              EOS dissolves operational bottlenecks across three fundamental
              enterprise centers.
            </p>
          </div>

          <div className="grid gap-8 text-center md:grid-cols-3">
            <div className="space-y-2 p-4">
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-lg bg-teal-100 text-teal-700">
                <Network className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-slate-900">
                Information Technology
              </h3>
              <p className="text-xs leading-relaxed text-slate-500">
                Auto-provision secure identity parameters and configure cloud
                directory memberships on day zero.
              </p>
            </div>
            <div className="space-y-2 p-4">
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-lg bg-teal-100 text-teal-700">
                <FileCheck className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-slate-900">People Operations</h3>
              <p className="text-xs leading-relaxed text-slate-500">
                Maintain constant compliance velocity, track legal signatures,
                and foster clear onboarding engagement tracks.
              </p>
            </div>
            <div className="space-y-2 p-4">
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-lg bg-teal-100 text-teal-700">
                <Cpu className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-slate-900">Team Managers</h3>
              <p className="text-xs leading-relaxed text-slate-500">
                Expose instant milestone metrics and guide local workspace
                tracking transparently to optimize training.
              </p>
            </div>
          </div>
        </div>

        {/* CONVERSATIONAL CLOSING HERO BOX */}
        <div className="rounded-2xl bg-linear-to-br from-slate-900 to-slate-950 p-8 text-white shadow-xl md:p-12">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-xl">
              <h3 className="text-2xl font-bold tracking-tight">
                Need a custom blueprint buildout?
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">
                Connect with our systems architects. We will evaluate your
                current technology stack and design a tailored proof-of-concept
                pipeline blueprint matching your governance matrix.
              </p>
            </div>
            <div className="shrink-0">
              <Link href="/eos/request-demo">
                <Button
                  size="lg"
                  className="w-full bg-linear-to-r from-teal-600 to-emerald-800 text-white shadow-md hover:from-teal-700 hover:to-emerald-900 sm:w-auto"
                >
                  Request Solution Design
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
