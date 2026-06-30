"use client"

import React, { useState } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  CheckCircle2,
  Building2,
  Calendar,
  ShieldCheck,
  CheckCircle,
  Send,
} from "lucide-react"
import { Button } from "@/components/ui/button" // Standard shadcn component
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { EOSHeader } from "@/components/eos/eos-header"

export default function RequestDemoPage() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault()
    // Handle form submission logic here (e.g., API call)
    setIsLoading(true)
    // Simulate backend network latency api response
    await new Promise((resolve) => setTimeout(resolve, 1200))

    setIsLoading(false)
    setIsSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 antialiased">
      <EOSHeader />

      {/* MAIN TWO-COLUMN SPLIT LAYOUT */}
      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
          {/* LEFT SIDE: VALUE PROPS & BRANDING */}
          <div className="space-y-8 lg:col-span-5">
            <div>
              <span className="inline-flex items-center rounded-full bg-teal-100 px-3 py-1 text-xs font-semibold text-teal-800">
                Enterprise Scale
              </span>
              <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                See EOS in action
              </h1>
              <p className="text-md mt-4 leading-relaxed text-slate-600">
                Discover how our Enterprise Onboarding System helps modern teams
                automate workspace access, streamline legal verification, and
                optimize day-one engagement.
              </p>
            </div>

            {/* Quick Benefits Bullet List */}
            <div className="space-y-4 border-t border-slate-200 pt-6">
              <div className="flex items-start space-x-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-teal-600" />
                <div>
                  <h4 className="text-sm font-semibold text-slate-900">
                    Customized Live Deep-Dive
                  </h4>
                  <p className="text-xs text-slate-500">
                    A personalized 30-minute overview mapping EOS to your custom
                    workflow gaps.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Building2 className="mt-0.5 h-5 w-5 shrink-0 text-teal-600" />
                <div>
                  <h4 className="text-sm font-semibold text-slate-900">
                    Architecture Review
                  </h4>
                  <p className="text-xs text-slate-500">
                    Learn how our platform scales alongside native HRIS software
                    platforms safely.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-teal-600" />
                <div>
                  <h4 className="text-sm font-semibold text-slate-900">
                    Compliance & Security Audit
                  </h4>
                  <p className="text-xs text-slate-500">
                    Explore built-in configurations keeping document vaults
                    completely secure.
                  </p>
                </div>
              </div>
            </div>

            {/* Social Proof Metric Callout */}
            <div className="rounded-xl bg-linear-to-br from-teal-600 to-emerald-950 p-6 text-white shadow-md">
              <p className="text-sm font-medium text-teal-100 italic">
                &quot;EOS completely flipped our workspace onboarding execution.
                What used to demand 12 separate tool touchpoints takes our
                regional leads under 5 minutes now.&quot;
              </p>
              <div className="mt-4 flex items-center space-x-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-400/30 text-xs font-bold text-teal-200">
                  VP
                </div>
                <div>
                  <div className="text-xs font-bold text-white">
                    Victoria Park
                  </div>
                  <div className="text-[10px] text-teal-200">
                    Director of People Ops, Globex Inc.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: SHADCN INTERACTIVE FORM CONTAINER */}
          <div className="lg:col-span-7">
            <Card className="border-slate-200 bg-white shadow-xl">
              <CardHeader className="space-y-1">
                <CardTitle className="text-xl font-bold">
                  Request a Tailored Demo
                </CardTitle>
                <CardDescription>
                  Fill out your corporate details and our solutions architect
                  will reach out within 1 business hour.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {!isSubmitted ? (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Dual Row Name Elements */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="space-y-1.5">
                        <label
                          className="text-xs font-semibold text-slate-700"
                          htmlFor="firstName"
                        >
                          First Name
                        </label>
                        <input
                          required
                          className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:border-teal-500 focus:ring-1 focus:ring-teal-500 focus:outline-none"
                          id="firstName"
                          type="text"
                          placeholder="John"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label
                          className="text-xs font-semibold text-slate-700"
                          htmlFor="lastName"
                        >
                          Last Name
                        </label>
                        <input
                          required
                          className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:border-teal-500 focus:ring-1 focus:ring-teal-500 focus:outline-none"
                          id="lastName"
                          type="text"
                          placeholder="Doe"
                        />
                      </div>
                    </div>

                    {/* Business Email */}
                    <div className="space-y-1.5">
                      <label
                        className="text-xs font-semibold text-slate-700"
                        htmlFor="email"
                      >
                        Work Email
                      </label>
                      <input
                        required
                        className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:border-teal-500 focus:ring-1 focus:ring-teal-500 focus:outline-none"
                        id="email"
                        type="email"
                        placeholder="johndoe@enterprise.com"
                      />
                    </div>

                    {/* Company Name & Team Size */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="space-y-1.5">
                        <label
                          className="text-xs font-semibold text-slate-700"
                          htmlFor="company"
                        >
                          Company Name
                        </label>
                        <input
                          required
                          className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:border-teal-500 focus:ring-1 focus:ring-teal-500 focus:outline-none"
                          id="company"
                          type="text"
                          placeholder="Acme Inc."
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label
                          className="text-xs font-semibold text-slate-700"
                          htmlFor="companySize"
                        >
                          Expected Monthly Hires
                        </label>
                        <select
                          className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:border-teal-500 focus:ring-1 focus:ring-teal-500 focus:outline-none"
                          id="companySize"
                        >
                          <option value="1-10">1 - 25 new hires</option>
                          <option value="26-100">26 - 100 new hires</option>
                          <option value="101-500">101 - 500 new hires</option>
                          <option value="500+">500+ global scale</option>
                        </select>
                      </div>
                    </div>

                    {/* Additional Notes */}
                    <div className="space-y-1.5">
                      <label
                        className="text-xs font-semibold text-slate-700"
                        htmlFor="notes"
                      >
                        Specific Workflow Requirements (Optional)
                      </label>
                      <textarea
                        className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:border-teal-500 focus:ring-1 focus:ring-teal-500 focus:outline-none"
                        id="notes"
                        rows={3}
                        placeholder="Tell us about your current tools (e.g., Workday, Slack, Jira) or primary onboarding bottlenecks..."
                      />
                    </div>

                    {/* Submit Button with Gradient Design Block */}
                    {/* <Button
                      type="submit"
                      className="w-full mt-2 bg-gradient-to-r from-teal-600 to-emerald-800 text-white font-medium py-2.5 rounded-md shadow-md hover:from-teal-700 hover:to-emerald-900 transition-all flex items-center justify-center space-x-2"
                    >
                      <Calendar className="h-4 w-4" />
                      <span>Book My Solutions Demo</span>
                    </Button> */}
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-linear-to-r from-teal-600 to-emerald-800 py-6 font-semibold text-white shadow-md transition-all hover:from-teal-700 hover:to-emerald-900 disabled:opacity-50"
                    >
                      {isLoading
                        ? "Processing Request..."
                        : "Schedule My Strategy Session"}
                      {!isLoading && <Send className="ml-2 h-4 w-4" />}
                    </Button>

                    <p className="mt-2 text-center text-[10px] text-slate-400">
                      By submitting, you agree to receive communications
                      regarding EOS services. Privacy settings can be updated
                      any time.
                    </p>
                  </form>
                ) : (
                  /* SUCCESS STATE SCREEN BLOCK */
                  <Card className="animate-in border-slate-200 bg-white p-8 text-center shadow-xl transition-all duration-300 zoom-in-95 fade-in">
                    <CardContent className="space-y-6 pt-6">
                      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-teal-50 text-teal-600 ring-8 ring-teal-50/50">
                        <CheckCircle className="h-10 w-10" />
                      </div>

                      <div className="space-y-3">
                        <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                          Demo Request Received!
                        </h2>
                        <p className="mx-auto max-w-md text-base leading-relaxed text-slate-600">
                          Thank you for reaching out. We have sent a calendar
                          scheduling confirmation link directly to your work
                          inbox.
                        </p>
                      </div>

                      <div className="flex flex-col items-center justify-center gap-4 border-t border-slate-100 pt-4 sm:flex-row">
                        <div className="inline-flex items-center rounded-md bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-500">
                          <Calendar className="mr-1.5 h-3.5 w-3.5 text-teal-600" />
                          Link expires in 48 hours
                        </div>
                        <Link href="/eos">
                          <Button
                            variant="outline"
                            className="text-slate-700 hover:bg-slate-50"
                          >
                            Return to Main Page
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
