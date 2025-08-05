import { Badge } from "@/components/ui/badge"

interface StatusBadgeProps {
  status: string
}

const statusVariants = {
  Sent: "bg-green-100 text-green-800 hover:bg-green-100",
  Scheduled: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
  Processing: "bg-blue-100 text-blue-800 hover:bg-blue-100",
  Failed: "bg-red-100 text-red-800 hover:bg-red-100",
  Refunded: "bg-orange-100 text-orange-800 hover:bg-orange-100",
}

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <Badge variant="secondary" className={statusVariants[status as keyof typeof statusVariants]}>
      {status}
    </Badge>
  )
}
