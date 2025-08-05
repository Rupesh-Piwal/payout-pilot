import { Calendar, DollarSign, Send, TrendingUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface StatsCardsProps {
  stats: {
    totalVolume: number
    thisMonth: number
    growth: number
    totalScheduled: number
    pending: number
  }
}

export function StatsCards({ stats }: StatsCardsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="bg-white shadow-sm border-0 rounded-2xl">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">Total Volume</CardTitle>
          <DollarSign className="size-4 text-blue-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${stats.totalVolume.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">All time</p>
        </CardContent>
      </Card>
      <Card className="bg-white shadow-sm border-0 rounded-2xl">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">This Month</CardTitle>
          <TrendingUp className="size-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${stats.thisMonth.toLocaleString()}</div>
          <p className="text-xs text-green-600">+{stats.growth}% from last month</p>
        </CardContent>
      </Card>
      <Card className="bg-white shadow-sm border-0 rounded-2xl">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">Scheduled</CardTitle>
          <Calendar className="size-4 text-yellow-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalScheduled}</div>
          <p className="text-xs text-muted-foreground">Active payouts</p>
        </CardContent>
      </Card>
      <Card className="bg-white shadow-sm border-0 rounded-2xl">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">Pending</CardTitle>
          <Send className="size-4 text-orange-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.pending}</div>
          <p className="text-xs text-muted-foreground">Awaiting processing</p>
        </CardContent>
      </Card>
    </div>
  )
}
