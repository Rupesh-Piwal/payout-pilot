"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface RecentRecipient {
  id: number
  name: string
  wallet: string
  email: string
  lastPayout: string
}

interface RecentRecipientsProps {
  recipients: RecentRecipient[]
  selectedRecipient: number | null
  onRecipientSelect: (recipient: RecentRecipient) => void
}

export function RecentRecipients({ recipients, selectedRecipient, onRecipientSelect }: RecentRecipientsProps) {
  return (
    <Card className="bg-white shadow-sm border-0 rounded-2xl">
      <CardHeader>
        <CardTitle className="text-lg">Recent Recipients</CardTitle>
        <CardDescription>Select from recently used recipients</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {recipients.map((recipient) => (
          <div
            key={recipient.id}
            className={`p-3 rounded-xl border-2 cursor-pointer transition-colors ${
              selectedRecipient === recipient.id
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200 hover:border-gray-300"
            }`}
            onClick={() => onRecipientSelect(recipient)}
          >
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                {recipient.name.charAt(0)}
              </div>
              <div className="flex-1">
                <h4 className="font-medium">{recipient.name}</h4>
                <p className="text-sm text-muted-foreground">{recipient.email}</p>
                <p className="text-xs text-muted-foreground">
                  Last: {new Date(recipient.lastPayout).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
