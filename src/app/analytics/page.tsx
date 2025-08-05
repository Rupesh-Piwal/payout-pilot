"use client"

import { Calendar, DollarSign, Send, TrendingDown, TrendingUp } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/layout/app-sidebar"
import { PageHeader } from "@/components/layout/page-header"

export default function Analytics() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <PageHeader title="Analytics" />

        <main className="flex flex-1 flex-col gap-6 p-6 bg-gray-50/50">
          <div className="grid gap-6">
            {/* Key Metrics */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card className="bg-white shadow-sm border-0 rounded-2xl">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Monthly Volume</CardTitle>
                  <DollarSign className="size-4 text-blue-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$45,231</div>
                  <p className="text-xs text-green-600 flex items-center gap-1">
                    <TrendingUp className="size-3" />
                    +12.5% from last month
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-white shadow-sm border-0 rounded-2xl">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Success Rate</CardTitle>
                  <TrendingUp className="size-4 text-green-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">98.2%</div>
                  <p className="text-xs text-green-600 flex items-center gap-1">
                    <TrendingUp className="size-3" />
                    +2.1% from last month
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-white shadow-sm border-0 rounded-2xl">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Avg. Processing Time</CardTitle>
                  <Calendar className="size-4 text-orange-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2.4h</div>
                  <p className="text-xs text-red-600 flex items-center gap-1">
                    <TrendingDown className="size-3" />
                    +0.3h from last month
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-white shadow-sm border-0 rounded-2xl">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Total Fees</CardTitle>
                  <Send className="size-4 text-purple-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$234.56</div>
                  <p className="text-xs text-green-600 flex items-center gap-1">
                    <TrendingUp className="size-3" />
                    -5.2% from last month
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Charts Placeholder */}
            <div className="grid gap-6 lg:grid-cols-2">
              <Card className="bg-white shadow-sm border-0 rounded-2xl">
                <CardHeader>
                  <CardTitle>Payout Volume Trend</CardTitle>
                  <CardDescription>Monthly payout volume over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl flex items-center justify-center">
                    <p className="text-muted-foreground">Chart visualization would go here</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-white shadow-sm border-0 rounded-2xl">
                <CardHeader>
                  <CardTitle>Success Rate by Currency</CardTitle>
                  <CardDescription>Payment success rates by currency type</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl flex items-center justify-center">
                    <p className="text-muted-foreground">Chart visualization would go here</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
