"use client"

import { useState } from "react"
import Link from "next/link"
import { Check, HelpCircle, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { EOSHeader } from "@/components/eos/eos-header"

export default function PricingPage() {
  // Billing cycle toggle state
  const [isAnnual, setIsAnnual] = useState(true)

  const pricingTiers = [
    {
      name: "Growth",
      priceMonthly: 499,
      priceAnnualMonthly: 399,
      description:
        "Perfect for scaling organizations looking to formalize and automate their day-one workflows.",
      features: [
        "Up to 250 active onboardings / year",
        "Standard automated pipelines",
        "Basic document locker & signature engine",
        "Email & chat support (24hr response)",
        "Standard HRIS directory sync integrations",
      ],
      ctaText: "Start Growth Tier",
      popular: false,
    },
    {
      name: "Scale",
      priceMonthly: 1249,
      priceAnnualMonthly: 999,
      description:
        "Optimized for cross-department mid-market teams managing high-volume, continuous workforce scaling.",
      features: [
        "Up to 1,500 active onboardings / year",
        "Advanced conditional pipeline paths",
        "Role-based cross-department workspaces",
        "Real-time velocity metrics & reports",
        "Priority support (4hr SLA window)",
        "Custom hardware asset delivery logs",
        "SOC2 compliance package modules",
      ],
      ctaText: "Get Scale Package",
      popular: true,
    },
    {
      name: "Enterprise",
      priceMonthly: null, // Custom quote
      priceAnnualMonthly: null,
      description:
        "Customized architecture and governance configurations built explicitly for massive global conglomerates.",
      features: [
        "Unlimited active onboardings",
        "Full zero-trust IT compliance layer",
        "Dedicated implementation engineering squad",
        "AI-powered custom training assistant",
        "24/7/365 continuous live phone support",
        "Custom database hosting perimeter ops",
        "Global localized multilingual systems",
      ],
      ctaText: "Contact Enterprise Sales",
      popular: false,
    },
  ]

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 antialiased selection:bg-teal-500 selection:text-white">
      <EOSHeader />

      {/* HEADER BANNER */}
      <section className="bg-linear-to-br from-teal-600 via-teal-800 to-emerald-950 py-20 text-center text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <span className="inline-flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-semibold text-teal-300 ring-1 ring-teal-400/20 ring-inset">
            Transparent Scaling Models
          </span>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
            Predictable packaging for any scale
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-teal-100/80">
            Choose a deployment level built to handle your dynamic workforce
            management needs. Save up to 20% on our annual plans.
          </p>

          {/* BILLING CYCLE TOGGLE primitive */}
          <div className="mt-10 flex items-center justify-center space-x-4">
            <span
              className={`text-sm font-medium ${!isAnnual ? "text-white" : "text-teal-200/60"}`}
            >
              Monthly Billing
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className="relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-teal-950 transition-colors duration-200 ease-in-out focus:ring-2 focus:ring-teal-400 focus:ring-offset-2 focus:ring-offset-teal-800 focus:outline-none"
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-teal-400 shadow ring-0 transition duration-200 ease-in-out ${isAnnual ? "translate-x-5" : "translate-x-0"}`}
              />
            </button>
            <span
              className={`inline-flex items-center gap-1.5 text-sm font-medium ${isAnnual ? "text-white" : "text-teal-200/60"}`}
            >
              Annual Billing
              <span className="rounded-full bg-teal-400/20 px-2 py-0.5 text-xs font-bold text-teal-300">
                Save 20%
              </span>
            </span>
          </div>
        </div>
      </section>

      {/* 4. PRICING ARCHITECTURE GRID */}
      <main className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-3 lg:items-stretch">
          {pricingTiers.map((tier, idx) => {
            const currentPrice = isAnnual
              ? tier.priceAnnualMonthly
              : tier.priceMonthly

            return (
              <Card
                key={idx}
                className={`relative flex flex-col justify-between border-slate-200 bg-white transition-all duration-200 ${
                  tier.popular
                    ? "z-10 shadow-xl ring-2 ring-teal-600 lg:scale-105"
                    : "hover:shadow-md"
                }`}
              >
                {tier.popular && (
                  <span className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-linear-to-r from-teal-600 to-emerald-800 px-4 py-1 text-xs font-bold tracking-wide text-white uppercase shadow-sm">
                    Most Popular Choice
                  </span>
                )}

                <div>
                  <CardHeader className="pt-8">
                    <CardTitle className="text-2xl font-bold tracking-tight text-slate-900">
                      {tier.name}
                    </CardTitle>
                    <CardDescription className="mt-2 min-h-[40px] text-sm text-slate-500">
                      {tier.description}
                    </CardDescription>

                    {/* Dynamic Price Display Render */}
                    <div className="mt-6 flex items-baseline text-slate-900">
                      {currentPrice !== null ? (
                        <>
                          <span className="text-4xl font-extrabold tracking-tight">
                            ${currentPrice}
                          </span>
                          <span className="ml-1 text-sm font-semibold text-slate-500">
                            /user/mo
                          </span>
                        </>
                      ) : (
                        <span className="text-4xl font-extrabold tracking-tight">
                          Custom Plan
                        </span>
                      )}
                    </div>
                    {currentPrice !== null && isAnnual && (
                      <span className="mt-1 block text-xs font-semibold text-emerald-600">
                        Billed annually (${currentPrice * 12}/yr)
                      </span>
                    )}
                  </CardHeader>

                  <CardContent className="pb-8">
                    <ul className="space-y-4 border-t border-slate-100 pt-6">
                      {tier.features.map((feature, fIdx) => (
                        <li
                          key={fIdx}
                          className="flex items-start space-x-3 text-sm text-slate-600"
                        >
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-teal-600" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </div>

                <CardFooter className="pb-8">
                  <Link href="/eos/request-demo" className="w-full">
                    <Button
                      className={`w-full py-6 font-semibold transition-all ${
                        tier.popular
                          ? "bg-linear-to-r from-teal-600 to-emerald-800 text-white shadow-md hover:from-teal-700 hover:to-emerald-900"
                          : "bg-slate-900 text-white hover:bg-slate-800"
                      }`}
                    >
                      {tier.ctaText}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            )
          })}
        </div>

        {/* MINIMAL FAQS SUB-CONTAINER */}
        <div className="mx-auto mt-24 max-w-3xl border-t border-slate-200 pt-16">
          <h2 className="mb-10 text-center text-2xl font-bold tracking-tight text-slate-900">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <div>
              <h4 className="flex items-center gap-2 font-semibold text-slate-900">
                <HelpCircle className="h-4 w-4 text-teal-600" />
                How are active onboardings calculated?
              </h4>
              <p className="mt-2 pl-6 text-sm text-slate-600">
                An active onboarding is generated whenever an initialization
                pipeline is triggered for an incoming employee. Completed tracks
                remain archived in your database permanently with zero extra
                charges.
              </p>
            </div>
            <div>
              <h4 className="flex items-center gap-2 font-semibold text-slate-900">
                <HelpCircle className="h-4 w-4 text-teal-600" />
                Can we change plans or cancel at any time?
              </h4>
              <p className="mt-2 pl-6 text-sm text-slate-600">
                Yes, monthly plans can be canceled or downgraded at any
                interval. Annual plans guarantee fixed seats at preferential
                rates and transition at the final cycle end point.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
