"use client"

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
} from "recharts"
import { Users, MapPin, Calendar, Heart } from "lucide-react"

const GENDER_COLORS = ["#db2777", "#2563eb"]
const STATUS_COLORS = [
  "#0ea5e9",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
  "#ec4899",
]

interface ChartItem {
  name: string
  value: number
}

interface DemographicChartsProps {
  data: {
    genderData: ChartItem[]
    civilStatusData: ChartItem[]
    ageData: ChartItem[]
    regionData: ChartItem[]
  }
}

export default function DemographicCharts({ data }: DemographicChartsProps) {
  // Inject colors directly into the objects. Pie reads the "fill" property natively!
  const coloredGenderData = data.genderData.map((item, index) => ({
    ...item,
    fill: GENDER_COLORS[index % GENDER_COLORS.length],
  }))

  const coloredCivilStatusData = data.civilStatusData.map((item, index) => ({
    ...item,
    fill: STATUS_COLORS[index % STATUS_COLORS.length],
  }))

  const dynamicRegionHeight = Math.max(180, data.regionData.length * 45)

  return (
    <div className="space-y-8">
      {/* Top Split Charts Row */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Gender Split Card */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex items-center gap-2 pb-4">
            <Users className="h-5 w-5 text-slate-500" />
            <h3 className="font-semibold text-slate-900 dark:text-zinc-50">
              Gender Split
            </h3>
          </div>

          <div className="flex h-[240px] min-h-[240px] w-full items-center justify-center">
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie
                  data={coloredGenderData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={4}
                  dataKey="value"
                ></Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #e2e8f0",
                    borderRadius: "8px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-4 pt-2 text-xs font-medium">
            {data.genderData.map((item, idx) => (
              <div key={item.name} className="flex items-center gap-1.5">
                <span
                  className="h-3 w-3 rounded-full"
                  style={{
                    backgroundColor: GENDER_COLORS[idx % GENDER_COLORS.length],
                  }}
                />
                <span className="text-slate-600 dark:text-zinc-400">
                  {item.name} ({item.value})
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Civil Status Card */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex items-center gap-2 pb-4">
            <Heart className="h-5 w-5 text-slate-500" />
            <h3 className="font-semibold text-slate-900 dark:text-zinc-50">
              Civil Status
            </h3>
          </div>

          <div className="flex h-[240px] min-h-[240px] w-full items-center justify-center">
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie
                  data={coloredCivilStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={4}
                  dataKey="value"
                ></Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #e2e8f0",
                    borderRadius: "8px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap justify-center gap-4 pt-2 text-xs font-medium">
            {data.civilStatusData.map((item, idx) => (
              <div key={item.name} className="flex items-center gap-1.5">
                <span
                  className="h-3 w-3 rounded-full"
                  style={{
                    backgroundColor: STATUS_COLORS[idx % STATUS_COLORS.length],
                  }}
                />
                <span className="text-slate-600 dark:text-zinc-400">
                  {item.name} ({item.value})
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Continuous Distribution Row */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Age Distribution Card */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex items-center gap-2 pb-4">
            <Calendar className="h-5 w-5 text-slate-500" />
            <h3 className="font-semibold text-slate-900 dark:text-zinc-50">
              Age Distribution
            </h3>
          </div>

          <div className="h-[280px] min-h-[280px] w-full">
            <ResponsiveContainer width="100%" height={280}>
              <BarChart
                data={data.ageData}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  className="stroke-slate-100 dark:stroke-zinc-800"
                />
                <XAxis
                  dataKey="name"
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip cursor={{ fill: "#f1f5f9", opacity: 0.5 }} />
                <Bar
                  dataKey="value"
                  fill="#7c3aed"
                  radius={4}
                  maxBarSize={45}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Regional Distribution Card */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex items-center gap-2 pb-4">
            <MapPin className="h-5 w-5 text-slate-500" />
            <h3 className="font-semibold text-slate-900 dark:text-zinc-50">
              Regional Population
            </h3>
          </div>

          <div
            className="w-full transition-all duration-300"
            style={{
              height: `${dynamicRegionHeight}px`,
              minHeight: `${dynamicRegionHeight}px`,
            }}
          >
            <ResponsiveContainer width="100%" height={dynamicRegionHeight}>
              <BarChart
                data={data.regionData}
                layout="vertical"
                margin={{ top: 10, right: 10, left: 30, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  horizontal={false}
                  className="stroke-slate-100 dark:stroke-zinc-800"
                />
                <XAxis
                  type="number"
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  dataKey="name"
                  type="category"
                  stroke="#888888"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                  interval={0}
                  width={160}
                />
                <Tooltip cursor={{ fill: "#f1f5f9", opacity: 0.5 }} />
                <Bar
                  dataKey="value"
                  fill="#0891b2"
                  radius={4}
                  maxBarSize={25}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}
