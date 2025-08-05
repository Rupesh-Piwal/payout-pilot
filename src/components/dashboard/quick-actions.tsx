"use client"

import { useRouter } from "next/navigation"
import { History, Plus, TrendingUp } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function QuickActions() {
  const router = useRouter()

  const actions = [
    {
      title: "Schedule New Payout",
      description: "Create a new payment schedule",
      icon: Plus,
      gradient: "from-blue-500 to-purple-600",
      onClick: () => router.push("/schedule"),
    },
    {
      title: "View History",
      description: "Browse past transactions",
      icon: History,
      gradient: "from-green-500 to-emerald-600",
      onClick: () => router.push("/history"),
    },
    {
      title: "Analytics",
      description: "View detailed reports",
      icon: TrendingUp,
      gradient: "from-orange-500 to-red-600",
      onClick: () => router.push("/analytics"),
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {actions.map((action) => (
        <Card
          key={action.title}
          className={`bg-gradient-to-br ${action.gradient} text-white shadow-sm border-0 rounded-2xl cursor-pointer hover:shadow-lg transition-shadow`}
          onClick={action.onClick}
        >
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/20 rounded-xl">
                <action.icon className="size-6" />
              </div>
              <div>
                <h3 className="font-semibold">{action.title}</h3>
                <p className="text-sm opacity-90">{action.description}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
