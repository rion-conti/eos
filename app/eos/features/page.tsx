"use client"

import Link from "next/link"
import {
  Zap,
  Users,
  BarChart3,
  ShieldCheck,
  Layers,
  Cpu,
  ArrowRight,
  CheckCircle2,
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

export default function FeaturesPage() {
  // Array holding the core modular features of the enterprise system
  const detailedFeatures = [
    {
      icon: <Zap className="h-6 w-6 text-teal-600" />,
      title: "Automated Orchestration Pipelines",
      description:
        "Trigger completely custom onboarding tracks based on an employee's role, department, seniority level, or geographic location instantly.",
      benefits: [
        "Conditional workflow logic",
        "Automated manager reminders",
        "Custom task assignments",
      ],
    },
    {
      icon: <Users className="h-6 w-6 text-teal-600" />,
      title: "Centralized Identity & Directory Hub",
      description:
        "Consolidate vital background checks, strictly managed ID verifications, contract signs, and visual company charts into one unified workspace.",
      benefits: [
        "I-9 and W-4 automation",
        "Secure document locker",
        "Native HRIS sync sync engine",
      ],
    },
    {
      icon: <BarChart3 className="h-6 w-6 text-teal-600" />,
      title: "Velocity Analytics Dashboards",
      description:
        "Expose bottlenecks immediately. Keep watch over exactly where applications stack up, monitor training velocity, and optimize cross-team efforts.",
      benefits: [
        "Time-to-productivity logs",
        "Department efficiency ranking",
        "Automated CSV/PDF exports",
      ],
    },
    {
      icon: <ShieldCheck className="h-6 w-6 text-teal-600" />,
      title: "Enterprise-Grade IT Compliance",
      description:
        "Enforce ironclad zero-trust security standards throughout the entire employee entry lifecycle. Auto-provision hardware and app permissions safely.",
      benefits: [
        "SOC2 and GDPR ready modules",
        "Automated software provisioning",
        "Hardware asset delivery tracking",
      ],
    },
    {
      icon: <Layers className="h-6 w-6 text-teal-600" />,
      title: "Cross-Department Workspaces",
      description:
        "Break down walls between Human Resources, Information Technology, and Operations teams. Allow distinct handoffs within a secure perimeter.",
      benefits: [
        "Role-based access controls",
        "Internal ticketing integration",
        "Inter-department notification loops",
      ],
    },
    {
      icon: <Cpu className="h-6 w-6 text-teal-600" />,
      title: "AI-Powered Training Assistant",
      description:
        "Empower incoming team members to find answers to complex workspace questions natively without constantly messaging system administrators.",
      benefits: [
        "Dynamic handbook indexing",
        "Personalized daily target plans",
        "Automated FAQ matching",
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 antialiased selection:bg-teal-500 selection:text-white">
      <EOSHeader />

      {/* CORE HEADER BANNER */}
      <section className="bg-linear-to-br from-teal-600 via-teal-800 to-emerald-950 py-20 text-white">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <span className="inline-flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-semibold text-teal-300 ring-1 ring-teal-400/20 ring-inset">
            Deep Product Overview
          </span>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
            Built to scale your enterprise ecosystem
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-teal-100/80">
            Engineered to remove structural friction from high-volume corporate
            onboarding. Explore the modular feature components powering modern
            workforces.
          </p>
        </div>
      </section>

      {/* MODULAR GRID ARCHITECTURE */}
      <main className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {detailedFeatures.map((feature, idx) => (
            <Card
              key={idx}
              className="flex flex-col justify-between border-slate-200 bg-white transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
            >
              <div>
                <CardHeader>
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50 shadow-inner ring-1 ring-teal-500/10">
                    {feature.icon}
                  </div>
                  <CardTitle className="mt-4 text-xl font-bold tracking-tight text-slate-900">
                    {feature.title}
                  </CardTitle>
                  <CardDescription className="pt-1 text-sm leading-relaxed text-slate-500">
                    {feature.description}
                  </CardDescription>
                </CardHeader>

                {/* Micro checklist elements */}
                <CardContent className="pb-8">
                  <ul className="space-y-2.5 border-t border-slate-100 pt-4 text-sm text-slate-600">
                    {feature.benefits.map((benefit, bIdx) => (
                      <li key={bIdx} className="flex items-center space-x-2">
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
                        <span className="truncate">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>

        {/* CONVERSATIONAL CLOSING HERO CALLOUT */}
        <div className="mt-20 rounded-2xl bg-linear-to-br from-slate-900 to-slate-950 p-8 text-white shadow-xl md:p-12">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-xl">
              <h3 className="text-2xl font-bold tracking-tight">
                Ready to see these features live?
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">
                Schedule a customized strategy walkthrough with our engineering
                specialists. We will build out a proof-of-concept pipeline
                matching your current operational tooling parameters.
              </p>
            </div>
            <div className="shrink-0">
              <Link href="/eos/request-demo">
                <Button
                  size="lg"
                  className="w-full bg-linear-to-r from-teal-600 to-emerald-800 text-white shadow-md hover:from-teal-700 hover:to-emerald-900 sm:w-auto"
                >
                  Book Custom Demo
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
