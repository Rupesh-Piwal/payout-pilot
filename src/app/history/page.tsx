"use client"

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/layout/app-sidebar"
import { PageHeader } from "@/components/layout/page-header"
import { HistoryStats } from "@/components/history/history-stats"
import { HistoryTable } from "@/components/history/history-table"

// Sample historical data
const payoutHistory = [
  {
    id: 1,
    recipient: "Alice Johnson",
    amount: 2500,
    currency: "USD",
    frequency: "Monthly",
    status: "Sent",
    date: "2024-01-15",
    transactionId: "tx_1234567890abcdef",
    wallet: "0x742d35Cc6634C0532925a3b8D404fD4C165e4B7f",
    fee: 2.5,
  },
  {
    id: 2,
    recipient: "Bob Smith",
    amount: 1200,
    currency: "EUR",
    frequency: "Weekly",
    status: "Sent",
    date: "2024-01-14",
    transactionId: "tx_abcdef1234567890",
    wallet: "0x8ba1f109551bD432803012645Hac136c5c8b8b8b",
    fee: 1.2,
  },
  {
    id: 3,
    recipient: "Carol Davis",
    amount: 800,
    currency: "USD",
    frequency: "One-time",
    status: "Failed",
    date: "2024-01-13",
    transactionId: "tx_failed123456789",
    wallet: "0x123456789abcdef123456789abcdef123456789a",
    fee: 0,
    failureReason: "Insufficient funds",
  },
  {
    id: 4,
    recipient: "David Wilson",
    amount: 3000,
    currency: "USD",
    frequency: "Monthly",
    status: "Sent",
    date: "2024-01-12",
    transactionId: "tx_987654321fedcba",
    wallet: "0x987654321fedcba987654321fedcba987654321f",
    fee: 3.0,
  },
  {
    id: 5,
    recipient: "Eva Martinez",
    amount: 1500,
    currency: "GBP",
    frequency: "Weekly",
    status: "Sent",
    date: "2024-01-11",
    transactionId: "tx_fedcba987654321",
    wallet: "0xabcdef123456789abcdef123456789abcdef1234",
    fee: 1.5,
  },
  {
    id: 6,
    recipient: "Frank Brown",
    amount: 750,
    currency: "USD",
    frequency: "One-time",
    status: "Refunded",
    date: "2024-01-10",
    transactionId: "tx_refund123456789",
    wallet: "0x456789abcdef123456789abcdef123456789abc",
    fee: 0,
  },
  {
    id: 7,
    recipient: "Grace Lee",
    amount: 2200,
    currency: "ETH",
    frequency: "Monthly",
    status: "Sent",
    date: "2024-01-09",
    transactionId: "tx_eth123456789abcd",
    wallet: "0x789abcdef123456789abcdef123456789abcdef12",
    fee: 0.01,
  },
  {
    id: 8,
    recipient: "Henry Kim",
    amount: 950,
    currency: "USD",
    frequency: "Weekly",
    status: "Processing",
    date: "2024-01-08",
    transactionId: "tx_processing123456",
    wallet: "0xbcdef123456789abcdef123456789abcdef12345",
    fee: 0.95,
  },
]

export default function PayoutHistory() {
  const totalVolume = payoutHistory.filter((p) => p.status === "Sent").reduce((sum, p) => sum + p.amount, 0)
  const totalFees = payoutHistory.filter((p) => p.status === "Sent").reduce((sum, p) => sum + p.fee, 0)
  const successRate = Math.round((payoutHistory.filter((p) => p.status === "Sent").length / payoutHistory.length) * 100)

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <PageHeader title="Payout History" />

        <main className="flex flex-1 flex-col gap-6 p-6 bg-gray-50/50">
          <HistoryStats
            totalTransactions={payoutHistory.length}
            totalVolume={totalVolume}
            totalFees={totalFees}
            successRate={successRate}
          />
          <HistoryTable payouts={payoutHistory} />
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
