"use client";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { PageHeader } from "@/components/layout/page-header";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { QuickActions } from "@/components/dashboard/quick-actions";
import { UpcomingPayoutsTable } from "@/components/dashboard/upcoming-payouts-table";

// Sample data
const upcomingPayouts = [
  {
    id: 1,
    recipient: "Alice Johnson",
    amount: 2500,
    currency: "USD",
    frequency: "Monthly",
    status: "Scheduled",
    nextPayout: "2024-02-15",
    wallet: "0x742d35Cc6634C0532925a3b8D404fD4C165e4B7f",
  },
  {
    id: 2,
    recipient: "Bob Smith",
    amount: 1200,
    currency: "EUR",
    frequency: "Weekly",
    status: "Processing",
    nextPayout: "2024-02-08",
    wallet: "0x8ba1f109551bD432803012645Hac136c5c8b8b8b",
  },
  {
    id: 3,
    recipient: "Carol Davis",
    amount: 800,
    currency: "USD",
    frequency: "One-time",
    status: "Failed",
    nextPayout: "2024-02-10",
    wallet: "0x123456789abcdef123456789abcdef123456789a",
  },
  {
    id: 4,
    recipient: "David Wilson",
    amount: 3000,
    currency: "USD",
    frequency: "Monthly",
    status: "Scheduled",
    nextPayout: "2024-02-20",
    wallet: "0x987654321fedcba987654321fedcba987654321f",
  },
];

const stats = {
  totalScheduled: 12,
  sent: 156,
  pending: 4,
  totalVolume: 245600,
  thisMonth: 45200,
  growth: 12.5,
};

export default function Dashboard() {
  const router = useRouter();

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <PageHeader title="Dashboard">
          <Button
            onClick={() => router.push("/schedule")}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
          >
            <Plus className="size-4 mr-2" />
            New Payout
          </Button>
        </PageHeader>

        <main className="flex flex-1 flex-col gap-6 p-6 bg-gray-50/50">
          <StatsCards/>
          <QuickActions />
          <UpcomingPayoutsTable
            payouts={upcomingPayouts}
            totalScheduled={stats.totalScheduled}
          />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
