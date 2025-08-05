import { Calendar, History, Send, TrendingUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface HistoryStatsProps {
  totalTransactions: number
  totalVolume: number
  totalFees: number
  successRate: number
}

export function HistoryStats({ totalTransactions, totalVolume, totalFees, successRate }: HistoryStatsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-4">
      <Card className="bg-white shadow-sm border-0 rounded-2xl">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">Total Transactions</CardTitle>
          <History className="size-4 text-blue-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalTransactions}</div>
          <p className="text-xs text-muted-foreground">All time</p>
        </CardContent>
      </Card>
      <Card className="bg-white shadow-sm border-0 rounded-2xl">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">Total Volume</CardTitle>
          <TrendingUp className="size-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${totalVolume.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">Successfully sent</p>
        </CardContent>
      </Card>
      <Card className="bg-white shadow-sm border-0 rounded-2xl">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">Total Fees</CardTitle>
          <Calendar className="size-4 text-orange-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${totalFees.toFixed(2)}</div>
          <p className="text-xs text-muted-foreground">Transaction fees</p>
        </CardContent>
      </Card>
      <Card className="bg-white shadow-sm border-0 rounded-2xl">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">Success Rate</CardTitle>
          <Send className="size-4 text-purple-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{successRate}%</div>
          <p className="text-xs text-muted-foreground">Successful payouts</p>
        </CardContent>
      </Card>
    </div>
  )
}
