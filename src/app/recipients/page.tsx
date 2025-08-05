"use client"

import * as React from "react"
import { Search, Users } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/layout/app-sidebar"
import { PageHeader } from "@/components/layout/page-header"
import { RecipientCard } from "@/components/recipients/recipient-card"
import { AddRecipientDialog } from "@/components/recipients/add-recipient-dialog"

// Sample recipients data
const recipients = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice@example.com",
    wallet: "0x742d35Cc6634C0532925a3b8D404fD4C165e4B7f",
    totalPayouts: 12,
    totalAmount: 30000,
    lastPayout: "2024-01-15",
    status: "Active",
  },
  {
    id: 2,
    name: "Bob Smith",
    email: "bob@example.com",
    wallet: "0x8ba1f109551bD432803012645Hac136c5c8b8b8b",
    totalPayouts: 8,
    totalAmount: 9600,
    lastPayout: "2024-01-14",
    status: "Active",
  },
  {
    id: 3,
    name: "Carol Davis",
    email: "carol@example.com",
    wallet: "0x123456789abcdef123456789abcdef123456789a",
    totalPayouts: 3,
    totalAmount: 2400,
    lastPayout: "2024-01-10",
    status: "Inactive",
  },
  {
    id: 4,
    name: "David Wilson",
    email: "david@example.com",
    wallet: "0x987654321fedcba987654321fedcba987654321f",
    totalPayouts: 6,
    totalAmount: 18000,
    lastPayout: "2024-01-12",
    status: "Active",
  },
]

export default function Recipients() {
  const [searchQuery, setSearchQuery] = React.useState("")

  const filteredRecipients = recipients.filter(
    (recipient) =>
      recipient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recipient.email.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <PageHeader title="Recipients">
          <AddRecipientDialog />
        </PageHeader>

        <main className="flex flex-1 flex-col gap-6 p-6 bg-gray-50/50">
          {/* Search */}
          <Card className="bg-white shadow-sm border-0 rounded-2xl">
            <CardContent className="p-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 size-4 text-gray-400" />
                <Input
                  placeholder="Search recipients by name or email..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Recipients Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredRecipients.map((recipient) => (
              <RecipientCard key={recipient.id} recipient={recipient} />
            ))}
          </div>

          {filteredRecipients.length === 0 && (
            <Card className="bg-white shadow-sm border-0 rounded-2xl">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Users className="size-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No recipients found</h3>
                <p className="text-muted-foreground text-center mb-4">
                  {searchQuery ? "No recipients match your search criteria." : "You haven't added any recipients yet."}
                </p>
                {!searchQuery && <AddRecipientDialog />}
              </CardContent>
            </Card>
          )}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
