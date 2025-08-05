"use client"

import { Mail, MoreHorizontal, Send } from "lucide-react"
import { toast } from "sonner"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface Recipient {
  id: number
  name: string
  email: string
  wallet: string
  totalPayouts: number
  totalAmount: number
  lastPayout: string
  status: string
}

interface RecipientCardProps {
  recipient: Recipient
}

export function RecipientCard({ recipient }: RecipientCardProps) {
  const handleSendEmail = () => {
    toast.success("Email Sent", {
      description: `Email sent to ${recipient.name} successfully.`,
    })
  }

  return (
    <Card className="bg-white shadow-sm border-0 rounded-2xl">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="size-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-lg">
              {recipient.name.charAt(0)}
            </div>
            <div>
              <CardTitle className="text-lg">{recipient.name}</CardTitle>
              <CardDescription>{recipient.email}</CardDescription>
            </div>
          </div>
          <Badge variant={recipient.status === "Active" ? "default" : "secondary"}>{recipient.status}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground">Total Payouts</p>
            <p className="font-semibold">{recipient.totalPayouts}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Total Amount</p>
            <p className="font-semibold">${recipient.totalAmount.toLocaleString()}</p>
          </div>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Last Payout</p>
          <p className="font-semibold">{new Date(recipient.lastPayout).toLocaleDateString()}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Wallet Address</p>
          <p className="font-mono text-xs bg-gray-100 p-2 rounded truncate">{recipient.wallet}</p>
        </div>
        <div className="flex gap-2 pt-2">
          <Button size="sm" className="flex-1">
            <Send className="size-4 mr-2" />
            New Payout
          </Button>
          <Button size="sm" variant="outline" onClick={handleSendEmail}>
            <Mail className="size-4" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="sm" variant="outline">
                <MoreHorizontal className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Edit Details</DropdownMenuItem>
              <DropdownMenuItem>View History</DropdownMenuItem>
              <DropdownMenuItem>Copy Wallet</DropdownMenuItem>
              <DropdownMenuItem className="text-red-600">Remove Recipient</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  )
}
