"use client"

import * as React from "react"
import { ArrowLeft, Save } from "lucide-react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/layout/app-sidebar"
import { PageHeader } from "@/components/layout/page-header"
import { PayoutTemplates } from "@/components/schedule/payout-templates"
import { RecentRecipients } from "@/components/schedule/recent-recipients"
import { PayoutForm } from "@/components/schedule/payout-form"

// Sample data
const payoutTemplates = [
  {
    id: 1,
    name: "Monthly Salary",
    amount: 5000,
    currency: "USD",
    frequency: "monthly",
    description: "Standard monthly salary payment",
  },
  {
    id: 2,
    name: "Weekly Contractor",
    amount: 1200,
    currency: "USD",
    frequency: "weekly",
    description: "Weekly contractor payment",
  },
  {
    id: 3,
    name: "Quarterly Bonus",
    amount: 2500,
    currency: "USD",
    frequency: "quarterly",
    description: "Performance bonus payment",
  },
]

const recentRecipients = [
  {
    id: 1,
    name: "Alice Johnson",
    wallet: "0x742d35Cc6634C0532925a3b8D404fD4C165e4B7f",
    email: "alice@example.com",
    lastPayout: "2024-01-15",
  },
  {
    id: 2,
    name: "Bob Smith",
    wallet: "0x8ba1f109551bD432803012645Hac136c5c8b8b8b",
    email: "bob@example.com",
    lastPayout: "2024-01-10",
  },
]

export default function SchedulePayout() {
  const router = useRouter()
  const [selectedTemplate, setSelectedTemplate] = React.useState<number | null>(null)
  const [selectedRecipient, setSelectedRecipient] = React.useState<number | null>(null)
  const [formData, setFormData] = React.useState({
    recipientName: "",
    recipientEmail: "",
    walletAddress: "",
    amount: "",
    currency: "USD",
    frequency: "one-time",
    startDate: "",
    endDate: "",
    description: "",
    notifyRecipient: true,
    autoRetry: true,
  })

  const handleTemplateSelect = (template: (typeof payoutTemplates)[0]) => {
    setSelectedTemplate(template.id)
    setFormData((prev) => ({
      ...prev,
      amount: template.amount.toString(),
      currency: template.currency,
      frequency: template.frequency,
      description: template.description,
    }))
  }

  const handleRecipientSelect = (recipient: (typeof recentRecipients)[0]) => {
    setSelectedRecipient(recipient.id)
    setFormData((prev) => ({
      ...prev,
      recipientName: recipient.name,
      recipientEmail: recipient.email,
      walletAddress: recipient.wallet,
    }))
  }

  const handleSaveTemplate = () => {
    toast.success("Template Saved", {
      description: "Payout template has been saved for future use.",
    })
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <PageHeader title="Schedule New Payout">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="size-4" />
          </Button>
          <Button variant="outline" onClick={handleSaveTemplate}>
            <Save className="size-4 mr-2" />
            Save Template
          </Button>
        </PageHeader>

        <main className="flex flex-1 flex-col gap-6 p-6 bg-gray-50/50">
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="space-y-6">
              <PayoutTemplates
                templates={payoutTemplates}
                selectedTemplate={selectedTemplate}
                onTemplateSelect={handleTemplateSelect}
              />
              <RecentRecipients
                recipients={recentRecipients}
                selectedRecipient={selectedRecipient}
                onRecipientSelect={handleRecipientSelect}
              />
            </div>
            <div className="lg:col-span-2">
              <PayoutForm formData={formData} setFormData={setFormData} />
            </div>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
